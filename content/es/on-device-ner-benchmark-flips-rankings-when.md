---
title: "Un estudio compara nueve modelos locales de reconocimiento de entidades sin usar la"
summary: "La investigación evalúa etiquetadores clásicos, codificadores GLiNER y LLMs generativos (Qwen3, DeepSeek-R1) de 13M a 8B parámetros en tres corpus. El gold humano invierte el ranking: los codificadores suben y los generativos bajan."
lang: es
story: on-device-ner-benchmark-flips-rankings-when
publishedAt: 2026-10-02T13:06:51.309Z
sourceUrl: "https://arxiv.org/abs/2610.00007"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [ner, on-device, gliner, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un estudio reproducido desde cero en arXiv compara nueve sistemas de reconocimiento de entidades nombradas que funcionan enteramente en dispositivo, sin llamadas a API y con los datos en local. Los autores agrupan los candidatos en tres paradigmas: un etiquetador clásico basado en spaCy, codificadores bidireccionales especializados de la familia GLiNER (entre 166 y 460 millones de parámetros) y modelos generativos locales de la serie Qwen3 (0.6B, 1.7B y 4B-Instruct) junto a DeepSeek-R1 (1.5B y 8B). El rango total de tamaños va de 13 millones a 8.000 millones de parámetros.

La evaluación se hace sobre tres corpus de naturaleza distinta. Uno de ellos, RSS-News, carecía de anotación de referencia. Para resolverlo construyen un "silver gold" mediante un panel de jueces LLM cross-family y validan su fidelidad de dos formas: contra el gold de benchmarks establecidos y mediante una re-validación humana completa del corpus. El acuerdo strict F1 entre el silver y el gold humano es 0.95, aunque los autores advierten que es una cota superior porque el gold humano partió de semillas silver.

El origen del gold invierte el ranking de paradigmas. Al pasar de silver autorado por LLM a gold humano, todos los codificadores suben y todos los generativos bajan. En precisión pura, un LLM instruct de 4B es competitivo y lidera en newswire limpio, pero la ventaja práctica del codificador es la desplegabilidad: iguala o supera ligeramente al generativo grande con entre 1/9 y 1/24 del tamaño, latencias de milisegundos a segundos y cero salidas malformadas. Los modelos generativos más pequeños emiten hasta un 27% de salidas inválidas en entradas largas; el fallo se corrige escalando el modelo, no aumentando el presupuesto de tokens de salida.

La confianza por span que produce GLiNER rankea bien la corrección (AUROC 0.76-0.86) pero es sistemáticamente sobreconfiada: el error de calibración esperado (ECE) oscila entre 0.24 y 0.47. Aplicar temperature scaling reduce el ECE aproximadamente a la mitad. Umbralizar sobre esa confianza calibrada da una pequeña ganancia honesta de F1 out-of-sample. Una cascada local small-to-large aporta una ganancia modesta y dependiente del corpus frente a enrutamiento aleatorio con coste igualado. La confianza correlaciona con corrección, no con novedad de la entidad.

Todos los números se recalculan offline desde registros por span; el código y los logs reproducen todo sin conexión.

## Lo que no se sabe

- Cuáles son los otros dos datasets además de RSS-News y sus características exactas.
- Detalles del panel de jueces LLM cross-family: qué modelos, cuántos y cómo se agrega su veredicto.
- Protocolo exacto de la re-validación humana completa: número de anotadores, guidelines y acuerdo inter-anotador.
- Métricas de latencia concretas por modelo y hardware usado.
- Definición precisa de "salida inválida" (malformed output) y cómo se mide.
- Resultados de accuracy (F1, precision, recall) por modelo y dataset en tablas completas.
- Detalles de la cascada small-to-large: qué modelos, umbrales y ganancia exacta por corpus.
- Cómo se define y mide "novedad" de entidades para el análisis de confianza.
- Configuración de temperature scaling que reduce ECE a la mitad.
- Dónde está alojado el código y los registros por span (repositorio, licencia).
