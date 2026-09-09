---
title: "Un plugin para Claude Code obliga al asistente a responder solo con acciones directas"
summary: "El skill i-have-adhd elimina preámbulos, despedidas y explicaciones: devuelve comandos numerados, pasos concretos y límites de longitud para reducir la carga cognitiva del programador."
lang: es
story: i-have-adhd-plugin-turns-claude-code
publishedAt: 2026-09-09T12:08:55.682Z
sourceUrl: "https://github.com/ayghri/i-have-adhd"
sourceName: "Hacker News (portada)"
priority: routine
tags: [plugin, claude, productividad, accesibilidad]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
i-have-adhd es un skill para Claude Code que obliga al agente a responder con acción primero, sin preámbulos, sin despedidas y sin tangentes. Se instala como plugin desde el repositorio de ayghri y, una vez activado, cambia la estructura de la respuesta: pasos numerados, comandos directos, límites claros de longitud y sin rodeos.

El archivo central es skills/i-have-adhd/SKILL.md, donde se definen 10 reglas. Algunas se conocen: liderar con la siguiente acción inmediata, numerar tareas multi-paso, terminar con un paso concreto, estimar tiempos en minutos, hacer visibles los logros, tratar los errores como datos, limitar las listas a 5 elementos. El resto no se detalla en la fuente, pero el patrón es claro: todo está pensado para reducir la carga cognitiva del programador, que no quiere leer explicaciones para encontrar lo que debe ejecutar.

La comparación entre antes y después lo muestra todo. Una respuesta típica sin el skill incluye frases como "Hope this helps!" y párrafos de contexto. Con el skill, lo mismo se reduce a:

```bash
npm install jsonwebtoken@latest
```

Seguido de:

```bash
npm test -- auth.spec.ts
```

Y una referencia a src/auth.ts:42 si hace falta. Nada más. El skill suprime todo lo que no sea accionable.

Para usarlo con otro repositorio o customización, hay que hacer fork, editar el SKILL.md, desinstalar el plugin original, eliminarlo del marketplace, añadir el fork e instalarlo. El comando para gestionar los plugins en Claude Code es:

```bash
claude plugin uninstall i-have-adhd
claude plugin marketplace remove i-have-adhd
claude plugin marketplace add <tu-usuario>/i-have-adhd
claude plugin install i-have-adhd@i-have-adhd
```

El skill se basa libremente en The Adult ADHD Tool Kit, de Ramsay y Rostain, pero adaptado al comportamiento de un LLM. No es una herramienta para tratar el TDAH, sino para simular una respuesta más directa, como si el asistente tuviera que cumplir con una disciplina de output. La licencia es MIT.

Lo que no se sabe: el contenido exacto de las 10 reglas, qué otros asistentes de codificación soporta el skill (solo se confirma para Claude Code), cómo se invoca exactamente tras instalarlo (se menciona "re-invoke /i-have-adhd" pero no el flujo completo), qué contiene el AGENTS.md al que se refiere la documentación, y si hay métricas de adopción o datos de uso en el repositorio.
