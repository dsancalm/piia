---
title: "Rust borrow checker bug lets short-lived references escape as 'static"
summary: "A critical soundness hole tracked as #164250 allows covariant field assignment inside Drop implementations to bypass lifetime checks. Short-lived stack references can be stored in fields requiring 'static bounds, then moved into global containers, causing use-after-free..."
lang: en
story: rust-borrow-checker-bug-lets-short-lived
publishedAt: 2026-10-13T14:28:54.945Z
sourceUrl: "https://github.com/rust-lang/rust/issues/164250"
sourceName: "Hacker News (portada)"
priority: flash
tags: [rust, soundness, borrow-checker, lifetimes]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
An unsoundness bug in Rust's borrow checker allows lifetime requirements on struct fields to be bypassed through covariant field assignment. The issue is tracked as #164250, opened on October 13, 2026. It is classified as P-critical and tagged I-unsound, the most severe category for soundness holes. It affects stable releases from at least 1.85.0, though the vulnerable code pattern has compiled successfully since version 1.18.0 in 2017.

The core failure occurs in the interaction between the borrow checker, destructors, and variance. When a struct implements `Drop`, the compiler is supposed to enforce that any borrowed data held by the struct lives long enough to satisfy the `'static` bounds declared on the type parameters. However, the checker incorrectly handles covariant field assignments inside the `Drop` implementation. This allows a reference with a short lifetime, such as a stack variable, to be assigned to a field typed as `'static`, effectively extending its lifetime without verification. When the destructor runs, it treats that short-lived reference as valid `'static` data, leading to use-after-free or use-after-scope violations.

Multiple proof-of-concept exploits demonstrate the impact. One example stores a reference to a local `String` inside a `Q<T>` struct where `T: 'static + Send`. The assignment `q.0 = Some(&l)` compiles despite `l` dropping at the end of the inner block. The `Drop` impl then moves the reference into a global `Mutex<Vec<Box<dyn Any + Send>>>`. Later, the program downcasts the stored value to `&'static String` and prints it. With AddressSanitizer enabled, this triggers a `stack-use-after-scope` error.

```rust
use std::sync::Mutex;
static KEPT: Mutex<Vec<Box<dyn std::any::Any + Send>>> = Mutex::new(Vec::new());
struct Q<T: 'static + Send>(Option<T>);
impl<T: 'static + Send> Drop for Q<T> {
    fn drop(&mut self) {
        if let Some(t) = self.0.take() {
            KEPT.lock().unwrap().push(Box::new(t));
        }
    }
}
fn main() {
    {
        let l = String::from("hello world, this is long enough");
        let mut q = Q(None);
        q.0 = Some(&l);
    }
    let _z = String::from("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    let k = KEPT.lock().unwrap();
    println!("{}", k[0].downcast_ref::<&'static String>().unwrap());
}
```

A second variant uses a generic closure to leak a reference to a local `Vec<Vec<i32>>` into an `Option<&'static _>` variable, again compiling on stable. A third demonstrates a more complex lifetime manipulation using multiple lifetime parameters and a `Drop` impl that overwrites a mutable reference, printing a dangling pointer.

The T-types team is actively reviewing the issue. The fix will likely require changes to dropck (destructor checking) and how variance is validated during field assignment in the presence of `Drop`. Because the bug exists in the type system logic rather than a specific library, the scope of affected code across crates.io and the standard library is unknown.

## What is not known

- Whether a temporary workaround or mitigation exists for production code.
- When a fix will land in nightly or stable channels.
- The exact extent of vulnerable code in the ecosystem.
- If CVEs have been assigned or are planned.
- Precise compiler-internal root cause details (unification, variance, dropck interaction).
