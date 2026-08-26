---
title: "EVE Online inicia la migración de Stackless Python 2.7 a Python 3"
summary: "El MMO lleva 21 años sobre un intérprete sin soporte desde 2020. La herramienta futurize automatiza la sintaxis, pero 20.000 puntos exigen revisión manual por cambios semánticos."
lang: es
story: eve-online-begins-python-3-migration-after
publishedAt: 2026-08-26T07:27:22.392Z
sourceUrl: "https://simonwillison.net/2026/Aug/25/eve-online-move-to-python-3/"
sourceName: "Simon Willison"
priority: urgent
tags: [eveonline, python, stackless, migracion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
CCP Games ha anunciado que EVE Online comienza su migración de Stackless Python 2.7 a Python 3. El juego ha funcionado sobre esa runtime desde su lanzamiento en 2003, y la última actualización mayor del intérprete fue en 2010. Son 2,4 millones de líneas de código que han convivido con una versión muerta desde 2020.

El plan arranca con `futurize`, la herramienta automatizada que reescribe sintaxis y patrones incompatibles. Sobre el papel resuelve la mayor parte del trabajo mecánico: `print` statements, `xrange`, imports relativos, el módulo `six` y demás residuos de la era 2/3. Pero el anuncio admite que quedan unos 20.000 puntos donde el comportamiento semántico diverge: división de enteros, ordenación de tipos heterogéneos, manejo de bytes frente a strings, iteradores que antes devolvían listas y ahora devuelven vistas. Esos 20.000 sitios exigen revisión manual, pruebas y criterio humano.

```bash
futurize --stage1 --stage2 --write .
```

El comunicado no dice cómo piensan sustituir Stackless. Ese es el elefante en la sala. Stackless no es solo un intérprete distinto: provee microhilos (tasklets) y canales que el servidor usa para manejar decenas de miles de conexiones concurrentes sin bloquear el GIL. Desacoplar esa primitiva de concurrencia sin tirar abajo el clúster único de Tranquility es el verdadero reto técnico.

En la Fanfest del año pasado mostraron "Scheduling in Carbon: Leaving Stackless Python Behind". Allí explicaron cómo el motor Carbon de EVE Frontier , su nuevo proyecto, reemplaza Stackless por su propio scheduler open source, `carbonengine/scheduler`. Ese código está publicado y se puede inspeccionar, pero CCP no ha confirmado si reutilizarán esa pieza en EVE Online o seguirán otra vía.

Tampoco hay fechas. Ni versión objetivo de Python 3 (3.10, 3.11, 3.12). Ni estimación de impacto en latencia, uso de memoria o arquitectura de despliegue durante la transición. El anuncio es una declaración de intenciones, no un plan de proyecto.

## Lo que no se sabe

- Cómo reemplazarán Stackless en el motor principal de EVE Online (el anuncio no lo dice).
- Cronograma estimado para completar la migración.
- Si usarán `carbonengine/scheduler` de EVE Frontier o una solución distinta.
- Impacto en rendimiento o arquitectura del juego durante la transición.
- Qué versión concreta de Python 3 es el objetivo.
