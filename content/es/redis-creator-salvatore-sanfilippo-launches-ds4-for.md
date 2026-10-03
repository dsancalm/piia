---
title: "Antirez publica ds4, su motor de inferencia local para LLM"
summary: "El creador de Redis estrena herramienta para ejecutar modelos grandes en local sin contenedores ni Python. Solo hay binario y web; falta licencia, formatos, API y benchmarks."
lang: es
story: redis-creator-salvatore-sanfilippo-launches-ds4-for
publishedAt: 2026-10-03T11:52:43.011Z
sourceUrl: "https://dwarfstar.sh/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [redis, llm, inferencia, antirez]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Salvatore Sanfilippo, conocido como antirez y creador de Redis, ha publicado ds4, una herramienta para ejecutar modelos de lenguaje grandes en local. El proyecto está en dwarfstar.sh y ha llegado a la portada de Hacker News con 260 puntos y 68 comentarios. Sanfilippo lleva meses explorando la inferencia local tras dejar el desarrollo activo de Redis, y ds4 es la primera entrega pública de ese trabajo.

La relevancia para quien programa está en la procedencia. Sanfilippo tiene un historial de escribir software de infraestructura minimalista, rápido y predecible: Redis, Disque, lox. Si aplica esa misma filosofía a la inferencia de LLM, ds4 podría ser una alternativa ligera frente a stacks pesados que exigen contenedores, runtimes de Python o configuraciones complejas. El anuncio es solo una web y un binario, sin documentación extensa ni gestor de modelos integrado, lo que sugiere que la prioridad inicial es el motor de inferencia puro.

## Qué no se sabe

Casi todo lo operativo. No hay información pública sobre la licencia, los formatos de modelo soportados (GGUF, safetensors, otros), los requisitos de hardware, el lenguaje de implementación, si expone API compatible con OpenAI, CLI o biblioteca, ni cómo se instala. Tampoco hay benchmarks comparados con llama.cpp, ollama, vLLM o kobold.cpp, ni detalles sobre cuantización, offloading a GPU, ventanas de contexto largo o gestión de descarga y verificación de modelos. La versión actual, fecha de lanzamiento y roadmap tampoco están publicados.
