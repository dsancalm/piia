---
title: "Cloudflare lanza Python Workers tras dos años en beta"
summary: "El código se compila a WebAssembly con Pyodide y corre dentro de V8, no en CPython. Eso elimina hilos y multiproceso, obligando a reescribir tareas concurrentes. El binario local pesa 123 MB en macOS ARM64."
lang: es
story: cloudflare-python-workers-reach-general-availability
publishedAt: 2026-09-22T12:10:06.390Z
sourceUrl: "https://simonwillison.net/2026/Sep/21/cloudflare-python-worker/"
sourceName: "Simon Willison"
priority: urgent
tags: [cloudflare, python, webassembly, serverless]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare ha sacado de la fase beta sus Python Workers tras dos años de pruebas. Python pasa a ser un lenguaje de primera clase en la plataforma para desarrolladores de la compañía, lo que permite ejecutar funciones *serverless* escritas en Python en el perímetro de su red global.

La implementación no usa un intérprete CPython convencional. El código Python se compila a WebAssembly mediante Pyodide y se ejecuta dentro del motor V8 que impulsa *workerd*, el runtime de código abierto de Cloudflare. El binario de *workerd* que se descarga para desarrollo local ocupa 123 MB en macOS ARM64 y se encuentra en `node_modules/@cloudflare/workerd-darwin-arm64/bin/workerd`. La herramienta de desarrollo local se llama *pywrangler* y se distribuye en PyPI como `workers-py`; arranca una réplica completa de Pyodide en WebAssembly dentro de V8 para simular el entorno de producción.

```text
multiprocessing
node_modules/@cloudflare/workerd-darwin-arm64/bin/workerd
```

El anuncio oficial está firmado por Gyeongjae Choi, Dominik Picheta y Hood Chatham. Choi y Chatham son mantenedores principales de Pyodide, lo que explica la apuesta por este camino técnico.

La arquitectura basada en WebAssembly impone una restricción importante: *multiprocessing* e *threading* no funcionan. Cualquier biblioteca o patrón que dependa de hilos o procesos múltiples fallará o se bloqueará en tiempo de ejecución. Esto obliga a rediseñar las cargas de trabajo que en CPython nativo usarían concurrencia real.

## Lo que no se sabe

- Limitaciones exactas más allá de *multiprocessing* e *threading* (la documentación enlazada no se ha publicado en la fuente).
- Comparativas de rendimiento frente a JavaScript Workers u otras plataformas *serverless* de Python.
- Detalles de precios específicos para Python Workers frente a Workers estándar.
- Qué módulos de la biblioteca estándar y qué paquetes de terceros son compatibles.
- Versión exacta de Python soportada.
- Características de latencia en arranque en frío.
- Si el tamaño de 123 MB del binario *workerd* se mantiene en Linux, Windows y otras arquitecturas.
