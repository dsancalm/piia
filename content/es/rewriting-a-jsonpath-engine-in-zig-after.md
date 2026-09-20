---
title: "Reescribir jsonpath-rust en Zig obliga a cambiar de mentalidad"
summary: "El autor narra cómo la falta de traits, pattern matching y macros en Zig transforma un diseño idiomático de Rust en código plano con dispatch manual, bucles while y switch sobre typeInfo, y cómo el tooling limitado le empujó a un flujo de trabajo puramente terminal."
lang: es
story: rewriting-a-jsonpath-engine-in-zig-after
publishedAt: 2026-09-20T11:48:01.965Z
sourceUrl: "https://besok.github.io/posts/what-zig-felt-like-coming-from-rust/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [zig, rust, jsonpath, refactor]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Siete años escribiendo Rust te dejan una forma de pensar: iteradores perezosos, *pattern matching* exhaustivo, *traits* que resuelven el *dispatch* en compilación y macros que generan código. Al reimplementar jsonpath-rust (RFC 9535) en Zig, el primer choque no es la sintaxis, sino la ausencia de esas abstracciones. Zig no tiene *traits*; el *dispatch* dinámico se simula con `@hasDecl` comprobando que el tipo concreto expone un método `query`. El código resultante parece C con genéricos: mutación *in-place*, bucles `while` explícitos y *switch* sobre `@typeInfo` en lugar de *pattern matching* sobre *enums* algebraicos.

La estructura del proyecto lo refleja. Rust reparte la lógica en carpetas anidadas (`parser/grammar`, `query/segment`, `query/selector`…). Zig lo aplana a cinco archivos en `src/`: `root.zig`, `parser.zig`, `model.zig`, `model_query.zig`, `query.zig`. Las pruebas viven *inline* en cada módulo y se invocan desde `build.zig` con banderas propias:

```sh
zig build test                       # run all tests
zig build test -Dfilter="filter match function basic"  # run one test
zig build test -Ddebug-query=true    # all tests with debug
zig build compliance                 # compliance suite
zig build check                      # unit tests + compliance
```

El *tooling* es el talón de Aquiles. El soporte de IDE se reduce a resaltado y autocompletado básico; no hay *go-to-definition* fiable ni *refactor* automático. El autor terminó migrando a Helix + Alacritty + Zellij, aceptando un flujo de trabajo centrado en terminal y *CLI* puro. Compila rápido, el ejecutable es pequeño y el *build* es declarativo, pero pierdes la red de seguridad que da `rust-analyzer` en proyectos grandes.

Lo que no se sabe: la versión exacta de Zig usada, si la *compliance suite* del RFC 9535 pasa al completo, métricas de rendimiento comparadas ni líneas de código totales. Tampoco se ha publicado el `build.zig` completo para ver cómo se cablean las pruebas *inline*.
