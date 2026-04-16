[English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [Español](README_es.md)

# TikTomato MCP Server

MCP Server for [TikTomato](https://tiktomato.com) — generate AI images and videos using 20+ top models directly from Claude, Cursor, and other MCP-compatible clients.

## Tools

| Tool | Description |
|------|-------------|
| `list_models` | Get available models and descriptions |
| `get_model_doc` | Get detailed API docs for a specific model |
| `generate` | Generate images or videos |
| `get_task` | Check task status and results |

## Setup

### 1. Get Your API Token

https://tiktomato.com/dashboard/api-keys

### 2. Configure Your Client

#### Claude Desktop / Claude Code

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "tiktomato": {
      "command": "npx",
      "args": ["-y", "tiktomato-mcp"],
      "env": {
        "TIKTOMATO_TOKEN": "ak_your_token_here"
      }
    }
  }
}
```

#### Cursor

Add to Cursor MCP settings:

```json
{
  "mcpServers": {
    "tiktomato": {
      "command": "npx",
      "args": ["-y", "tiktomato-mcp"],
      "env": {
        "TIKTOMATO_TOKEN": "ak_your_token_here"
      }
    }
  }
}
```

### 3. Use It

Ask Claude or your AI assistant:

> "Generate a watercolor landscape using Seedream"

> "List available image generation models"

> "Remove the background from this image using BiRefNet"

## Available Models

- **TikTomato Image** — Ultra-fast, lowest cost
- **GPT Image 1.5** — Best text rendering
- **FLUX.2 Pro** — Photorealistic
- **Seedream** — Chinese aesthetics, group images
- **Nano Banana PRO** — Premium quality
- **Veo 3.1 / Kling 3.0** — Video generation
- **BiRefNet / RMBG 2.0** — Background removal
- **SeedVR2** — Image upscaling
- And 10+ more

## Links

- [TikTomato](https://tiktomato.com)
- [API Docs](https://tiktomato.com/llms.txt)
- [Agent Skills](https://github.com/tiktomato/tiktomato-skills)
- [ChatGPT GPT](https://chatgpt.com/g/g-69e097b77df08191b59880068041ab05-tiktomato-image-video-generator)

## License

MIT
