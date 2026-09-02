---
title: "La app de escritorio de ChatGPT instala 1,7 GB de LibreOffice y runtimes sin avisar"
summary: "El directorio ~/.cache/codex-primary-runtime incluye binarios completos de LibreOffice, Python, Node, Poppler y git gestionados por OpenAI. El usuario no controla versiones, parches de seguridad ni puede desactivar el runtime de documentos."
lang: es
story: chatgpt-desktop-bundles-1-7-gb-of
publishedAt: 2026-09-02T11:50:06.166Z
sourceUrl: "https://simonwillison.net/2026/Sep/1/codex-libreoffice/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [chatgpt, privacidad, seguridad, software]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
La aplicación de escritorio de Codex, ahora llamada ChatGPT, instala en tu máquina una copia completa de LibreOffice sin avisar. El directorio `~/.cache/codex-primary-runtime` ocupa 1,7 GB e incluye instalaciones funcionales de Python, Node.js, Poppler, git y la suite ofimática entera. No son bindings ni wrappers ligeros: son los binarios completos, tal cual los distribuye The Document Foundation.

Dentro de `~/.cache/codex-runtimes/codex-primary-runtime/plugins/openai-primary-runtime/plugins/documents` hay una serie de «skills» , pequeños manifiestos en JSON, que indican al agente cómo localizar y ejecutar cada binario. Uno de ellos apunta directamente a `soffice`, el entry point de LibreOffice, con argumentos para arrancar en modo headless y convertir documentos. El resto de skills hacen lo propio con `python3`, `node`, `git` y `pdftotext`.

```json
{
  "name": "convert_document",
  "description": "Convert a document to another format using LibreOffice",
  "parameters": {
    "type": "object",
    "properties": {
      "input_path": {"type": "string"},
      "output_format": {"type": "string", "enum": ["pdf", "docx", "txt", "html"]},
      "output_dir": {"type": "string"}
    },
    "required": ["input_path", "output_format"]
  },
  "implementation": {
    "type": "binary",
    "path": "libreoffice/program/soffice",
    "args": ["--headless", "--convert-to", "{output_format}", "--outdir", "{output_dir}", "{input_path}"]
  }
}
```

Esto convierte a la aplicación en un distribuidor de software de facto. Tú no elegiste la versión de LibreOffice, ni la de Python, ni la de Node. OpenAI decide cuándo actualizan, con qué flags se compilan y qué parches de seguridad incluyen. Si mañana sale un CVE en `libxml2` usado por el conversor de Writer, la ventana de exposición la marca el calendario de releases de la app de chat, no el de tu gestor de paquetes.

El tamaño también importa. 1,7 GB en `~/.cache` pasan desapercibidos hasta que el disco se llena o un backup clona la carpeta entera. No hay opción de instalación mínima, ni flag para desactivar el runtime de documentos, ni documentación pública que explique la política de ciclo de vida de estos componentes.

Lo que no se sabe: versión exacta de LibreOffice embebida, versiones concretas de Python, Node, Poppler y git, si el binario se ejecuta siempre en modo headless o puede levantar interfaz gráfica, desglose de tamaño por componente, política de actualización de los runtimes y evaluación de superficie de ataque real.
