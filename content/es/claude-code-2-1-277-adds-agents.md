---
title: "Claude Code 2.1.277 admite AGENTS.md como alternativa a CLAUDE.md"
summary: "La nueva versión busca AGENTS.md si no encuentra CLAUDE.md, facilitando a quienes ya usan ese nombre en otros asistentes. Aún no hay documentación oficial ni fecha para la API de mods."
lang: es
story: claude-code-2-1-277-adds-agents
publishedAt: 2026-09-19T11:26:11.022Z
sourceUrl: "https://simonwillison.net/2026/Sep/18/thariq-shihipar/"
sourceName: "Simon Willison"
priority: routine
tags: [claude, agentes, desarrollo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Claude Code 2.1.277 añade soporte para AGENTS.md como archivo de instrucciones alternativo a CLAUDE.md. Si el sistema no encuentra CLAUDE.md en el directorio de trabajo, busca AGENTS.md y usa su contenido como contexto de la sesión.

La función se implementa como un mod integrado dentro de la nueva arquitectura "Claude Code mods", que en el futuro permitirá crear personalizaciones del arnés de ejecución. El código fuente de este mod está publicado, aunque el anuncio no indica la ubicación exacta.

Thariq Shihipar comunicó el cambio el 18 de septiembre de 2026 y Simon Willison lo recogió en su weblog el mismo día. La adición responde a una necesidad práctica: muchos desarrolladores ya usan AGENTS.md en flujos de trabajo con otros asistentes de código y pueden mantener esa convención sin renombrar archivos.

Aún no se ha documentado la estructura esperada para AGENTS.md ni si hay diferencias semánticas frente a CLAUDE.md más allá del nombre. Tampoco hay fecha para la apertura de la API de mods personalizados ni confirmación de si AGENTS.md pretende ser un estándar multiplataforma o una convención interna de Anthropic.

## Lo que no se sabe

- Qué campos o sintaxis debe contener un AGENTS.md válido.
- Cuándo se liberará la capacidad de escribir mods propios.
- Dónde está alojado exactamente el código fuente del mod integrado.
- Si AGENTS.md y CLAUDE.md tienen comportamiento idéntico o hay matices.
- Si Anthropic propone AGENTS.md como estándar abierto o es solo compatibilidad interna.
