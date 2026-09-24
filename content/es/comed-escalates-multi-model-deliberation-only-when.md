---
title: "COMED decide cuándo merece la pena que varios modelos deliberen"
summary: "Un controlador mide auto-consistencia, margen del enrutador y una sonda ligera para elegir entre responder ya o escalar a colaboración multi-modelo. En 16 configuraciones open-weight supera siempre al ancla fijo y al enrutamiento; en MedQA gana 10,7 puntos con menos modelos..."
lang: es
story: comed-escalates-multi-model-deliberation-only-when
publishedAt: 2026-09-24T12:07:46.544Z
sourceUrl: "https://arxiv.org/abs/2609.26913"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [llm, colaboracion, enrutamiento, benchmark]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
COMED (Controlled Model Escalation for Multi-LLM Deliberation) es un controlador situado entre el enrutamiento estricto y la colaboración densa. La idea central es lanzar un modelo ancla, medir tres señales ligeras y decidir si merece la pena invocar a otros modelos para deliberar. Si la señal indica que no, se conserva la respuesta del ancla y se evita el coste completo de la colaboración.

La colaboración densa, es decir, hacer que varios modelos discutan hasta consensuar, no siempre aporta. El paper demuestra que no es monótona: a veces corrige un fallo que ningún modelo resuelve por sí mismo, pero otras veces degrada una respuesta que ya era correcta. COMED formaliza este trade-off con una descomposición rescue-harm: la colaboración selectiva mejora al ancla cuando los errores rescatados superan los daños inducidos.

Las tres señales son:

1. Auto-consistencia del ancla: varias muestras del mismo modelo a temperatura mayor que cero. Si hay discrepancy, hay incertidumbre real.
2. Margen del enrutador: diferencia de confianza entre la mejor y la segunda mejor opción del router. Un margen estrecho sugiere que la decisión no es clara.
3. Sonda de pares (peer probe): un clasificador ligero que predice si la deliberación ayudará o perjudicará, basándose en representaciones intermedias del ancla y los candidatos.

Si la combinación de señales supera un umbral, COMED escala a colaboración; si no, devuelve la respuesta del ancla.

En 16 configuraciones de modelos open-weight evaluadas, COMED mejora siempre al ancla fijo y al enrutamiento. En MedQA logra hasta +10.7 puntos porcentuales invocando menos modelos y decodificando menos tokens que la colaboración densa. Con modelos frontera en HLE, eleva GPT-5.5 del 23.1% al 28.1% (+5.0 pp), superando a la colaboración densa y marcando el mejor resultado publicado. El trabajo se presenta en AACL-IJCNLP 2026.

Qué no se sabe:

- Qué modelos open-weight exactos componen los 16 ajustes.
- Arquitectura, tamaño, datos de entrenamiento y latencia del peer probe.
- Overhead real de latencia y coste de COMED frente al enrutamiento puro en despliegue.
- Definición operativa y cálculo del router margin en los experimentos.
- Si hay código, checkpoints o datos públicos liberados.
- Detalles de los benchmarks de razonamiento científico y general usados.
- Hiperparámetros exactos: temperatura, número de muestras para auto-consistencia, umbrales de decisión.
