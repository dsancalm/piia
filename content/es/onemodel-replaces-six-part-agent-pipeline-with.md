---
title: "Un único modelo sustituye a la cadena modular de agentes en servicios financieros y"
summary: "Investigadores presentan OneModel, que condensa reglas de negocio y SOPs en los pesos de un solo modelo mediante preentrenamiento continuo y SFT, eliminando router, planner y ejecutores separados."
lang: es
story: onemodel-replaces-six-part-agent-pipeline-with
publishedAt: 2026-08-24T09:43:09.922Z
sourceUrl: "https://arxiv.org/abs/2608.20350"
sourceName: "arXiv cs.CL"
priority: routine
tags: [acl2026, agentes, finanzas, latencia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un artículo aceptado en el Industry Track del ACL 2026 describe OneModel, un paradigma que condensa toda la lógica de negocio y los procedimientos operativos estándar (SOP) de un sistema global de servicios financieros en los parámetros de un único modelo. El enfoque elimina la cadena modular clásica , router, retriever, planner, executor, responder, reviewer, que hasta ahora articulaba los agentes en producción. El entrenamiento combina Continual Pre-training (CPT) y un SFT llamado logic-compilation para transformar reglas fragmentadas en razonamiento interno dentro de un espacio de atención unificado.

En pruebas A/B online, la latencia end-to-end cayó de 18,7 segundos a 8,0 segundos, una reducción superior al 50 %. La métrica de resolución inteligente (IRR) subió del 64,3 % al 83,3 %. El paper lo firman 35 autores liderados por Chang Liu y se envió a arXiv el 16 de junio de 2026.

## Qué no se sabe

- Arquitectura base del modelo (tamaño, familia, encoder-decoder o decoder-only).
- Detalles del dataset de CPT: volumen, fuentes, mezcla de datos, proporción de datos de negocio frente a generales.
- Cómo se «compilan» los SOPs a ejemplos de SFT: número de muestras, formato, plantillas.
- Métricas offline (benchmarks, test sets) previas al despliegue.
- Configuración de inferencia: hardware, batch size, KV-cache, cuantización, estrategia de decoding.
- Definición operativa exacta de IRR y método de medida en producción.
- Análisis de regresiones o modos de fallo frente al sistema modular anterior.
- Coste computacional de entrenamiento (GPU-horas, presupuesto) y coste por request en inferencia.
- Estrategia de actualización continua cuando cambian SOPs o reglas (re-CPT, LoRA, distilación).
- Disponibilidad real de código, pesos o datos; la página del paper lista enlaces a plataformas pero no confirma liberación.
