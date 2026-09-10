---
title: "Un 1 % del razonamiento de GPT‑5.5 Pro duplica la coincidencia léxica de Qwen 3.8"
summary: "Inyectar solo el inicio del razonamiento como prefill eleva el recall de n‑gramas del 16,79 % al 34,97 % en 45 pruebas; Kimi K3 mejora 4,5 pp, DeepSeek V4 Flash empeora y el autor sugiere que Qwen pudo entrenarse con datos de un modelo GPT cercano."
lang: es
story: one-percent-of-a-closed-model-s
publishedAt: 2026-09-10T11:41:10.036Z
sourceUrl: "https://gist.github.com/wsxiaoys/e0286dc6bb624ff5fdf49e7f4c528ba3"
sourceName: "Hacker News (portada)"
priority: routine
tags: [llm, prefill, distilacion, benchmark]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un experimento publicado en Hacker News muestra que inyectar solo el primer 1 % del razonamiento de GPT‑5.5 Pro como *prefill* eleva la coincidencia léxica de Qwen 3.8 A95B con la respuesta visible del modelo teacher del 16,79 % al 34,97 %, un salto de 18,18 puntos porcentuales. La prueba usa 45 problemas , 15 STEM, 15 no‑STEM y 15 puzzles sintéticos, y mide la media de *recall* de unigramas, bigramas y trigramas en los primeros 100 tokens de la salida del modelo objetivo.

Kimi K3 parte de una base más alta (31,11 %) y sube a 35,65 % (+4,54 pp). DeepSeek V4 Flash pierde 1,17 pp y Inkling apenas gana 0,46 pp. En Qwen 3.8 la mejora se concentra en STEM (+26,99 pp), seguida de puzzles (+14,75 pp) y no‑STEM (+12,80 pp). El autor del post especula que Qwen pudo haber sido entrenado con datos de un modelo GPT cercano, no con Opus, dado el tamaño del efecto.

## Qué no se sabe

- Qué es exactamente GPT‑5.5 Pro; no corresponde a ningún modelo público de OpenAI.
- Arquitectura, datos y hyperparámetros de Qwen 3.8 A95B.
- Prompts, código de evaluación y semillas usadas para generar el *prefill* y medir el *recall*.
- Naturaleza de los «puzzles sintéticos privados».
- Significancia estadística, intervalos de confianza y si el experimento se repitió con otras configuraciones.
