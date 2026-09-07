---
title: "Un método en tiempo de inferencia detecta explicaciones infieles eliminando"
summary: "Investigadores de MIT y Harvard proponen un sistema que prueba la fidelidad de una explicación borrando del input original todo rastro de los conceptos que la explicación omite; si la respuesta del modelo cambia, la explicación era incompleta."
lang: es
story: removal-based-method-improves-llm-explanation-faithfulness
publishedAt: 2026-09-07T13:00:53.960Z
sourceUrl: "https://arxiv.org/abs/2609.04343"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, explicabilidad, inferencia, auditoria]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un artículo en arXiv describe un método que actúa en tiempo de inferencia para mejorar la fidelidad de las explicaciones que producen los modelos de lenguaje. El enfoque, llamado *removal-based*, parte de la idea de que muchas explicaciones resultan infieles porque omiten factores que sí influyeron en la respuesta. Para detectar y corregir esa incompletitud, el sistema toma la explicación generada, identifica los conceptos que no aparecen en ella y elimina del *input* original cualquier rastro de esos conceptos. A continuación, consulta de nuevo al modelo con la versión reducida del *input*. Si la respuesta cambia, la explicación original era incompleta; si se mantiene, gana credibilidad.

El procedimiento no modifica los pesos del modelo ni requiere reentrenamiento, por lo que funciona sobre cualquier arquitectura accesible mediante *prompting*. Los autores , Qinglan Luo, S. M. A. Nahian, John Guttag, S. Mazdak Abulnaga y Katie Matton, evalúan la técnica sobre dos *datasets*, varias familias de modelos y dos métricas de fidelidad independientes, comparándola contra *standard prompting* y contra *prompting* diseñado para fomentar la fidelidad. El *paper* (arXiv:2609.04343v1) se envió el 3 de septiembre de 2026.

La relevancia práctica es inmediata para equipos que auditan salidas de LLM en entornos regulados o de alto riesgo. Al operar en *test-time*, el método se puede insertar como una capa de verificación antes de que una explicación llegue a un humano o a un sistema *downstream*, sin necesidad de mantener versiones *fine-tuned* ni de gestionar *pipelines* de entrenamiento adicionales.

## Qué no se sabe

- Qué *datasets* concretos se usaron en los experimentos.
- Qué familias de modelos se evaluaron exactamente.
- Cuáles son las dos métricas de fidelidad independientes empleadas.
- Qué mejora cuantitativa (porcentaje, puntos) se obtuvo frente a los *baselines*.
- Cómo se detectan y extraen los «conceptos» de la explicación para decidir qué remover.
- Si hay código o datos públicos asociados; el registro en arXiv muestra enlaces a repositorios pero el texto no lo confirma.
- Detalles de los *prompts* exactos usados en los *baselines* (*standard prompting* y *prompting to encourage faithfulness*).
