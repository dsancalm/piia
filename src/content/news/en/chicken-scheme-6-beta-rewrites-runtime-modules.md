---
title: "Chicken Scheme 6 beta rewrites runtime, modules, and error reporting"
summary: "The upcoming major release targets faster execution and lower memory use with a new garbage collector and bignum library, plus a cleaner module system and unified compiler-interpreter frontend. Still in beta, with no release date set."
lang: en
story: chicken-scheme-6-beta-rewrites-runtime-modules
publishedAt: 2026-08-11T07:49:26.210Z
sourceUrl: "https://code.call-cc.org/releases/6.0.0/NEWS"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [scheme, compiler, release]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Chicken Scheme 6 is the upcoming major release of the Chicken Scheme compiler and interpreter. It focuses on improving performance, reducing memory usage, and modernizing the codebase. The development is led by the Chicken core team, with contributions from the community.

The new version introduces a rewritten runtime system that uses a more efficient garbage collector and a faster bignum library. These changes aim to make Chicken Scheme 6 faster and more scalable for larger applications. The compiler also gains better optimization passes, including improved inlining and closure analysis.

A notable shift is the move to a new module system. Chicken Scheme 6 adopts a more explicit and predictable module syntax, which simplifies dependency management and reduces namespace pollution. The previous "eggs" system for libraries is retained, but the packaging format is updated to align with the new module structure.

The interpreter and compiler now share a more unified frontend, which reduces code duplication and makes the behavior of the two tools more consistent. Error messages are also improved, with clearer source locations and more actionable hints.

Portability is another focus. Chicken Scheme 6 targets a broader range of platforms, including modern macOS and Windows versions, and improves support for ARM-based systems. The build process is simplified, and the documentation is rewritten to reflect the new features and changes.

The project is still in development. The current release is a beta, and the final version is expected after the remaining issues are resolved. The exact release date is not announced.
