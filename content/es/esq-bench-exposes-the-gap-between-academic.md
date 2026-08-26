---
title: "ESQ-Bench expone la brecha semántica de los LLM en SQL empresarial"
summary: "El benchmark ejecuta 550 consultas validadas sobre seis esquemas idénticos de 465 tablas en Oracle, Postgres, MySQL y SQL Server. GPT-4o con schema-linked prompting cae del 79,8 % al 57,2 % de Execution Match entre Tier-1 y Tier-3, y hasta el 99 % de sus aciertos en..."
lang: es
story: esq-bench-exposes-the-gap-between-academic
publishedAt: 2026-08-26T07:30:38.130Z
sourceUrl: "https://arxiv.org/abs/2608.23569"
sourceName: "arXiv cs.AI"
priority: routine
tags: [benchmark, sql, llm, oracle]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
ESQ-Bench publica seis esquemas idénticos con 465 tablas, 164.682 filas y cero tablas vacías en Oracle, PostgreSQL, MySQL y SQL Server. Sobre esa base corren 550 pares pregunta-consulta validados, repartidos en tres niveles de complejidad de esquema: Tier-1 con 95 consultas, Tier-2 con 228 y Tier-3 con 227. El paper introduce cuatro métricas: Exact Match (EM), Execution Match (EX), Schema Relevance (SR) y Silent Divergence (SD). Esta última mide cuántas consultas devuelven resultados distintos al gold estándar aunque pasen EX.

GPT-4o con schema-linked prompting muestra una degradación monótona de EX en consultas ejecutadas: 79,8 % en Tier-1, 60,3 % en Tier-2 y 57,2 % en Tier-3. EM se mantiene por debajo del 7 % en todos los tiers. La divergencia silenciosa operacional alcanza entre el 73 % y el 99 % entre las consultas que superan EX, lo que indica que la mayoría de aciertos en ejecución devuelven semántica errónea. El análisis de fallos sitúa la semántica de resultado incorrecta como causa dominante en los tiers altos.

Claude Sonnet 4.6 con schema-linked prompts mejora los registros: 87,4 %, 74,9 % y 68,7 % de EX ejecutadas en T1, T2 y T3 respectivamente, superando a GPT-4o en cada nivel. GPT-4o zero-shot invierte la tendencia respecto a schema-linked en Tier-2 y Tier-3 (73,5 % y 77,8 % frente a 60,3 % y 57,2 %) por menores tasas de ejecución y sesgo de supervivencia. Llama 3.2 local con schema-linked apenas alcanza el 13,3 % EX bank-wide (73 de 550), lo que evidencia la brecha entre modelos de API cerrada y pesos abiertos en esquemas Oracle empresariales.

Un piloto previo de 142 preguntas mostraba para GPT-4o schema-linked 75,6 %, 80,4 % y 95,8 % de EX en T1, T2 y T3, cifras muy superiores al benchmark final. El paper no explica la discrepancia.

## Lo que no se sabe

- Definición exacta de las métricas SR y SD; el texto solo las nombra.
- Detalles de la construcción de los seis esquemas: dominios, claves foráneas, tipos de datos Oracle-specific.
- Qué incluye exactamente el "schema-linked prompting" (DDL, muestras, comentarios, tamaño de contexto).
- Criterios de validación "gold-validated" para los 550 pares.
- Configuración de temperatura, top-p, max-tokens y versión exacta de cada modelo evaluado.
- Por qué el piloto de 142 preguntas difiere tanto del benchmark final en resultados de GPT-4o.
- Desglose de tipos de error semántico en el failure analysis.
- Disponibilidad y licencia del código, datos y harness de evaluación; el texto menciona enlaces pero no confirma release.
- Resultados en PostgreSQL, MySQL y SQL Server; el paper es Oracle-first.
- Coste y latencia de inferencia por modelo y tier.
