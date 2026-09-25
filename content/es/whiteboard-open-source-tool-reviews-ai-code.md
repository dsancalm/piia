---
title: "Whiteboard abre su visor de diff semántico en Rust con plugins WebAssembly"
summary: "La herramienta de revisión de código conecta agentes como Claude Code y Codex, resume funciones como pseudocódigo y colapsa tests por defecto. Aún no permite editar archivos ni actualizar revisiones compartidas en tiempo real."
lang: es
story: whiteboard-open-source-tool-reviews-ai-code
publishedAt: 2026-09-25T12:07:12.201Z
sourceUrl: "https://github.com/devdotfast/whiteboard"
sourceName: "Hacker News (portada)"
priority: routine
tags: [revision, rust, ia, opensource]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Whiteboard es una aplicación de escritorio de código abierto (licencia MIT) que plantea un espacio de trabajo compartido entre personas y agentes de IA para el diseño y la revisión de software. El proyecto, alojado en GitHub bajo la organización `devdotfast`, distribuye binarios para macOS y Fedora. Desde la pantalla de bienvenida se conecta a agentes como Claude Code y Codex, y permite pedirles que revisen la rama actual contra `main` abriendo el resultado directamente en la interfaz.

El núcleo técnico diferenciador es un visor de diff semántico y *AST-aware* escrito en Rust. Este componente resume funciones extensas como pseudocódigo y colapsa tests y documentación por defecto. Sobre él se asienta un sistema de plugins basado en WebAssembly que permite personalizar la visualización del diff sin tocar el binario principal. La navegación de código utiliza *keybindings* y el protocolo LSP de VS Code; el equipo vende una versión *vendored* de Code OSS en lugar de mantener parches propios, argumentando que aproximadamente el 45 % del *upstream* actual es código generado por Copilot y no les resulta necesario.

Los agentes disponen de un *decision log* donde pueden consultar y enlazar sus propias trazas dentro del *canvas* para visualizar requisitos, implementación y decisiones autónomas. La aplicación no permite editar archivos en la versión actual, una limitación reconocida por los autores. Tampoco soporta aún múltiples repositorios en una sola revisión, y las revisiones compartidas no se actualizan en tiempo real: hay que volver a compartirlas. La telemetría es anónima, opcional y excluye código, diffs, textos, prompts y salidas del modelo. Está previsto un producto alojado para equipos, pero todo seguirá siendo auto-hospedable.

```text
apps/review-desktop/LICENSE
apps/review-desktop/UPSTREAM
```

Lo que no se sabe: fecha exacta de lanzamiento o versión actual, requisitos de hardware y RAM mínima, lista completa de agentes compatibles más allá de Claude Code y Codex, detalles del roadmap del producto alojado (precios, fecha), cobertura exacta de LSP y lenguajes soportados, métricas de adopción o usuarios activos, rendimiento del visor Rust en repositorios muy grandes, y política de actualización de la versión *vendored* de Code OSS (frecuencia, automatización).
