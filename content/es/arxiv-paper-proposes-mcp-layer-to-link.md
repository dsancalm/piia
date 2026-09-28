---
title: "Una capa MCP conecta agentes LLM con Data Spaces sin tocar su arquitectura"
summary: "Investigadores españoles presentan Eunomia Agent, un prototipo que usa el Model Context Protocol para traducir catálogos, metadatos y servicios de un Data Space a funciones tipadas que el modelo puede invocar directamente."
lang: es
story: arxiv-paper-proposes-mcp-layer-to-link
publishedAt: 2026-09-28T14:27:01.004Z
sourceUrl: "https://arxiv.org/abs/2609.30341"
sourceName: "arXiv cs.AI"
priority: routine
tags: [mcp, data-spaces, llm, arquitectura]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un artículo enviado a arXiv el 24 de septiembre propone una capa de mediación arquitectónica basada en el Model Context Protocol (MCP) para conectar agentes LLM con Data Spaces. La implementación de referencia se llama Eunomia Agent. El objetivo es traducir las capacidades nativas de un Data Space , catálogo, metadatos, invocación de servicios, a herramientas estructuradas y guiadas por esquema que el agente puede descubrir e invocar sin modificar los componentes existentes del Data Space.

El enfoque preserva las restricciones de gobernanza, cumplimiento, interoperabilidad y separación de preocupaciones arquitectónicas. En lugar de acoplar el agente a APIs propietarias o conectores ad hoc, la capa MCP actúa como traductor estándar: expone operaciones del Data Space como funciones tipadas que el modelo puede razonar y llamar. El prototipo valida la interacción extremo a extremo, aunque el artículo no publica métricas de latencia, tasa de éxito ni sobrecarga de la mediación.

Los autores son Jaime Alonso Ruiz, Carlos Aparicio, Gabriel Huecas, Joaquín Salvachúa y Andres Munoz-Arcentales. El PDF ocupa 13 KB y corresponde a la versión v1.

## Qué no se sabe

- Detalles técnicos del esquema de herramientas MCP utilizado (nombres de métodos, parámetros, ejemplos de payloads).
- Resultados cuantitativos de la validación (latencia, tasa de éxito, sobrecarga de la capa de mediación).
- Qué componentes concretos del Data Space se usaron en el prototipo (conector, proveedor de catálogo, motor de políticas).
- Si el código del Eunomia Agent está disponible públicamente y bajo qué licencia.
- Detalles de la gobernanza aplicada (políticas de acceso, contratos de uso, trazabilidad).
- Comparación con enfoques alternativos (function calling nativo, plugins de LangChain, APIs REST directas).
