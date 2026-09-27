---
title: "reladraw publica la versión 0.8.0 de su lenguaje de diagramas declarativos"
summary: "El proyecto permite posicionar nodos con referencias relativas como 'below' o 'right of' y genera SVG sin dependencias de runtime. Se instala vía npm y también como skill para agentes de código, aunque la sintaxis sigue inestable."
lang: es
story: reladraw-adds-text-based-diagrams-with-relative
publishedAt: 2026-09-27T12:21:51.749Z
sourceUrl: "https://github.com/reladraw/reladraw"
sourceName: "Hacker News (portada)"
priority: routine
tags: [diagramas, typescript, svg, cli]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
reladraw es un lenguaje de texto para diagramas que deja la colocación en manos de quien escribe. A diferencia de Mermaid, Graphviz o D2, que calculan el layout automáticamente, y de draw.io o Excalidraw, que obligan a arrastrar elementos con el ratón, reladraw usa posiciones relativas declarativas: `below`, `right of`, `level with`. El resultado es un archivo SVG generado desde una fuente `.reladraw` que se versiona en git sin binarios intermedios.

El parser, el motor de layout y el renderizador SVG están escritos en TypeScript sin dependencias en tiempo de ejecución. La instalación global se hace con npm y la invocación básica es:

```bash
npm install -g reladraw
reladraw diagram.reladraw -o diagram.svg
```

Un ejemplo mínimo del formato:

```
node app "Web app"
node app.ui "Interface"
node app.api "API" below app.ui
node store "Database" right of app level with app
edge app.api -> store "queries" from: right to: left
```

Cada `node` declara un identificador y una etiqueta. Los modificadores de posición (`below`, `right of`, `level with`) referencian otros nodos ya definidos. Los `edge` conectan nodos y aceptan anotaciones de ruta (`from:`, `to:`) para controlar dónde sale y entra la flecha.

El proyecto está en la versión 0.8.0, licencia Apache-2.0 para el código (la marca y el logo quedan fuera, ver `NOTICE`). La sintaxis no es estable y puede cambiar entre versiones menores. También se distribuye como "skill" para agentes de código:

```bash
npx skills add reladraw/reladraw -g
npx skills add reladraw/reladraw -g -a claude-code
```

Eso permite a Cursor, Copilot, Codex o Claude Code generar diagramas reladraw directamente en el repositorio.

## Qué no se sabe

- Fecha exacta de publicación de la 0.8.0.
- Rendimiento del motor con diagramas de cientos de nodos.
- Sintaxis completa y hoja de ruta hacia una 1.0 estable.
- Soporte de formatos de salida distintos a SVG (PNG, PDF).
- Existencia de editor visual, extensiones para IDE o vista previa en vivo.
- Requisitos y compatibilidad exacta del ecosistema `npx skills`.
