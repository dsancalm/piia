---
title: "Google lanza Gemini 3.8 Flash con razonamiento configurable y una versión para"
summary: "El modelo duplica la ventana de contexto a un millón de tokens y añade tres niveles de profundidad que ajustan el coste en tiempo real. La variante Cyber, restringida al programa Fairwind, supera a rivales mayores en descubrimiento y parcheo de vulnerabilidades reales."
lang: es
story: google-releases-gemini-3-8-flash-with
publishedAt: 2026-09-03T11:46:12.974Z
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [google, gemini, ia, ciberseguridad]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google ha lanzado Gemini 3.8 Flash y su variante especializada 3.8 Flash Cyber. El modelo principal mantiene el precio de 3.7 Flash: 0,75 dólares por millón de tokens de entrada y 3,75 por millón de salida. A cambio duplica la ventana de contexto hasta un millón de tokens y añade un parámetro de "razonamiento" configurable en tres niveles: low, medium y high. En la práctica, el modelo decide cuántos pasos internos ejecuta antes de responder. En nivel alto puede consumir muchos más tokens de salida para resolver problemas de largo horizonte; en nivel bajo se comporta como un modelo rápido y barato. 3.7 Flash sigue disponible para quien priorice latencia y coste por encima de profundidad.

Los benchmarks publicados sitúan a 3.8 Flash por encima de la mayoría de modelos frontera mayores en DeepSWE v1.1, una prueba de ingeniería de software de largo recorrido, y le dan un 54,9 % en HLE-Verified, que mide razonamiento multi-paso en STEM, humanidades y ámbitos profesionales. En Vals Finance Agent V2 y en el benchmark de agente legal de Harvey también supera a 3.7 Flash y a rivales de mayor tamaño. La mejora no viene de una arquitectura distinta, sino de bucles agenticos que evalúan y refinan la respuesta recursivamente durante la inferencia, entrenados con datos exigentes de ciberseguridad.

## Seguridad ofensiva en manos defensivas

3.8 Flash Cyber comparte la base de 3.8 Flash pero relaja las mitigaciones de ciberofensa. Está restringido al Fairwind Program: gobiernos de confianza, operadores de infraestructura crítica y mantenedores de software open source. En CyberGym, el benchmark estándar de descubrimiento de vulnerabilidades, supera a 3.5 Flash Cyber y a modelos mayores. En un benchmark interno de 20 lenguajes alcanza más del 70 % de éxito. En CWE-Bench (parcheo real, evaluado por Collinear) logra 47,2 % pass@1 frente al 47,8 % del mejor modelo frontera, a coste significativamente menor. El equipo de seguridad de Chrome reporta 2,6 veces más parches correctos que modelos comerciales mayores. Wiz mide entre un 7,5 % y un 9,7 % más de recall en pruebas de penetración por entre 2,3 y 5,2 veces menos coste. El equipo de investigación de vulnerabilidades de Google Cloud encontró una vulnerabilidad crítica en menos de dos horas, trabajo que suele llevar meses.

Ambos modelos incluyen salvaguardas CBRN y contra prompt injection reforzadas según el Frontier Safety Framework. La versión Cyber solo afloja las restricciones necesarias para análisis de código malicioso y generación de parches.

## Dónde usarlos hoy

Desarrolladores: Google AI Studio, Gemini API, Android Studio y Stitch para generar UIs. Empresas: Gemini Enterprise. Consumidores: suscriptores Google AI Pro y Ultra en la app Gemini, AI Mode en Search y Gemini en Sheets. Acceso a 3.8 Flash Cyber requiere solicitud al Fairwind Program.

## Qué no se sabe

- Fecha exacta de disponibilidad general (GA) por canal.
- Detalle técnico de los bucles agenticos y cómo se configuran los niveles de esfuerzo en la API.
- Criterios de elegibilidad y proceso de aplicación concretos para Fairwind.
- Arquitectura del modelo: parámetros, modalidades soportadas, ventana de contexto real por modalidad.
- Comparativa en SWE-bench, HumanEval, MBPP y otros benchmarks de codificación estándar.
- Latencia real (TTFT, tokens/seg) en producción frente a 3.7 Flash.
- Soporte de fine-tuning o destilación.
- Política de deprecación y timeline de soporte para 3.7 Flash.
- Qué datasets exactos del USGS se usaron en el ejemplo del mapa topográfico.
- Disponibilidad geográfica de los modelos y del programa Fairwind.
