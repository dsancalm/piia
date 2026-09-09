---
title: "Reescribir la consulta no mejora un RAG fuerte salvo si fusionas varios métodos"
summary: "Un estudio empírico muestra que cuatro estrategias de reescritura y dos baselines (HyDE, Query2Doc) empatan con el baseline denso+rerank+MMR en tres benchmarks."
lang: es
story: query-rewriting-helps-rag-only-when-combined
publishedAt: 2026-09-09T11:53:11.310Z
sourceUrl: "https://arxiv.org/abs/2609.05637"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [rag, retrieval, reranking, query-rewriting]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Si ya tienes un pipeline RAG sólido , retrieval denso con BGE, reranking con cross-encoder y diversificación MMR, reescribir la consulta en cada petición no mejora el recall. El paper lo demuestra empíricamente sobre tres benchmarks y con tests de significancia bootstrap a tres semillas. Las cuatro estrategias de reescritura (S1, S4) y los dos baselines fuertes (HyDE, Query2Doc) quedan, cada uno por separado, a la par del baseline sin reescritura. La ganancia real aparece solo cuando se fusionan los resultados de varios métodos: en EnterpriseRAG-Bench (512 K documentos) la unión post-hoc de S1+S3+S4+HyDE sube HIT@10 de 39,22 a 51,70 (+12,5 puntos) y la de cinco métodos llega a 52,98 (+13,8). Los controles matched-budget capturan apenas el 40 % de esa mejora, con lo que el driver es la complementariedad de cobertura, no el mayor presupuesto de retrieval.

El comportamiento no es uniforme. En HotpotQA la fusión suma +1,6 a +1,8 puntos (p<0,001) y satura el oracle all-method. En AmbigNQ, en cambio, la misma fusión perjudica: -2,4 puntos bajo el mejor método individual (p<0,001). Los autores analizan cuándo y por qué ocurre, aunque el abstract no detalla la causa.

Para explotar la complementariedad sin pagar el coste de reescribir siempre, proponen un router confidence-gated: reescribe solo cuando el score top-1 del baseline es bajo. En EnterpriseRAG-Bench el router captura aproximadamente la mitad de la ganancia del full-merge (+4,3 HIT@10) activando la reescritura en menos del 40 % de las consultas, y decide no reescribir en AmbigNQ de forma automática. En evaluación downstream con un LLM generador, el router mejora F1 en +1,92 (p<0,01) pagando alrededor del 40 % del coste de expansión completa.

La conclusión práctica: trata la reescritura como fuente complementaria de cobertura y úsala bajo un routing coste-aware, no como sustituto standalone de un baseline ya fuerte.

**Lo que no se sabe**
- Definición exacta de las estrategias S1, S4 (el abstract no las describe).
- Umbral y calibración del score top-1 que usa el router confidence-gated.
- Causa concreta de la degradación en AmbigNQ.
- Configuración completa del baseline: versión de BGE, cross-encoder empleado, parámetros MMR.
- Detalles de EnterpriseRAG-Bench: dominio, tipología de queries, métricas más allá de HIT@10.
- Coste computacional absoluto (latencia, tokens, $) de reescritura frente a retrieval.
- Resultados en nDCG, MRR u otras métricas de ranking.
- Si el router se evalúa también en HotpotQA y AmbigNQ o solo en enterprise.
- Especificación de la evaluación downstream: LLM generador, prompt, definición exacta de F1.
- Disponibilidad pública de código y datos (el abstract menciona enlaces pero no confirma acceso).
