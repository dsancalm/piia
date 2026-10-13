---
title: "Bug crítico en el borrow checker de Rust permite evadir lifetimes 'static"
summary: "Un fallo de insoundness en el compilador deja escapar referencias de vida corta como si fueran 'static al asignar campos covariantes dentro de un destructor. Afecta a todas las versiones estables desde la 1.85.0 y el código vulnerable compila sin errores desde 2017."
lang: es
story: rust-borrow-checker-bug-lets-short-lived
publishedAt: 2026-10-13T14:28:54.944Z
sourceUrl: "https://github.com/rust-lang/rust/issues/164250"
sourceName: "Hacker News (portada)"
priority: flash
tags: [rust, compilador, seguridad, bug]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Se ha descubierto un bug de insoundness en el borrow checker de Rust que permite evadir los requisitos de lifetime `'static` mediante asignación de campos covariantes dentro de un `impl Drop`. El problema afecta a todas las versiones estables desde al menos la 1.85.0 y el código vulnerable compila sin errores desde la 1.18.0, publicada en 2017. El issue [#164250](https://github.com/rust-lang/rust/issues/164250), abierto el 13 de octubre de 2026, ha sido clasificado como `P-critical` y `I-unsound`, la categoría más grave para el compilador.

El fallo permite que un destructor acceda a una referencia con lifetime corto tratándola como `'static`. En el ejemplo principal, una struct `Q<T: 'static>` contiene un `Option<T>`. Al asignar `q.0 = Some(&l)` donde `l` es un `String` local, el borrow checker acepta la asignación porque el campo es covariante. Cuando `q` sale de ámbito, su `Drop` se ejecuta y mueve la referencia `&l` a un contenedor global `KEPT` que exige `'static`. El resultado es una referencia colgante que AddressSanitizer detecta como `stack-use-after-scope`.

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

Otros dos ejemplos demuestran variantes del mismo patrón: uno sobrescribe una variable externa `me_out` con una referencia a un string local, y otro captura una referencia a un `Vec` local en un closure almacenado globalmente. En todos los casos, la asignación de campo covariante dentro del ámbito del destructor permite que la referencia escape a su lifetime real.

El equipo de tipos (T-types) está revisando el issue, que toca el borrow checker, destructores, lifetimes y varianza. No hay workaround conocido, ni fecha para el fix en stable o nightly, ni CVEs asignados. Tampoco se conoce el alcance exacto de crates afectados en el ecosistema. La causa raíz precisa en la lógica de unificación o dropck del compilador sigue sin detallarse públicamente.
