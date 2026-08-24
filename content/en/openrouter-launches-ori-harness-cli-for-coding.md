---
title: "OpenRouter launches Ori Harness CLI for coding agents"
summary: "You can now run existing agent binaries through the OpenRouter API using a single command. This tool wraps your local agents to access over 500 models without manual API key configuration or environment variable changes."
lang: en
story: openrouter-launches-ori-harness-cli-for-coding
publishedAt: 2026-08-16T20:50:13.189Z
sourceUrl: "https://aideveloper44.com/product/ori-harness-6a80a6e478ea37f22c92dcc7"
sourceName: "Reddit r/AIDeveloperNews"
priority: urgent
tags: [cli, openrouter, coding, software]
generatedBy: google/gemma-4-26b-a4b-it:free
---
OpenRouter released Ori Harness, a lightweight CLI wrapper that executes coding agents through the OpenRouter API. Esta herramienta permite usar flujos de trabajo de agentes existentes con más de 500 LLMs disponibles en la plataforma sin modificar el código o la configuración local. El software funciona envolviendo los binarios de agentes que ya están presentes en el PATH del sistema.

Esto resuelve la fricción de gestionar múltiples API keys para diferentes agentes especializados. En lugar de configurar variables de entorno manualmente para cada modelo nuevo, puede redirigir el tráfico del agente a través de una sola interfaz. La herramienta facilita las pruebas de diferentes modelos al usar un flag para cambiar entre ellos. Por ejemplo, puede intercambiar modelos en sus comandos actuales de esta forma:

```bash
ori claude --model openai/gpt-5.2
ori prime-agent --model google/gemini-3.6-flash
ori codex --full-auto
```

El software utiliza el OAuth basado en navegador de OpenRouter para la autenticación. Este método mejora la seguridad porque elimina automáticamente las API keys locales, como ANTHROPIC_API_KEY o OPENAI_API_KEY, durante la ejecución. No es necesario guardar credenciales de larga duración en el entorno del shell mientras se ejecutan estos agentes. El CLI es gratuito, pero se cobrarán las tarifas estándar de pago por uso de OpenRouter por todo el tráfico de modelos.

## Seguridad e integración del flujo de trabajo

El beneficio técnico principal es la abstracción del proveedor del modelo. Como la herramienta envuelve binarios en el PATH, puede mantener sus flujos de trabajo de agentes actuales. Solo necesita anteponer el comando `ori` a sus comandos habituales y especificar el modelo de destino.

La herramienta gestiona el enrutamiento de las solicitudes al proveedor correcto. Esto significa que la lógica del agente no cambia mientras la inteligencia subyacente cambia entre proveedores como OpenAI, Anthropic o Google a través de la interfaz de OpenRouter.

Lo que no se sabe:
El costo exacto de las tarifas de pago por uso, la lista completa de agentes compatibles y los límites específicos de las políticas de guardrail de la organización.

Source: https://www.reddit.com/r/AIDeveloperNews/comments/1i2x3z4/openrouter_has_launched_ori_harness_run_your_existing/
