---
title: "LLM 0.32 añade trazas de razonamiento y herramientas de servidor"
summary: "La versión 0.32 de LLM, publicada el 4 de agosto de 2026, incluye soporte para ver el razonamiento del modelo, herramientas del lado del servidor y cambios en la API de Python. Los plugins existentes siguen funcionando, pero los que añaden modelos deben actualizarse."
lang: es
story: llm-0-32-ships-with-reasoning-traces
publishedAt: 2026-08-05T09:20:38.438Z
sourceUrl: "https://simonwillison.net/2026/Aug/4/new-release-of-llm/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [llm, lanzamiento, api, herramientas]
generatedBy: deepseek/deepseek-v4-flash-0731
---
LLM 0.32 salió el 4 de agosto de 2026 y trae cambios que afectan a cualquiera que use la herramienta en línea de comandos o su API de Python. La novedad más visible es el soporte para trazas de razonamiento: ahora puedes ver qué ha "pensado" el modelo antes de responder. Para ocultarlo, existe la bandera `-R` o `--hide-reasoning`.

También se añaden herramientas del lado del servidor. Puedes invocar directamente el entorno de ejecución de código de OpenAI o su herramienta de búsqueda web sin montar tú el andamiaje. Un ejemplo sacado de la documentación:

```bash
llm --tool CodeInterpreter ' Show current python and SQLite versions '
```

El plugin `llm-anthropic` sube a la versión 0.26 e incorpora `WebSearch`, `WebFetch`, `CodeExecution` y `AnthropicMCP`, además del soporte para la familia Claude 5. Con MCP puedes conectarte a recursos remotos, como en este ejemplo:

```bash
llm -m claude-sonnet-5 -T ' AnthropicMCP("https://datasette.simonwillison.net/-/mcp") ' \
  ' how many rows in the blog_blogmark table? '
```

La API de Python también cambia. Ahora `model.prompt()` acepta un parámetro `messages=[]` para pasar una lista de mensajes estructurados, y hay un método nuevo `stream_events()` que emite eventos de tipo `reasoning`, `text` y otros. Esto facilita construir agentes que reaccionan a cada paso del modelo. Un ejemplo de la fuente:

```python
import llm
from llm import user, assistant, system

model = llm.get_model("gpt-5.6-luna")
response = model.prompt(
    messages=[
        system("You are a helpful pirate."),
        user("What is the capital of France?"),
        assistant("Paris, matey."),
        user("And Germany?"),
    ]
)
print(response.text())
```

El almacenamiento de logs se ha rediseñado con un sistema de mensajes con direccionamiento por contenido, inspirado en Git. Eso significa que los registros son más fáciles de comparar y deduplicar.

Los plugins existentes deberían seguir funcionando, pero los que añaden modelos necesitan actualizarse a 0.32 para participar en el nuevo sistema de eventos. Los plugins `llm-gemini`, `llm-openrouter` y `llm-mistral` están en camino, aunque sin fecha concreta.

Los cambios de bajo nivel en las herramientas vienen motivados por las necesidades de Datasette Agent. Las cadenas de herramientas ahora pueden pausarse para pedir aprobación humana y reanudarse desde el historial de mensajes guardado.

Lo que no se sabe: las notas de lanzamiento completas de 0.32 no se incluyen en el texto, así que no consta la lista exacta de modelos nuevos más allá de la familia GPT-5.6. Tampoco se describe el esquema concreto del nuevo almacén de mensajes ni las fechas de lanzamiento de los plugins pendientes. La implementación del concepto de "agente" en la biblioteca principal aún no está definida.
