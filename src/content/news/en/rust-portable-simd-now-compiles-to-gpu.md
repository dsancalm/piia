---
title: "Rust portable SIMD now compiles to GPU warps"
summary: "VectorWare maps core::simd to NVIDIA warp lanes, so Simd<i16, 32> becomes a single add.s16 instruction. The same code runs on CPU or GPU without changes, and a reference interpreter lets you test GPU behavior without hardware."
lang: en
story: rust-portable-simd-now-compiles-to-gpu
publishedAt: 2026-08-11T07:50:42.622Z
sourceUrl: "https://www.vectorware.com/blog/simd-on-gpu/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [rust, simd, gpu, vectorware]
generatedBy: deepseek/deepseek-v4-flash-0731
---
VectorWare, la compañía que ya había mapeado `std::thread` a warps de GPU, ahora anuncia que el SIMD portable de Rust (`core::simd`) también funciona en la GPU. La idea central: un warp de NVIDIA ejecuta una instrucción en 32 lanes, igual que un vector SIMD en CPU. Así, `Simd<i16, 32>` asigna un elemento `i16` a cada lane del warp, y sumar dos de esos vectores compila a una sola instrucción `add.s16`.

El mismo código portable SIMD compila sin cambios para x86-64, Arm o GPU. Para un programador de Rust, esto unifica el desarrollo de alto rendimiento: lo que escribes para CPU con `#![feature(portable_simd)]` puede correr en GPU sin reescribirlo.

## Cómo baja a hardware

El IR de VectorWare se codifica en el sistema de tipos de Rust: tipos, genéricos y const genéricos. No hay intérprete en GPU; cada operación baja directamente a instrucciones. Las reducciones SIMD usan warp shuffle, los shuffles entre lanes mapean a primitivas de warp shuffle, y los masks SIMD usan instrucciones de voto y ballot de GPU.

```rust
let a = Simd::<i16, 32>::splat(1);
let b = Simd::<i16, 32>::splat(2);
let c = a + b; // compila a add.s16 en GPU
```

En CPU, `Simd<T, N>` admite `N` de 1 a 64. En GPU, el ancho depende del hardware: 32 lanes en NVIDIA, 32 o 64 en AMD. El trabajo actual apunta a NVIDIA pero no es específico de CUDA.

## Pruebas sin GPU

VectorWare construyó un intérprete de referencia para simular código GPU y hacer pruebas diferenciales. Puedes verificar que tu código SIMD se comporta igual en CPU y en GPU antes de tocar hardware real.

También hay macros como `simd_swizzle!` que funcionan en ambos entornos:

```rust
let v = Simd::<f32, 32>::splat(1.0);
let w = simd_swizzle!(v, [0, 0, 0, 0, ...]); // reordena lanes
```

## Lo que no se sabe

No se especifica qué versiones de hardware NVIDIA son compatibles. No hay datos de rendimiento comparativo entre CPU y GPU para el código mostrado. No se indica si el soporte portable SIMD en GPU está disponible públicamente o solo internamente, ni se menciona el costo de compilación o el tiempo de desarrollo del IR.
