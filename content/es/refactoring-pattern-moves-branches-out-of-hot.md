---
title: "La regla 'push ifs up and fors down' unifica diseño de bases de datos, TigerBeetle y"
summary: "El principio sitúa los condicionales al inicio de la llamada y los bucles al final para eliminar ramas en código crítico. TigerBeetle lo aplica centralizando decisiones en la función principal y delegando ejecución sin ramas a funciones por lotes."
lang: es
story: refactoring-pattern-moves-branches-out-of-hot
publishedAt: 2026-10-08T14:00:55.278Z
sourceUrl: "https://debasishg.github.io/blog/push-ifs-up-fors-down/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [rendimiento, diseño, bases-de-datos, categorias]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El refrán "push ifs up and fors down" resume una regla de diseño que aparece en motores de bases de datos, sistemas de alto rendimiento como TigerBeetle y la teoría de categorías: los condicionales deben vivir lo más arriba posible en la pila de llamadas y los bucles, lo más abajo.

TigerBeetle lo formula como centralización del flujo de control. La función principal decide; las auxiliares ejecutan sin ramificaciones. Matklad lo ilustra con un cambio de firma: en lugar de `frobnicate(walrus: Option<Walrus>)`, que obliga a la función a comprobar `None` en cada llamada, se usa `frobnicate(walrus: Walrus)` y se delega el manejo de la ausencia al *caller*. El bucle que antes llamaba a `frobnicate` dentro de una iteración pasa a llamar a `frobnicate_batch(walruses: &[Walrus])`, que procesa el lote entero en un bucle interno sin ramas.

```rust
let maybe_walruses: Vec<Option<Walrus>> = ...;
let walruses: Vec<Walrus> = maybe_walruses.into_iter().filter_map(|w| w).collect();
frobnicate_batch(&walruses); // never sees a None
```

En álgebra de consultas, la ley `filter p . map f == map f . filter (p . f)` justifica filtrar antes de mapear cuando el predicado compuesto `p . f` se reduce a una condición barata `q` sobre la entrada original. Así se evita invocar `f` en elementos que se descartarán. En el plan de ejecución, las proyecciones y selecciones bajan (se ejecutan primero) y los joins suben (se ejecutan después), lo que equivale a empujar los `if` hacia la raíz del árbol y los `for` hacia las hojas.

La teoría de categorías da la lectura estructural: un `if` interno sobre `Option<Walrus>` (coproducto `1 + Walrus`) se elimina restringiendo la entrada al subobjeto `Walrus` mediante un monomorfismo. La ramificación desaparece porque el tipo ya no la admite.

El principio tiene límites duros. Una condición que depende del elemento iterado no puede salir del bucle salvo que se eleve al tipo de dato. Un predicado de join solo puede adelantarse si referencia columnas de una sola tabla. Y mover la lógica al *caller* cambia la superficie de la API: quien llama asume la responsabilidad de validar y agrupar.

Lo que no se sabe
- El texto no especifica el rendimiento absoluto ni métricas de tiempo o memoria al aplicar el idiom.
- No se detalla en qué versiones del lenguaje o compiladores se puede aplicar la vectorización automática.
- No se explica cómo determinar cuándo un predicado es "loop-invariant" en contextos reales.
- No se analiza el costo de mover lógica al caller en términos de acoplamiento o mantenibilidad a largo plazo.
- No se proporcionan ejemplos de teoría de categorías más allá de conjuntos y monomorfismos, dejando incierto cómo se extiende a otras categorías.
