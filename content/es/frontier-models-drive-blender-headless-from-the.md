---
title: "Los modelos frontera ya escriben y ejecutan scripts de Blender sin ayuda"
summary: "ChatGPT Codex localiza la app estándar en macOS, genera código Python con bpy, lanza el render en segundo plano y devuelve la imagen; basta iterar en lenguaje natural para añadir entorno, luz y detalle."
lang: es
story: frontier-models-drive-blender-headless-from-the
publishedAt: 2026-09-06T11:12:15.428Z
sourceUrl: "https://simonwillison.net/2026/Sep/5/blender-coding-agents-macos/"
sourceName: "Simon Willison"
priority: urgent
tags: [blender, codex, ia, python]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Los modelos frontera actuales escriben código para Blender con soltura. Simon Willison lo ha probado con ChatGPT Codex en macOS y el camino más corto es instalar la aplicación completa desde blender.org. Nada de compilar desde el código fuente, nada de Homebrew: el .app estándar expone el ejecutable y la API de Python que el agente necesita.

El primer prompt fue literal:

```
Use the already install /Applications/Blender to render a scene of a pelican riding a bicycle
```

El agente localizó la instalación, generó un script Python que usa `bpy`, lanzó el render y devolvió una imagen. Dos iteraciones después , «OK add a background and a lot of flair» y «OK make it a whole lot better» , la escena incluía entorno, iluminación y detalle extra sin que Willison tocara una sola línea de código Blender.

El flujo es el mismo que con cualquier otra herramienta de línea de órdenes: el modelo escribe un script temporal, lo ejecuta con el Python embebido de Blender (`/Applications/Blender.app/Contents/MacOS/Blender --background --python script.py`) y recoge el resultado. Si pides vídeo, el agente renderiza una secuencia de frames y la une con `ffmpeg`.

Lo que no se sabe
- Qué modelos concretos han sido probados más allá de Codex
- Versión exacta de Blender y de macOS usadas
- Tiempo de render de las pruebas
- Aspecto real de la imagen final
- Si otros agentes (Claude Code, Aider, etc.) resuelven la ruta `/Applications/Blender` sin ayuda
- Qué llamadas a `bpy` generó el modelo
- Compatibilidad de los `.blend` producidos con versiones antiguas de Blender
