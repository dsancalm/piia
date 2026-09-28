---
title: "Cartograph reduce el descubrimiento de herramientas MCP a tres llamadas firmadas"
summary: "Un proxy federado sustituye el catálogo completo por tarjetas de capacidad firmadas con Ed25519 y un análisis de clústeres que detecta 49 grupos confundibles."
lang: es
story: cartograph-proxy-cuts-tool-discovery-tokens-by
publishedAt: 2026-09-28T14:23:03.981Z
sourceUrl: "https://arxiv.org/abs/2609.30293"
sourceName: "arXiv cs.CL"
priority: routine
tags: [mcp, proxy, descubrimiento, firma]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cartograph es un proxy MCP federado que cambia el descubrimiento de herramientas visible para el agente de una complejidad O(n) , recorrer catálogos completos, a una recuperación atestada por operador O(k), donde k es el número de servidores relevantes. En el despliegue de evaluación con 22 servidores y 374 herramientas, el proxy expone solo tres herramientas de descubrimiento en lugar de las 374 definiciones individuales.

El sistema combina tres mecanismos. Primero, tarjetas de capacidad atestadas por operador: descripciones firmadas con Ed25519 generadas bajo el control de quien despliega el servidor, no por el agente ni por un LLM externo. Segundo, Rift, un análisis de clústeres confundibles de tres capas que incluye clustering de densidad, análisis de margen de consulta y diagnóstico de tokens. Rift identificó 49 clústeres confundibles en el despliegue, cuatro de ellos marcados con riesgo ALTO en tarjetas generadas por bootstrap. Tercero, una recuperación en dos etapas que rankea servidores antes que herramientas, reduciendo el espacio de búsqueda antes de puntuar herramientas individuales.

En un benchmark de 49 consultas construido por los autores, Cartograph alcanza R@5 de 0.816 frente a 0.592 de un baseline de palabras clave Jaccard. Un intercambio de descubrimiento top-5 medido consume 475 tokens en lugar de los 42.450 que requeriría la contabilidad de catálogo completo declarada. Las mediciones de gateway en diez pruebas añaden 5 ms de latencia media, un 0.8 % de overhead respecto a llamadas directas stdio MCP.

Una comparación exploratoria con 119 descripciones generadas por LLM elimina el clúster de distancia cero observado en las tarjetas bootstrap, pero muestra que mezclar regímenes de generación de tarjetas puede reducir R@5. Cartograph es complementario a enfoques de ejecución de código: controla qué descripciones se exponen y registra la procedencia de las usadas para rankeo en cada consulta.

---

### Lo que no se sabe

- Detalles de implementación del proxy MCP federado: código, configuración y despliegue.
- Definición precisa de las tarjetas de capacidad atestadas por operador y su proceso de generación y firma Ed25519.
- Algoritmos concretos de las tres capas de Rift: clustering de densidad, análisis de margen de consulta y diagnóstico de tokens.
- Detalles de la recuperación en dos etapas: criterios de rankeo de servidores y posterior rankeo de herramientas.
- Construcción del benchmark de 49 consultas: consultas exactas, criterios de relevancia y ground truth.
- Metodología de medición de tokens: qué cuenta como token y en qué contexto se midió.
- Definición de "bootstrap-generated cards" y su proceso de generación.
- Detalles de las 119 descripciones generadas por LLM: modelo, prompt y parámetros usados.
- Causa por la que mezclar regímenes de generación de tarjetas reduce R@5.
- Arquitectura del gateway y puntos exactos de medición de latencia.
- Disponibilidad de código, datos o artefactos reproducibles.
- Comparación con otros enfoques de descubrimiento federado más allá del baseline Jaccard.
