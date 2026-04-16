#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = "https://api.tiktomato.com";
const SITE_BASE = "https://tiktomato.com";

// 从环境变量读取 token
function getToken(): string {
  const token = process.env.TIKTOMATO_TOKEN;
  if (!token) {
    throw new Error(
      "TIKTOMATO_TOKEN 未设置。请访问 https://tiktomato.com/dashboard/api-keys 获取 token，然后设置环境变量：export TIKTOMATO_TOKEN=ak_xxx"
    );
  }
  return token;
}

async function apiRequest(path: string, options?: RequestInit) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

// 轮询任务结果
async function pollTask(taskId: string, maxWait = 120): Promise<any> {
  const start = Date.now();
  while (Date.now() - start < maxWait * 1000) {
    const data = await apiRequest(`/v2/tasks/${taskId}`);
    if (data.status === "completed") return data;
    if (data.status === "failed") throw new Error(`任务失败: ${data.error || "unknown"}`);
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`任务超时（${maxWait}s）`);
}

// ── MCP Server ──

const server = new McpServer({
  name: "tiktomato",
  version: "1.0.0",
});

// Tool: 列出可用模型
server.tool(
  "list_models",
  "获取 TikTomato 所有可用的 AI 模型列表和描述",
  {},
  async () => {
    const res = await fetch(`${SITE_BASE}/llms.txt`);
    const text = await res.text();
    return { content: [{ type: "text", text }] };
  }
);

// Tool: 获取模型详细文档
server.tool(
  "get_model_doc",
  "获取指定模型的详细 API 文档（参数、示例等）",
  {
    model_id: z.string().describe("模型 ID，如 seedream@volcengine、tiktomato-image@tk"),
  },
  async ({ model_id }) => {
    const res = await fetch(`${SITE_BASE}/llms/${encodeURIComponent(model_id)}`);
    if (!res.ok) throw new Error(`模型文档未找到: ${model_id}`);
    const text = await res.text();
    return { content: [{ type: "text", text }] };
  }
);

// Tool: 生成图片/视频
server.tool(
  "generate",
  "使用指定模型生成 AI 图片或视频。先调用 list_models 查看可用模型，再调用 get_model_doc 查看参数。",
  {
    model_id: z.string().describe("模型 ID（如 nano-banana-pro@ke、seedream@volcengine）"),
    prompt: z.string().describe("图片/视频描述"),
    params: z
      .record(z.string(), z.any())
      .optional()
      .describe("额外参数（如 aspect_ratio、quality 等），具体参数请先调用 get_model_doc 查看"),
  },
  async ({ model_id, prompt, params }) => {
    const body = { prompt, ...params };
    const data = await apiRequest(`/v2/generate/${encodeURIComponent(model_id)}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    // 同步模型直接返回结果
    if (data.status === "completed" && data.result) {
      const urls = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
      return {
        content: [
          { type: "text", text: `✅ 生成完成！\n\n${urls.map((u: string) => u).join("\n")}` },
        ],
      };
    }

    // 异步模型轮询
    const result = await pollTask(data.task_id);
    const urls =
      typeof result.result === "string" ? JSON.parse(result.result) : result.result || [];
    return {
      content: [
        {
          type: "text",
          text: `✅ 生成完成！（task_id: ${data.task_id}）\n\n${urls.join("\n")}`,
        },
      ],
    };
  }
);

// Tool: 查询任务状态
server.tool(
  "get_task",
  "查询生成任务的状态和结果",
  {
    task_id: z.string().describe("任务 ID"),
  },
  async ({ task_id }) => {
    const data = await apiRequest(`/v2/tasks/${task_id}`);
    if (data.status === "completed") {
      const urls =
        typeof data.result === "string" ? JSON.parse(data.result) : data.result || [];
      return {
        content: [{ type: "text", text: `✅ 已完成\n\n${urls.join("\n")}` }],
      };
    }
    if (data.status === "failed") {
      return {
        content: [{ type: "text", text: `❌ 失败: ${data.error || "unknown"}` }],
      };
    }
    return {
      content: [{ type: "text", text: `⏳ ${data.status}` }],
    };
  }
);

// 启动
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("TikTomato MCP Server 已启动");
}

main().catch((err) => {
  console.error("启动失败:", err);
  process.exit(1);
});
