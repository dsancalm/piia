---
title: "SchemaRouter iguala la precisión RAG usando 10 veces menos tokens"
summary: "Un grafo de esquema y una proyección determinista seleccionan campos exactos sin embeddings. En 110 consultas de ciencia de materiales logra 0.71 de precisión con 227 tokens frente a 2.066 del baseline, y fundamenta licencia y procedencia en el 62 % de las respuestas."
lang: es
story: schemarouter-cuts-tokens-and-latency-in-agentic
publishedAt: 2026-08-25T07:30:37.389Z
sourceUrl: "https://arxiv.org/abs/2608.21375"
sourceName: "arXiv cs.AI"
priority: flash
tags: [rag, routing, grafos, benchmark]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
SchemaRouter añade una capa de enrutamiento ligera a sistemas RAG agente que combinan APIs externas, bases de datos internas, vector stores y graph stores. En lugar de describir todas las herramientas al modelo o recuperar todo por similitud vectorial, el método construye un grafo de esquema que modela herramientas, endpoints, parámetros, campos de respuesta, conceptos de dominio, unidades, procedencia y políticas de licencia. Dada una consulta, el sistema emite un plan ejecutable que indica qué herramientas llamar y qué campos recuperar.

El flujo tiene dos etapas. Un LLM pequeño extrae intención, conceptos y restricciones de fuente de la consulta del usuario. Sobre esa salida, una proyección determinista sobre el grafo , mediante grupos de intención y coincidencia concepto-campo con una capa de alias, selecciona los campos exactos que se necesitan. No hay embeddings en la selección de campos; la decisión es reproducible y auditable.

En un benchmark de 110 consultas de ciencia de materiales, SchemaRouter alcanza una precisión de respuesta de 0.71, igualando a fetch-everything (0.71) dentro de intervalos de confianza superpuestos y superando a prompt-all (0.66). La diferencia real está en el coste: 227 tokens de contexto recuperado frente a 2.066 de fetch-everything, y una latencia end-to-end 2.7 veces menor que prompt-all. Además, obtiene la mejor tasa de herramienta exacta (0.93) y validez de parámetros perfecta (1.0). Un hallazgo operativo relevante: fundamenta información de procedencia y licencia en el 62 % de las respuestas, mientras que todos los baselines se quedan cerca del 0 %.

El paper también prueba una variante que minimiza el número de campos seleccionados. Esa estrategia reduce la precisión a 0.56 con un ahorro de tokens despreciable. La proyección que preserva recall restaura la máxima precisión, lo que confirma que recortar campos de forma agresiva daña la calidad más de lo que ahorra.

El código, el benchmark y los fixtures están disponibles en el repositorio asociado al paper.

## Qué no se sabe

- Formalismo exacto del schema graph (tipos de nodos, aristas, restricciones).
- Cómo se construye y mantiene la capa de alias para la coincidencia concepto-campo.
- Arquitectura, tamaño y prompt del LLM pequeño usado para extracción de intención.
- Detalles del dataset de ciencia de materiales, métricas exactas y consultas de ejemplo.
- Comparación con ToolLLM, API-Bank u otros enfoques de routing basados en embeddings.
- Overhead computacional de construir el grafo y ejecutar la proyección determinista.
- Estrategia para herramientas nuevas o esquemas que cambian en caliente.
- Formato del plan ejecutable, lenguaje de orquestación y sandbox de ejecución.
- Resultados en dominios distintos al de ciencia de materiales.
- Licencia y código fuente exacto (el enlace "this https URL" del paper no se resuelve en el texto).
