---
title: "Python 3.15 desaconseja re.match por inducir a error"
summary: "La función sigue disponible, pero la documentación y el release manager recomiendan re.prefixmatch, re.search o re.fullmatch según el caso. El nombre match sugería coincidencia completa y provocaba falsos positivos silenciosos."
lang: es
story: python-3-15-soft-deprecates-re-match
publishedAt: 2026-09-12T11:21:34.098Z
sourceUrl: "https://simonwillison.net/2026/Sep/11/soft-deprecating-re-match/"
sourceName: "Simon Willison"
priority: routine
tags: [python, regex, deprecation]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Python 3.15 marca `re.match()` como *soft-deprecated*. La función sigue ahí y no hay calendario para borrarla, pero la documentación y el *release manager* Hugo van Kemenade recomiendan no usarla en código nuevo. El motivo es simple: el nombre induce a error. `re.match()` ancla la expresión regular al principio de la cadena, pero no exige que llegue al final. Quien espera una coincidencia completa obtiene falsos positivos silenciosos.

La alternativa oficial es `re.prefixmatch()`, añadida en Python 3.11, que hace exactamente lo mismo pero con un nombre que describe su comportamiento. Para los otros dos casos habituales la librería ya ofrece funciones dedicadas:

```python
import re

# Coincide al principio (lo que hacía re.match)
re.prefixmatch(r"patrón", cadena)

# Coincide en cualquier posición
re.search(r"patrón", cadena)

# Coincide la cadena entera
re.fullmatch(r"patrón", cadena)
```

`re.fullmatch()` existe desde Python 3.4 y cubre la necesidad real de validar entradas completas. `re.search()` es la herramienta general para buscar. `re.match()` queda en medio sin una semántica clara, y esa ambigüedad es la que se quiere eliminar del vocabulario recomendado.

La *soft deprecation* no implica *warnings* en tiempo de ejecución por ahora; solo afecta a la documentación y a los linters que sigan las guías oficiales. No se conoce la fecha exacta de lanzamiento de Python 3.15 ni si habrá una *hard deprecation* posterior con avisos visibles o eliminación.

## Lo que no se sabe

- Si `re.match()` empezará a emitir `DeprecationWarning` al ejecutarse o la advertencia se queda en la documentación.
- Qué versión introdujo `re.prefixmatch()` (está en 3.11, pero no se confirma si fue la primera).
- Calendario concreto de Python 3.15.
- Planes futuros para *hard-deprecate* o borrar `re.match()`.
