[English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [Español](README_es.md)

# TikTomato MCP サーバー

[TikTomato](https://tiktomato.com) の MCP サーバー — Claude、Cursor などの MCP 対応クライアントから直接 20 以上のトップ AI モデルで画像・動画を生成。

## ツール

| ツール | 説明 |
|--------|------|
| `list_models` | 利用可能なモデル一覧と説明を取得 |
| `get_model_doc` | 指定モデルの詳細な API ドキュメントを取得 |
| `generate` | 画像または動画を生成 |
| `get_task` | タスクのステータスと結果を確認 |

## セットアップ

### 1. API トークンを取得

https://tiktomato.com/dashboard/api-keys

### 2. クライアントを設定

#### Claude Desktop / Claude Code

`claude_desktop_config.json` に追加：

```json
{
  "mcpServers": {
    "tiktomato": {
      "command": "npx",
      "args": ["-y", "tiktomato-mcp"],
      "env": {
        "TIKTOMATO_TOKEN": "ak_あなたのトークン"
      }
    }
  }
}
```

#### Cursor

Cursor の MCP 設定に追加：

```json
{
  "mcpServers": {
    "tiktomato": {
      "command": "npx",
      "args": ["-y", "tiktomato-mcp"],
      "env": {
        "TIKTOMATO_TOKEN": "ak_あなたのトークン"
      }
    }
  }
}
```

### 3. 使い方

Claude や AI アシスタントに聞いてみてください：

> 「Seedream で水彩画の風景を生成して」

> 「利用可能な画像生成モデルを一覧表示して」

> 「BiRefNet でこの画像の背景を削除して」

## 利用可能なモデル

- **TikTomato Image** — 超高速、最低コスト
- **GPT Image 1.5** — テキストレンダリング最高精度
- **FLUX.2 Pro** — フォトリアリスティック
- **Seedream** — 中国美学、グループ画像対応
- **Nano Banana PRO** — プレミアム品質
- **Veo 3.1 / Kling 3.0** — 動画生成
- **BiRefNet / RMBG 2.0** — 背景除去
- **SeedVR2** — 画像アップスケール
- その他 10 以上のモデル

## リンク

- [TikTomato](https://tiktomato.com)
- [API ドキュメント](https://tiktomato.com/llms.txt)
- [Agent Skills](https://github.com/tiktomato/tiktomato-skills)
- [ChatGPT GPT](https://chatgpt.com/g/g-69e097b77df08191b59880068041ab05-tiktomato-image-video-generator)

## ライセンス

MIT
