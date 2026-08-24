---
title: "VectorWare ejecuta SIMD portable de Rust en GPU"
summary: "VectorWare ha mapeado el SIMD portable de Rust (core::simd) a GPU, convirtiendo hilos en warps y lanes en elementos SIMD. Así, el código portable compila a instrucciones de warp en GPU, sin cambios."
lang: es
story: rust-portable-simd-now-compiles-to-gpu
publishedAt: 2026-08-11T07:50:42.621Z
sourceUrl: "https://www.vectorware.com/blog/simd-on-gpu/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [rust, simd, gpu]
generatedBy: deepseek/deepseek-v4-flash-0731
---
VectorWare ha logrado que el código Rust de SIMD portable (`core::simd`) se ejecute directamente en la GPU. El mapeo es directo: un `std::thread` se convierte en un warp, y los 32 lanes de ese warp corresponden a los elementos de un vector SIMD. Así, `Simd<i16, 32>` asigna un `i16` a cada lane, y sumar dos vectores compila a una sola instrucción de warp, `add.s16`.

El trabajo previo de VectorWare ya había mapeado hilos a warps. Ahora han aplicado el mismo concepto a las operaciones SIMD. El código portable SIMD se compila sin cambios para x86-64, Arm o GPU. Las reducciones SIMD usan instrucciones de warp shuffle, los shuffles entre lanes mapean a primitivas de warp shuffle, y los masks usan instrucciones de voto y ballot de la GPU.

El IR de VectorWare se codifica en el sistema de tipos de Rust, con tipos, genéricos y const genéricos. No necesita intérprete en la GPU: cada operación baja directamente a instrucciones. Para validar el comportamiento, construyeron un intérprete de referencia que simula el código GPU y permite pruebas diferenciales.

El ejemplo que muestran es una suma de vectores:

```rust
let a = Simd::<i16, 32>::splat(1);
let b = Simd::<i16, 32>::splat(2);
let c = a + b;
```

Ese código compila a una instrucción de warp en GPU y a las instrucciones SIMD equivalentes en CPU. También mencionan `Simd<f32, 32>` para operaciones de punto flotante y `simd_swizzle!` para reorganizar lanes.

El trabajo actual apunta a NVIDIA, aunque no es específico de CUDA. Los warps de NVIDIA tienen 32 lanes; los de AMD, 32 o 64. En CPU, `Simd<T, N>` admite cualquier N de 1 a 64, así que el mismo código funciona en ambos.

## Lo que no se sabe

No se especifica qué versiones de hardware NVIDIA son compatibles, ni se detalla el rendimiento comparativo entre CPU y GPU para el código mostrado. Tampoco se indica si el soporte portable SIMD en GPU está disponible públicamente o solo internamente, ni se menciona el costo de compilación o el tiempo de desarrollo del IR.
