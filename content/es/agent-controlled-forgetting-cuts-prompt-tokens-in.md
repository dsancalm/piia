---
title: "Un patrón deja al modelo decidir qué borrar del historial para ahorrar tokens"
summary: "El método archiva salidas de herramientas ruidosas y repetitivas bajo criterio del propio agente, reduciendo a la mitad los tokens de entrada en una tarea de depuración encadenada. En flujos lineales no hay ganancia."
lang: es
story: agent-controlled-forgetting-cuts-prompt-tokens-in
publishedAt: 2026-10-09T13:44:13.252Z
sourceUrl: "https://arxiv.org/abs/2610.10590"
sourceName: "arXiv cs.AI"
priority: routine
tags: [contexto, agentes, tokens, arxiv]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un artículo en arXiv presenta *agent-controlled forgetting*, un patrón que deja al propio modelo decidir qué resultados de herramientas archivar. El mecanismo es sencillo: el agente selecciona observaciones previas, las sustituye en su posición original por una nota breve y guarda el contenido exacto en un archivo externo recuperable. Un arnés de Python expone dos operaciones , archivado por lotes y recuperación explícita, sin necesidad de reentrenar el modelo ni de ajustes finos. El sistema protege de forma nativa las instrucciones del usuario y los mensajes del asistente, de modo que solo se comprimen salidas de herramientas.

En el experimento principal se encadenaron dos tareas: una sesión de depuración con OpenTelemetry seguida de una implementación independiente. Con el método activo, el proveedor reportó 231 951 tokens de prompt frente a 912 492 manteniendo el historial completo. Los tokens de entrada acumulados cayeron un 50 % y el coste estimado de API pasó de 4,38 USD a un rango de 1,28-1,44 USD. Ambos brazos superaron el oráculo conductual primario de dos casos, aunque ninguno cumplió por completo la evaluación de seguimiento. A cambio, el método realizó más peticiones y tardó un 17 % más en terminar.

Un segundo escenario, descrito como un par de desarrollo de aplicaciones contrastante, no mostró ahorro de contexto ni de coste. Una continuación previa del mismo trabajo había reducido el contexto pero obtuvo menor calidad en una revisión manual. Los autores advierten que la ganancia depende críticamente de la carga de trabajo: trayectorias ruidosas y repetitivas de uso de herramientas se benefician; flujos más lineales o densos en información no lo hacen.

El artículo tiene 13 páginas y una figura. No se publica el código del arnés ni se resuelve el enlace a los artefactos. Tampoco se detallan el modelo y proveedor usados, la estructura exacta de la nota de sustitución, la definición formal del oráculo conductual ni los criterios de la evaluación de seguimiento.

**Lo que no se sabe**
- API y funciones concretas del arnés de Python para archivar y recuperar.
- Definición precisa del "oráculo conductual primario de dos casos" y de la "evaluación de seguimiento".
- Qué tareas componen el "par de desarrollo de aplicaciones contrastante" y la "continuación anterior".
- Modelo y proveedor de API empleados en los experimentos.
- Formato y contenido de la nota breve que reemplaza al resultado de la herramienta.
- Mecanismo técnico que protege instrucciones de usuario y mensajes del asistente.
- Disponibilidad real del código y artefactos (el enlace del PDF no se resuelve).
