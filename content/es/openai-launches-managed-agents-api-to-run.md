---
title: "OpenAI lanza la Agents API para crear agentes autónomos en su nube"
summary: "El servicio gestiona estado, herramientas y sesiones largas en los servidores de OpenAI, eliminando infraestructura propia pero atando la lógica a un solo proveedor."
lang: es
story: openai-launches-managed-agents-api-to-run
publishedAt: 2026-09-11T11:52:32.070Z
sourceUrl: "https://openai.com/index/introducing-the-agents-api"
sourceName: "OpenAI"
priority: urgent
tags: [openai, agentes, api, infraestructura]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenAI ha presentado la Agents API, un servicio gestionado para construir y desplegar agentes autónomos directamente en su infraestructura. El anuncio reúne la orquestación, las sesiones de larga duración y el uso de herramientas bajo un mismo techo, eliminando la necesidad de mantener servidores, colas de mensajes o bases de datos de estado propias. El motor que lo sostiene es el arnés Codex, la misma tecnología que impulsa el agente de codificación de OpenAI, ahora expuesto como primitiva programable para cualquier tarea.

La propuesta compite frontalmente con frameworks como LangGraph Cloud, AutoGen o crewAI. La diferencia estructural es quién opera la infraestructura de estado. Con la Agents API, el contexto de la conversación, el historial de llamadas a herramientas y los checkpoints de ejecución residen en los servidores de OpenAI. En los frameworks self-hosted, tú controlas la base de datos, el escalado horizontal y la latencia de red entre componentes. Externalizar esa capa reduce la superficie operativa a una sola llamada HTTP, pero ata la lógica de negocio a la disponibilidad, los límites de tasa y la hoja de ruta de un proveedor único.

El arnés Codex gestiona el bucle de razonamiento-actuación: el modelo decide qué herramienta invocar, la API la ejecuta (o devuelve el control para que la ejecute tu código), y el resultado se inyecta de nuevo en el contexto. Eso permite flujos que duran horas o días , procesamiento de documentos masivos, investigación web iterativa, pipelines de datos con intervención humana, sin que la aplicación cliente mantenga una conexión abierta. La sesión persiste en la nube y se reanuda con un identificador.

Lo que no se sabe

- Fecha de disponibilidad general, fases de beta o lista de espera.
- Modelo de precios: coste por sesión, tokens consumidos, tiempo de cómputo o herramientas invocadas.
- Detalles técnicos del arnés Codex: arquitectura interna, límites de ventana de contexto, catálogo de herramientas nativas soportadas.
- Diferencias funcionales respecto a la Assistants API o la Responses API actuales.
- SLA, garantías de disponibilidad, regiones de despliegue y certificaciones de cumplimiento.
- Ejemplos de código de inicio rápido o plantillas de casos de uso.
