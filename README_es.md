[English](README.md) | [中文](README_zh.md) | [日本語](README_ja.md) | [Español](README_es.md)

# TikTomato MCP Server

Servidor MCP para [TikTomato](https://tiktomato.com) — genera imágenes y videos con IA usando más de 20 modelos de primera línea directamente desde Claude, Cursor y otros clientes compatibles con MCP.

## Herramientas

| Herramienta | Descripción |
|-------------|-------------|
| `list_models` | Obtener modelos disponibles y descripciones |
| `get_model_doc` | Obtener documentación detallada de la API para un modelo específico |
| `generate` | Generar imágenes o videos |
| `get_task` | Consultar el estado y resultados de una tarea |

## Configuración

### 1. Obtén tu Token de API

https://tiktomato.com/dashboard/api-keys

### 2. Configura tu cliente

#### Claude Desktop / Claude Code

Añade a `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "tiktomato": {
      "command": "npx",
      "args": ["-y", "tiktomato-mcp"],
      "env": {
        "TIKTOMATO_TOKEN": "ak_tu_token_aquí"
      }
    }
  }
}
```

#### Cursor

Añade a la configuración MCP de Cursor:

```json
{
  "mcpServers": {
    "tiktomato": {
      "command": "npx",
      "args": ["-y", "tiktomato-mcp"],
      "env": {
        "TIKTOMATO_TOKEN": "ak_tu_token_aquí"
      }
    }
  }
}
```

### 3. Úsalo

Pregunta a Claude o a tu asistente de IA:

> "Genera un paisaje en acuarela usando Seedream"

> "Lista los modelos de generación de imágenes disponibles"

> "Elimina el fondo de esta imagen usando BiRefNet"

## Modelos disponibles

- **TikTomato Image** — Ultra-rápido, menor costo
- **GPT Image 1.5** — Mejor renderizado de texto
- **FLUX.2 Pro** — Fotorrealista
- **Seedream** — Estética china, imágenes grupales
- **Nano Banana PRO** — Calidad premium
- **Veo 3.1 / Kling 3.0** — Generación de video
- **BiRefNet / RMBG 2.0** — Eliminación de fondo
- **SeedVR2** — Escalado de imágenes
- Y más de 10 modelos adicionales

## Enlaces

- [TikTomato](https://tiktomato.com)
- [Documentación API](https://tiktomato.com/llms.txt)
- [Agent Skills](https://github.com/tiktomato/tiktomato-skills)
- [ChatGPT GPT](https://chatgpt.com/g/g-69e097b77df08191b59880068041ab05-tiktomato-image-video-generator)

## Licencia

MIT
