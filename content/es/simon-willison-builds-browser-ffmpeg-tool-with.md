---
title: "Simon Willison usa FFmpeg en el navegador vía WebAssembly para comprimir vídeo sin"
summary: "Willison pidió a Claude Code que generara una página que ejecuta FFmpeg compilado a WASM en el cliente. La herramienta carga el binario, monta un sistema de ficheros virtual con Emscripten y devuelve el vídeo comprimido sin enviar datos fuera."
lang: es
story: simon-willison-builds-browser-ffmpeg-tool-with
publishedAt: 2026-09-08T11:34:14.355Z
sourceUrl: "https://simonwillison.net/2026/Sep/7/video-compressor/"
sourceName: "Simon Willison"
priority: routine
tags: [webassembly, ffmpeg, cliente, ia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison necesitó comprimir un vídeo grabado en el móvil para publicarlo en su blog. En lugar de instalar FFmpeg en local, pidió a Claude Fable 5.1 dentro de Claude Code para web que le generara una herramienta que ejecutara FFmpeg compilado a WebAssembly directamente en el navegador. El resultado es una página que carga el binario WASM, acepta el archivo de vídeo, lo procesa y devuelve la versión optimizada sin que salga ningún dato hacia un servidor.

El flujo ilustra cómo un modelo de código puede producir una aplicación completa de multimedia cliente‑side: descarga el módulo WASM de FFmpeg, monta un sistema de ficheros virtual en memoria con Emscripten, invoca la línea de comandos habitual de FFmpeg y expone el resultado mediante la API File System Access o un simple enlace de descarga. Para quien programa, el patrón es reutilizable: cualquier CLI pesada que exista en C o Rust puede empaquetarse igual, siempre que el tamaño del binario WASM y la memoria disponible en el navegador lo permitan.

El artículo no indica qué parámetros de compresión aplica la herramienta (bitrate, preset, CRF), ni la resolución, duración o códec del vídeo original, ni el tamaño antes y después. Tampoco facilita el enlace directo a la demo ni al repositorio con el código generado. No se conocen detalles técnicos de la animación Equal Earth más allá de su nombre.
