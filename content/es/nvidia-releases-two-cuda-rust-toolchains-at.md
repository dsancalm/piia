---
title: "NVIDIA publica dos vías para programar GPUs en Rust nativo sin C++"
summary: "La primera, cuda-oxide, compila kernels SIMT a PTX con un backend nightly propio y contratos de lanzamiento que validan la configuración en tiempo de compilación."
lang: es
story: nvidia-releases-two-cuda-rust-toolchains-at
publishedAt: 2026-09-17T11:57:43.286Z
sourceUrl: "https://developer.nvidia.com/blog/introducing-cuda-rust-two-tracks-for-writing-gpu-kernels/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [nvidia, rust, cuda, gpu]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
NVIDIA ha publicado oficialmente dos vías para programar GPUs en Rust nativo sin pasar por C++. La primera, **cuda-oxide** (track SIMT), compila kernels escritos en Rust directamente a PTX mediante un backend personalizado de `rustc` que usa Pliron IR y LLVM. La segunda, **cutile-rs** (track Tile), funciona sobre Rust estable 1.89+ y CUDA 13.3: el programador describe operaciones sobre *tiles* y el compilador JIT decide el mapeo de hilos y el *layout* de memoria mediante CUDA Tile IR.

Ambos enfoques garantizan seguridad de memoria en tiempo de compilación. En cuda-oxide se logra con `DisjointSlice`, que da a cada hilo acceso exclusivo a su elemento, y con *launch contracts* que validan la configuración de lanzamiento frente a los límites del dispositivo. En cutile-rs la garantía viene de la partición de tensores y el modelo de *ownership* de Rust.

## cuda-oxide: kernel SIMT con toolchain nightly fijada

El track SIMT exige Linux, GPU de *compute capability* 8.0 o superior, CUDA toolkit 12.x y un `clang` con cabeceras `libclang`. La toolchain de Rust está fijada a `nightly-2026-04-03` e incluye un LLVM personalizado. El punto de entrada es el subcomando `cargo-oxide`:

```bash
cargo +nightly-2026-04-03 install --git https://github.com/NVlabs/cuda-oxide.git cargo-oxide
cargo oxide new vecadd_demo
cd vecadd_demo
cargo oxide doctor
cargo oxide run
```

El kernel de ejemplo suma 1.024 *floats* elemento a elemento usando 4 bloques de 256 hilos. La salida esperada termina con:

```
PASSED: all 1024 elements correct
```

El código del kernel ilustra los contratos de lanzamiento y el uso de `DisjointSlice`:

```rust
use cuda_oxide::prelude::*;

#[launch_contract(blocks(4), threads(256))]
fn vecadd(a: DisjointSlice<f32>, b: DisjointSlice<f32>, c: DisjointSlice<f32>) {
    let idx = thread::index_1d();
    if let Some(dst) = c.get_mut(idx) {
        *dst = a[idx] + b[idx];
    }
}
```

`thread::index_1d()` devuelve un tipo índice opaco, no un entero crudo, y `c.get_mut(idx)` solo acepta ese tipo, devolviendo `Option`. El atributo `#[launch_contract]` declara indexación 1D con bloques de 256 hilos; `prepare_vecadd` valida `LaunchConfig1D` contra la declaración y los límites del *device*.

## cutile-rs: programación por *tiles* en Rust estable

cutile-rs ya está publicado en `crates.io` y se usa en motores de inferencia como Grout (HuggingFace) y `mistral.rs`. No requiere LLVM personalizado ni toolchain nightly. Cada *tile block* ejecuta el kernel una vez como hilo lógico sobre un sub-tensor; el compilador decide cuántos hilos GPU reales lo respaldan. El texto disponible se corta antes de mostrar la API completa (`#[c...`).

## Qué no se sabe

- Fecha de disponibilidad general (GA) de cuda-oxide fuera de *alpha*.
- Rendimiento comparativo frente a CUDA C++, CUDA Python y entre los dos tracks Rust en *benchmarks* reales.
- Calendario de la interoperabilidad multi-lenguaje prometida.
- Qué modelos de GPU concretos cubren *compute capability* 8.0+.
- Soporte de Windows en cuda-oxide (solo se menciona Linux).
- Cuándo cutile-rs alcanzará versión 1.0.
- Si cuda-oxide acabará soportando Rust estable sin toolchain nightly fijada.
