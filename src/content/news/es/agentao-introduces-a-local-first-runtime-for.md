---
title: "Agentao separa la intención del modelo de la ejecución técnica"
summary: "Este runtime local evita riesgos de seguridad al usar una arquitectura por capas que requiere permisos para cada acción. Así puedes inspeccionar lo que el agente quiere hacer antes de que afecte a tu sistema."
lang: es
story: agentao-introduces-a-local-first-runtime-for
publishedAt: 2026-08-17T07:42:11.046Z
sourceUrl: "https://arxiv.org/abs/2608.13574"
sourceName: "arXiv cs.AI"
priority: routine
tags: [agentes, seguridad, runtime, software]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Agentao es un runtime de ejecución local para agentes de lenguaje que utilizan herramientas. El sistema separa las propuestas de acción del modelo de la ejecución real que autoriza el host. Para lograr esta separación, utiliza una arquitectura por capas. Esta estructura incluye superficies orientadas al host, un contrato de host, un núcleo de runtime y un sistema de herramientas mediado por permisos. También integra subsistemas de memoria, replay, plugins, skills, sub-agentes e integración de protocolos.

Esta arquitectura sirve para construir agentes que modifiquen estados locales. Actualmente, ejecutar acciones basadas en las salidas de un LLM presenta riesgos de seguridad si el modelo tiene acceso directo al sistema. Agentao resuelve este problema mediante la abstracción de permisos y la creación de trazas de ejecución. Al separar la intención del modelo de la ejecución técnica, es posible inspeccionar qué quiere hacer el agente antes de que el sistema ejecute la acción en el entorno local.

## El control sobre el estado y la ejecución

El diseño de Agentao permite que el host mantenga el control sobre el estado de la aplicación mientras el agente resuelve tareas. El programador puede definir límites claros mediante un sistema de herramientas mediado por permisos. El agente propone una acción, pero el runtime la valida bajo un contrato establecido. Esto facilita la creación de agentes gobernables, pues el entorno de ejecución no es un espacio abierto, sino un sistema con reglas de protocolo y límites de memoria definidos.

La arquitectura permite implementar mecanismos de replay. Esto permite repetir secuencias de acciones para depurar el comportamiento del agente o entender por qué una herramienta falló. Esta trazabilidad es necesaria para pasar de prototipos a aplicaciones con supervisión técnica.

No se conoce el contenido exacto del código fuente, los resultados experimentales del framework ni los ejemplos prácticos de uso.

Fuente: arXiv cs.AI
