---
title: "IBM mide y reduce la inconsistencia de agentes con GPT-4.1 sin re-ejecutar tareas"
summary: "Un analizador detecta puntos de decisión inestables en una sola ejecución exitosa y genera reglas en lenguaje natural que elevan el Pass^5 del 53 % al 69 % en AppWorld, cerrando la brecha de consistencia de 24 a 12 puntos."
lang: es
story: ibm-research-shows-llm-agents-fail-nearly
publishedAt: 2026-09-16T12:00:58.451Z
sourceUrl: "https://huggingface.co/blog/ibm-research/altk-evolve-consistency"
sourceName: "Hugging Face"
priority: urgent
tags: [agentes, consistencia, ibm, gpt-4]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
IBM Research ha publicado en el blog de Hugging Face un estudio que cuantifica un problema conocido por cualquiera que haya llevado un agente a producción: el agente resuelve la tarea una vez, pero falla en el segundo o tercer intento. El artículo, firmado por una docena de investigadores, presenta una metodología para medir y reducir esa brecha de consistencia sin necesidad de re-ejecutar la tarea completa ni de disponer de *ground truth*.

La evaluación se realizó sobre **AppWorld test_normal**, un benchmark de 168 tareas que simulan interacciones con aplicaciones tipo móvil. Un agente ReAct con GPT-4.1 a temperatura 0,0 alcanza un **Mean@5 del 77,4 %**: si lanzas la misma tarea cinco veces, acierta de media en casi cuatro. Pero el **Pass^5** , la métrica que exige que los cinco intentos salgan bien, se queda en el **53,0 %**. La diferencia, **24,4 puntos porcentuales**, es la brecha de consistencia. En las tareas clasificadas como difíciles la brecha supera los 30 puntos.

El diagnóstico no requiere correr la tarea de punta a punta varias veces. El **Consistency Analyzer** toma una única trayectoria exitosa, identifica cada punto de decisión y pide *k*=5 completaciones solo en ese paso (una llamada al modelo por paso). Así detecta en qué nodos el modelo diverge aunque la temperatura sea cero. A partir de esa señal genera **consistency guidelines**: reglas en lenguaje natural que el agente consulta en ejecuciones posteriores.

Ejemplos reales de guidelines:
- "When counting checkbox-style markers in note content, use a line-anchored regex match rather than a plain substring count , note titles often repeat the marker symbol in a legend line".
- "Always verify search results for note queries by checking for multiple matches and confirming the correct note before proceeding".

Tras inyectar esas guidelines, el **Pass^5 sube al 69,0 % (+16,0 pp)** y el **Mean@5 al 81,0 % (+3,6 pp)**. La brecha cae a **12,0 puntos**. En tareas medias la mejora absoluta es de **22,9 pp (+44 % relativo)** y en difíciles de **14,3 pp (+45 % relativo)**. Las tareas fáciles ganan **12,2 pp**. Los resultados se validaron con cinco *runs* frescas por tarea.

Lo que no se sabe
- Enlace exacto al *technical report* en arXiv.
- Código, prompts y parámetros del Consistency Analyzer.
- Definición precisa de las categorías *easy/medium/hard* en AppWorld.
- Coste añadido en latencia, tokens y dinero del *resampling* por paso.
- Grado de automatización en la generación de guidelines (¿revisión humana?).
- Generalización a otros benchmarks y a otros modelos.
- Formato de almacenamiento y *retrieval* de guidelines en ALTK-Evolve.
- Qué fracción de pasos se flaggea por trayectoria y si hay umbral configurable.
