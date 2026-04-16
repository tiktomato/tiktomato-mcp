[English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [Español](README_es.md)

# TikTomato MCP 服务

[TikTomato](https://tiktomato.com) 的 MCP 服务 — 在 Claude、Cursor 等 MCP 客户端中直接使用 20+ 顶级 AI 模型生成图片和视频。

## 工具

| 工具 | 说明 |
|------|------|
| `list_models` | 获取所有可用模型及描述 |
| `get_model_doc` | 获取指定模型的详细 API 文档 |
| `generate` | 生成图片或视频 |
| `get_task` | 查询任务状态和结果 |

## 配置

### 1. 获取 API Token

https://tiktomato.com/dashboard/api-keys

### 2. 配置客户端

#### Claude Desktop / Claude Code

添加到 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "tiktomato": {
      "command": "npx",
      "args": ["-y", "tiktomato-mcp"],
      "env": {
        "TIKTOMATO_TOKEN": "ak_你的token"
      }
    }
  }
}
```

#### Cursor

添加到 Cursor MCP 设置：

```json
{
  "mcpServers": {
    "tiktomato": {
      "command": "npx",
      "args": ["-y", "tiktomato-mcp"],
      "env": {
        "TIKTOMATO_TOKEN": "ak_你的token"
      }
    }
  }
}
```

### 3. 开始使用

对 Claude 或你的 AI 助手说：

> "用 Seedream 生成一幅水彩风景画"

> "列出所有可用的图片生成模型"

> "用 BiRefNet 去除这张图片的背景"

## 可用模型

- **TikTomato Image** — 超快速，最低成本
- **GPT Image 1.5** — 文字渲染最准确
- **FLUX.2 Pro** — 专业写实
- **Seedream** — 中式审美，支持组图
- **Nano Banana PRO** — 旗舰画质
- **Veo 3.1 / Kling 3.0** — 视频生成
- **BiRefNet / RMBG 2.0** — 背景去除
- **SeedVR2** — 图片放大
- 以及 10+ 更多模型

## 链接

- [TikTomato](https://tiktomato.com)
- [API 文档](https://tiktomato.com/llms.txt)
- [Agent Skills](https://github.com/tiktomato/tiktomato-skills)
- [ChatGPT GPT](https://chatgpt.com/g/g-69e097b77df08191b59880068041ab05-tiktomato-image-video-generator)

## 许可证

MIT
