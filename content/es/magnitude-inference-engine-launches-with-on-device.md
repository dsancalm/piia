---
title: "Magnitude: motor de IA local que auto-optimiza sus kernels para tu hardware"
summary: "Magnitude es un motor de inferencia de código abierto que compila y ajusta kernels antes de ejecutar modelos de IA en local, logrando hasta un 92 % más de velocidad en decode sobre Metal y un 19 % en CUDA."
lang: es
story: magnitude-inference-engine-launches-with-on-device
publishedAt: 2026-10-01T13:43:07.164Z
sourceUrl: "https://github.com/magnitudedev/magnitude"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ia-local, rendimiento, open-source, agentes]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Magnitude es un motor de inferencia de código abierto (Apache 2.0) diseñado para ejecutar agentes de IA en local. Su propuesta central es la auto-optimización: antes de ejecutar un modelo, el binario compila y ajusta sus kernels para el hardware exacto donde corre, ya sea Apple Silicon, GPU NVIDIA, AMD o solo CPU. Según sus creadores, el resultado son modelos abiertos que corren hasta dos veces más rápido que con llama.cpp, con un 92 % más de velocidad en *decode* sobre Metal y un 19 % en CUDA.

El proyecto se distribuye como una aplicación de escritorio única para macOS, Windows y Linux que incluye la CLI `magnitude`; no hace falta instalar nada aparte. La app expone una API compatible con OpenAI, lo que permite conectar con un clic agentes que ya usas , Pi, OpenCode, Hermes, Codex u otros, sin cambiar tu flujo de trabajo.

## Rendimiento y recursos

Además de la velocidad bruta, Magnitude reduce un 27 % la memoria por agente y la libera cuando el agente se detiene. Las sesiones concurrentes comparten *prefix caches* para evitar degradación cuando hay varias peticiones a la vez. Todo ocurre en local: prompts, ficheros y pesos del modelo nunca salen de la máquina y, tras la descarga inicial, no se requiere conexión a internet.

## Lo que no se sabe

No hay benchmarks detallados por modelo y configuración concreta más allá de los porcentajes globales. La lista completa de familias de pesos abiertos soportados remite a una URL externa (magnitude.dev/models). Tampoco se especifican tiempos de instalación, espacio en disco necesario, tamaños de descarga de modelos, ni detalles técnicos de cuánto tarda la fase de auto-ajuste de kernels. No hay datos comparativos frente a Ollama o LM Studio, ni información sobre canales de comunidad, *issue tracking* o guías de contribución.
