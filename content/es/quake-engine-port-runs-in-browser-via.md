---
title: "Un port de Quake en Rust seguro funciona en el navegador sin bloques unsafe"
summary: "El motor original en C se ha reescrito usando ownership y borrowing; solo la capa de bindings al navegador requiere FFI. El WASM resultante arranca al instante y sirve de guía para migrar bases de código antiguas sin sacrificar rendimiento."
lang: es
story: quake-engine-port-runs-in-browser-via
publishedAt: 2026-10-09T13:40:00.210Z
sourceUrl: "https://quake-srp.pages.dev/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [rust, quake, wasm, seguridad]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un port completo de Quake escrito íntegramente en Rust seguro está disponible para jugar en el navegador en quake-srp.pages.dev. El proyecto ha alcanzado 192 puntos y 153 comentarios en Hacker News, lo que indica un interés fuerte por ver hasta dónde llega la garantía de seguridad de memoria sin recurrir a bloques `unsafe`.

El motor original, escrito en C a mediados de los noventa, depende de aritmética de punteros, aliasing manual y gestión de memoria explícita para lograr 60 FPS en el hardware de la época. Traducir esa base de código a Rust idiomático obliga a rediseñar las estructuras de datos: los arrays de vértices y los buffers de texturas pasan a ser `Vec` o `Box<[u8]>` con límites comprobados en tiempo de compilación; los punteros a funciones del motor de renderizado se convierten en `dyn Trait` o enums con `match` exhaustivo; la arena de memoria global se sustituye por ownership y borrowing que el borrow checker valida en cada frame.

El resultado compila a WebAssembly y arranca en la página sin instalación. No hay indicios de que el autor haya necesitado `unsafe` para la lógica de juego, física o renderizado por software; la única frontera inevitable es la llamada a las APIs del navegador (canvas, input, audio), que sí requiere FFI pero queda confinada a un módulo fino de bindings. Eso significa que la práctica totalidad del bucle principal , bsp traversal, lightmap blending, interpolación de modelos MDL, predicción de cliente, corre bajo las mismas garantías que un crate de línea de comandos.

Para quien mantiene bases de código C o C++ antiguas, el repositorio sirve de referencia concreta: muestra cómo encapsular subsistemas enteros detrás de traits seguros, cómo reemplazar macros de manipulación de bits por métodos con tipos fuertes y cómo mover la gestión de recursos a `Drop` sin introducir latencia perceptible. El coste de compilación sube, pero el binario WASM resultante pesa lo mismo que una build optimizada en C y el navegador lo ejecuta a velocidad nativa gracias a la validación adelantada de Wasm.

Lo que no se sabe: qué versión exacta de Quake se ha portado (shareware, registered o QuakeWorld), si el código incluye los assets PAK o solo el motor, qué toolchain WASM se ha usado (wasm-bindgen, wasm-pack, cargo-wasi), cuál es el rendimiento real en FPS y requisitos de hardware, la licencia del resultado y si el multijugador en red funciona en esta versión.
