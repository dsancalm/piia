---
title: "Nvidia releases two CUDA Rust toolchains at different maturity levels"
summary: "cuda-oxide compiles SIMT kernels to PTX via a custom nightly backend but requires a pinned toolchain and custom LLVM. cutile-rs runs on stable Rust 1.89+, uses a JIT for tile-based programming, and already powers HuggingFace's Grout and mistral.rs."
lang: en
story: nvidia-releases-two-cuda-rust-toolchains-at
publishedAt: 2026-09-17T11:57:43.287Z
sourceUrl: "https://developer.nvidia.com/blog/introducing-cuda-rust-two-tracks-for-writing-gpu-kernels/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [rust, cuda, nvidia, gpu]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Nvidia has published a first-party CUDA toolchain for Rust, split into two distinct tracks. The first, cuda-oxide, uses a custom rustc backend that lowers SIMT-style kernels directly to PTX via Pliron IR and LLVM. The second, cutile-rs, targets stable Rust 1.89+ with CUDA 13.3 and relies on a JIT compiler (CUDA Tile IR) to handle thread mapping and memory layout for tile-based programming. Both enforce memory safety at compile time, but they sit at very different maturity levels.

cuda-oxide is early alpha. It demands a pinned nightly toolchain (nightly-2026-04-03), a custom LLVM build, Linux, and a GPU of compute capability 8.0 or higher (Ampere or newer). You install the driver via cargo:

```bash
cargo +nightly-2026-04-03 install --git https://github.com/NVlabs/cuda-oxide.git cargo-oxide
```

A new project scaffold sets up the kernel crate and host crate. The kernel for a 1,024-element vector add looks like this:

```rust
use cuda_oxide::prelude::*;

#[kernel]
pub unsafe fn vecadd(
    a: DisjointSlice<f32>,
    b: DisjointSlice<f32>,
    c: DisjointSlice<f32>,
) {
    let idx = thread::index_1d();
    if let Some(c_mut) = c.get_mut(idx) {
        *c_mut = a[idx] + b[idx];
    }
}
```

`DisjointSlice<f32>` gives each thread exclusive access to a single element, sidestepping the usual shared `&mut [f32]` problem. `thread::index_1d()` returns an opaque index type, not a raw integer, and `c.get_mut` only accepts that type, returning `Option`. The launch contract is declared on the host side:

```rust
#[launch_contract(
    kernel = vecadd,
    indexing = LaunchConfig1D { block_size: 256 }
)]
fn launch_vecadd(a: &[f32], b: &[f32], c: &mut [f32]) -> CudaResult<()> { ... }
```

`prepare_vecadd` validates the `LaunchConfig1D` against the declaration and device limits. Running `cargo oxide run` compiles the kernel to PTX, launches four blocks of 256 threads, and verifies the result within a 1e-5 tolerance.

cutile-rs is further along. It publishes on crates.io, works on stable Rust, and already powers HuggingFace's Grout inference engine and mistral.rs. Instead of writing SIMT loops, you express computation over tiles; the JIT compiler decides how many physical GPU threads back each logical tile block. The API surface shown so far uses `#[c` (the source cuts off there), but the model is fundamentally different: one kernel invocation per tile block, with the compiler handling the lowering.

Nvidia says interoperability between CUDA Rust, CUDA C++, and CUDA Python is planned. No timeline has been given for cuda-oxide GA, for the interop layer, or for cutile-rs 1.0. Windows support for cuda-oxide is unmentioned. Comparative benchmarks against C++ CUDA do not exist publicly.

What is not known:
- When cuda-oxide will leave alpha or support stable Rust without a pinned nightly.
- Exact GA dates for multi-language interoperability.
- Performance numbers comparing either track to hand-tuned CUDA C++.
- Whether cuda-oxide will ever support Windows.
- The full cutile-rs API (the documentation cuts off mid-attribute).
