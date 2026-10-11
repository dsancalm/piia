---
title: "Dwarf Fortress adopta control de versiones tras 15 años de desarrollo manual"
summary: "El lanzamiento en Steam obligó a Tarn Adams a usar Git tras décadas gestionando cientos de miles de líneas con copias de seguridad manuales y archivos zip. El cambio llegó tras hacerse millonarios, no antes."
lang: es
story: dwarf-fortress-added-version-control-after-twenty
publishedAt: 2026-10-11T13:20:52.427Z
sourceUrl: "https://simonwillison.net/2026/Oct/11/dwarf-fortress/"
sourceName: "Simon Willison"
priority: routine
tags: [gamedev, historia, software, steam]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Dwarf Fortress ha funcionado más de quince años sin control de versiones. Tarn Adams, su creador, explicó en 2013 que no le convencía enviar código a una "caja negra" sin obtener un beneficio inmediato. Tres años después, en 2016, mantuvo la misma postura tras una década y media de desarrollo en solitario.

La situación cambió en marzo de 2023. Con motivo del lanzamiento en Steam, Adams mencionó en una entrevista que ya contaban con "cosas de control de versiones para usar ahora". El salto coincidió con la llegada del juego a una plataforma comercial, la expansión del equipo y la necesidad de coordinar cambios entre varias personas.

Simon Willison señala una ironía: el proyecto alcanzó su hito económico más importante , el lanzamiento en Steam les hizo millonarios, antes de adoptar una herramienta que la industria considera básica. El código base, que incluye sistemas de simulación geológica, histórica y social entrelazados, creció hasta cientos de miles de líneas sin commits, ramas ni historial navegable.

## Cómo trabajaban antes

Sin Git ni Subversion, la gestión de cambios dependía de copias de seguridad manuales, archivos zip con fechas en el nombre y la memoria de Adams. No había forma automática de revertir un cambio roto, comparar versiones ni experimentar en paralelo sin riesgo. Cada refactor era una apuesta sin red.

La migración a un sistema moderno , no se ha confirmado cuál, aunque Git es la opción estándar, implicó decidir si importar el historial previo o partir de una instantánea limpia. Tampoco se sabe cuándo ocurrió exactamente el cambio entre 2016 y 2023, ni si fue un proceso gradual o un corte seco antes del lanzamiento en Steam.

## Lo que no se sabe

- Qué sistema de control de versiones adoptaron (Git, Mercurial, SVN u otro).
- Cuándo exactamente ocurrió la transición (mes y año preciso entre 2016 y 2023).
- Qué motivó el cambio final (presión del lanzamiento en Steam, crecimiento del equipo, necesidad de branching, etc.).
- Si el código base histórico previo al control de versiones fue importado con historial o se inició un repositorio nuevo.
- Cómo gestionaban copias de seguridad, ramas experimentales o deshacer cambios antes de 2023.
