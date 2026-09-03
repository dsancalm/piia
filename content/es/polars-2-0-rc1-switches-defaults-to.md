---
title: "Polars 2.0 RC1 llega con streaming por defecto y API más estricta"
summary: "La versión candidata cambia el motor de LazyFrame.collect() a streaming, cinco veces más rápido en agregados. El orden de filas ya no está garantizado en joins y group_by salvo que se pida maintain_order."
lang: es
story: polars-2-0-rc1-switches-defaults-to
publishedAt: 2026-09-03T11:38:27.710Z
sourceUrl: "https://pola.rs/posts/announcing-polars-2/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [polars, dataframe, streaming, python]
generatedBy: dots-studio/dots-3-note-preview:free
---
Polars 2.0 RC1 salió el 2 de septiembre de 2026. La versión final llegará en las próximas semanas. El salto de versión mayor no añade grandes funcionalidades: elimina decisiones de diseño antiguas y cambia los valores por defecto.

El cambio más visible es que `LazyFrame.collect()` usa ahora el motor de streaming por defecto (`engine="auto"` resuelve a streaming). Según los mantenedores, el motor streaming es unas cinco veces más rápido en agregado y consume menos memoria.

El streaming no garantiza el orden de las filas en operaciones como `join`, `group_by` o `unpivot`. Si el orden importa, hay que optar explícitamente con `maintain_order=True` (o `"left"` en el join). El ejemplo de la documentación lo ilustra:

```python
lf = pl.LazyFrame({"k": [2, 1, 0], "v": ["a", "b", "c"]})
other = pl.LazyFrame({"k": [0, 1, 2], "r": ["x", "y", "z"]})

# 2.0: engine="auto" now resolves to the streaming engine.
# Row order is no longer guaranteed for joins, group_by, unpivot, ...
(lf.join(other, on="k", how="left").collect())
# ┌─────┬─────┬─────┐
# │ k ┆ v ┆ r │ <- order may not match `lf`'s original row order
# └─────┴─────┴─────┘

# Opt in to observable order for this query:
(lf.join(other, on="k", how="left", maintain_order="left").collect())
```

Si prefieres conservar el motor en memoria como comportamiento global, basta una línea al arrancar el proceso:

```python
pl.Config.set_engine_affinity("in-memory")
```

También se puede forzar por consulta con `collect(engine="in-memory")`.

## Endurecimiento de la API

Polars 2.0 adopta una postura "fail fast". Los desajustes de tipos que antes se resolvían en silencio ahora lanzan excepción.

* `is_in` exige coerción sin pérdida. Un `Int64` dentro de una `List(Float64)` lanza `InvalidOperationError`. El caso típico: identificadores de 64 bits exportados a JSON (donde se convierten a `float`) y comparados luego con enteros. `9007199254740992.0` (float) y `9007199254740993` (Int64) son valores distintos, y Polars ya no lo oculta.

```python
flagged_ids = pl.Series([9007199254740992.0])
user_id = pl.Series([9007199254740993])
user_id.is_in(flagged_ids)
# InvalidOperationError: 'is_in' cannot check for Int64 values in List(Float64) data.
```

* `pl.concat` en modo horizontal (`how="horizontal"`) valida que los DataFrames tengan la misma altura. Si no, lanza `ShapeError`. Para rellenar con nulos hay que pedirlo explícitamente con `how="horizontal_extend"`.

```python
transactions = pl.DataFrame({"day": [1, 2, 3, 4, 5], "count": [120, 98, 143, 87, 156]})
fraud_flags = pl.DataFrame({"flagged": [2, 0, 5, 1]})  # solo 4 filas
pl.concat([transactions, fraud_flags], how="horizontal")  # ShapeError
```

* Desaparecen casts implícitos: entero a `Enum`, cadena a `Date`/`Datetime`. Ahora se usan `.cat.to(dtype)` / `.cat.physical()` y `.str.to_date()` / `.str.to_datetime()`.

* `melt` se elimina; se usa `unpivot` con `index`/`on` en lugar de `id_vars`/`value_vars`.

* `join_nulls` pasa a llamarse `nulls_equal`.

* Excepciones tipadas nuevas: `AttributeRemovedError` y `ArgumentRemovedError` incluyen pistas de migración.

* `collect_schema()` resuelve tipos y detecta incompatibilidades de esquema sin materializar datos.

## Instalación y hoja de ruta

```bash
pip install polars==2.0rc1
```

Queda por delante: streaming out-of-core, rediseño del sistema de plugins de I/O, lector S3 más rápido, cobertura SQL, planificador basado en coste, reordenación de joins y eliminación de `mmap` para pipelines totalmente asíncronos.

## Lo que no se sabe

* Fecha exacta de la versión final 2.0.
* Lista completa de comprobaciones de strictness más allá de las documentadas.
* Benchmarks independientes que validen el "5x" en cargas reales.
* Calendario concreto para out-of-core, nuevos plugins, lector S3, planificador, reordenación de joins y retirada de mmap.
* Si se ha retenido alguna funcionalidad obsoleta por presión de usuarios.
* Detalles de compatibilidad de `maintain_order`: si `"left"` y `True` son equivalentes o tienen matices.
