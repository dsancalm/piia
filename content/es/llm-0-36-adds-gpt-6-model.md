---
title: "llm 0.36 añade GPT-6 Sol y GPT-6 Luna"
summary: "La versión 0.36 de llm incluye los modelos gpt-6-sol y gpt-6-luna de OpenAI. Introduce la propiedad supports_conversation = False en la API de plugins, lo que bloquea historiales y herramientas para modelos que no los soportan. El primer plugin en usarlo es llm-typesafe."
lang: es
story: llm-0-36-adds-gpt-6-model
publishedAt: 2026-09-23T12:05:30.878Z
sourceUrl: "https://simonwillison.net/2026/Sep/22/llm/"
sourceName: "Simon Willison"
priority: urgent
tags: [llm, openai, plugins, api]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
La versión 0.36 de `llm` incluye los dos nuevos modelos de OpenAI, `gpt-6-sol` y `gpt-6-luna`, accesibles directamente desde la línea de comandos tras actualizar. El cambio estructural más importante es la introducción de la propiedad `supports_conversation = False` en la API de plugins. Cuando un modelo la declara, `llm` entiende que solo acepta peticiones de un solo turno y bloquea cualquier intento de enviar historial de conversación o definiciones de herramientas. Si el código intenta pasar ese contexto, la biblioteca lanza `llm.ConversationNotSupported`; el comando `llm chat` rechaza el modelo antes de abrir la sesión. El primer plugin que estrena este comportamiento es `llm-typesafe`.

```python
supports_conversation = False
```

En la salida de `llm logs`, las trazas de razonamiento ahora se envuelven en etiquetas `<details><summary>` para que permanezcan colapsadas en cualquier visor de Markdown compatible con HTML. Esto evita que salidas extensas de modelos de razonamiento inunden la terminal o el navegador al revisar el historial.

```html
<details><summary>
```

La entrega incluye correcciones de errores aportadas por cinco nuevos contribuyentes. No se conoce la fecha de corte de conocimiento ni de lanzamiento de GPT-6 Sol y GPT-6 Luna, ni el detalle concreto de los *bug fixes* ni el alcance funcional completo de `llm-typesafe` más allá de la limitación de conversación. Tampoco hay constancia de cambios en dependencias, versión mínima de Python o procedimiento de instalación.
