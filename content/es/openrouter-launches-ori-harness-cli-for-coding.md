---
title: "OpenRouter lanza Ori Harness para ejecutar agentes de código"
summary: "Puedes usar cualquier modelo de su catálogo de más de 500 opciones mediante comandos de terminal. El software protege tus credenciales eliminando las claves de API locales durante la ejecución."
lang: es
story: openrouter-launches-ori-harness-cli-for-coding
publishedAt: 2026-08-16T20:50:13.188Z
sourceUrl: "https://aideveloper44.com/product/ori-harness-6a80a6e478ea37f22c92dcc7"
sourceName: "Reddit r/AIDeveloperNews"
priority: urgent
tags: [programacion, software, terminal]
generatedBy: google/gemma-4-26b-a4b-it:free
---
OpenRouter ha lanzado Ori Harness, un wrapper de CLI para ejecutar agentes de codificación directamente a través de su plataforma. El software integra cualquier modelo de su catálogo de más de 500 LLMs en agentes de código existentes sin modificar el flujo de trabajo. Para cambiar el modelo que utiliza el agente, el usuario solo debe añadir un flag a la línea de comandos.

Por ejemplo, puede ejecutar comandos como estos:

```bash
ori claude --model openai/gpt-5.2
ori prime-agent --model google/gemini-3.6-flash
ori codex --full-auto
```

Esta herramienta centraliza la gestión de modelos y la seguridad de las credenciales. Al utilizar Ori Harness, el software envuelve los binarios de los agentes que encuentre en el PATH del sistema. El wrapper elimina automáticamente claves de API locales, como ANTHROPIC_API_KEY o OPENAI_API_KEY, durante la ejecución para evitar fugas de información. La autenticación se realiza mediante el protocolo OAuth del navegador de OpenRouter.

El uso de la CLI es gratuito, aunque el tráfico consume créditos de la cuenta de OpenRouter bajo sus tarifas estándar de pago por uso. Esto permite probar la capacidad de un agente con distintos modelos al cambiar el parámetro `--model` en la terminal.

Lo que no se sabe:
No se conoce el costo exacto de las tarifas de pago por uso, la lista completa de agentes compatibles o los límites de las políticas de guardrails de la organización.
