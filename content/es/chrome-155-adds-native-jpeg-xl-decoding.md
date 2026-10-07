---
title: "Chrome 155 decodifica JPEG XL de forma nativa y segura"
summary: "El navegador incluye un decodificador escrito en Rust que mejora la seguridad y la interoperabilidad. Permite servir un solo formato con mejor compresión, HDR y transcodificación sin pérdidas desde JPEG, reduciendo la complejidad en servidores."
lang: es
story: chrome-155-adds-native-jpeg-xl-decoding
publishedAt: 2026-10-07T13:49:51.873Z
sourceUrl: "https://developer.chrome.com/blog/jpeg-xl-in-chrome"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [chrome, jpegxl, rust, interop]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Chrome 155 incluye ya un decodificador nativo para JPEG XL (.jxl). El formato llega al canal estable tras años de peticiones en el proyecto Interop, donde fue la propuesta más votada en 2026 y en ejercicios anteriores. Para quien construye pipelines de imágenes en la web, la consecuencia directa es poder servir un solo formato que cubre compresión con pérdidas un 30-50% mejor que JPEG, compresión sin pérdidas real, HDR integrado y transcodificación sin pérdidas desde JPEG heredado. Eso reduce bytes transferidos y elimina la lógica de negociación entre WebP, AVIF y JPEG que hoy complica los servidores de imágenes.

## El decodificador está escrito en Rust puro

El equipo de Chrome reimplementó el decodificador desde cero como `jxl-rs` en lugar de integrar la referencia en C++ (`libjxl`). La motivación principal es eliminar la superficie de ataque de memoria insegura en el proceso de renderizado. El código usa la característica estabilizada `target_feature_11` de Rust para generar instrucciones SIMD sin bloques `unsafe`.

```rust
#[target_feature(enable = "avx2")]
unsafe fn decode_avx2() { /* ... */ }
```

Esa característica permite al compilador emitir AVX2, NEON o WASM SIMD según la arquitectura de destino manteniendo las garantías de seguridad del lenguaje. Sobre esa base se construyó `jxl_simd`, una capa de abstracción portable inspirada en la librería C++ Highway que unifica las intrínsecas de cada plataforma.

## Validación y pruebas de interoperabilidad

El rendimiento de `jxl-rs` se publica en un dashboard público y el código ha pasado fuzzing extensivo y una revisión asistida por IA que no encontró vulnerabilidades de seguridad de memoria. Paralelamente, Chrome participó en la *Interop 2026 JPEG XL Investigation* para asegurar que la suite de tests de la plataforma web cubra el formato y que el comportamiento sea consistente entre motores.

## Lo que no se sabe

- Fecha exacta de promoción de Chrome 155 a estable.
- Porcentaje de dispositivos que tendrán la versión en el momento del lanzamiento.
- Métricas comparativas de velocidad de decodificación, CPU y RAM frente a `libjxl` C++ o decodificadores AVIF en hardware representativo.
- Si Chrome expondrá API de codificación (encoding) además de decodificación.
- Estado de implementación en Firefox, Safari y Edge.
- Detalles de la "revisión por IA": herramienta usada, alcance y hallazgos no relacionados con memoria.
