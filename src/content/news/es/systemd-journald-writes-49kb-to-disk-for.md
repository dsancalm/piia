---
title: "systemd-journald 257.9 genera escrituras de disco desproporcionadas en Debian 13"
summary: "Un informe en Hacker News reproduce un fallo en systemd-journald 257.9 que causa un volumen de IO anómalo: cada línea de log ocupa hasta 110KB en disco. El autor lo vincula con el issue #15292 de systemd, cerrado sin resolución clara."
lang: es
story: systemd-journald-writes-49kb-to-disk-for
publishedAt: 2026-08-14T08:01:56.655Z
sourceUrl: "https://github.com/systemd/systemd/issues/40262"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [systemd, journald, rendimiento, disco]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Un reporte en Hacker News señala un problema de rendimiento en systemd-journald 257.9 que genera un volumen de escrituras de disco desproporcionado. El autor del informe reproduce el fallo en Debian 13 con kernel 6.12.57+deb13-amd64 y sistema de archivos XFS, y observa que su VM hace unas 50 IOPS mientras escribe solo 2 líneas de log por segundo.

El dato más llamativo es el tamaño de las líneas de journal que acaban en disco: 49KB por línea en ext4 y más de 110KB en btrfs, según describe el autor. Eso significa que el journal ocupa múltiples veces el tamaño del contenido real que se registra. El informe también menciona corrupción del journal en reinicios no limpios, lo que añade un riesgo adicional al problema de IO.

El autor relaciona este fallo con el issue #15292 del repositorio de systemd, que fue cerrado sin una resolución clara. Ese issue documentaba un comportamiento similar, y el cierre sin explicación suficiente es parte de la frustración que transmite el reporte.

## Qué implica para tu infraestructura

Si ejecutas systemd-journald en producción, este problema puede traducirse en una carga de IO muy superior a la esperada. En discos mecánicos eso degrada la latencia de otras operaciones; en SSDs acelera el desgaste de las celdas. Las cifras del reporte, aunque sean de una VM concreta, indican que el journal puede estar escribiendo decenas de kilobytes por línea de log, lo que en sistemas con logs verbosos multiplica el desgaste del disco sin que haya una razón evidente.

El hecho de que el problema se manifieste en XFS en la reproducción no descarta que ocurra en otros sistemas de archivos. El issue #15292 original mencionaba ext4 y btrfs, así que la lista de sistemas afectados probablemente sea más amplia.

## Lo que no se sabe

El reporte no detalla el mecanismo exacto por el que journald genera tanto IO, ni especifica la proporción exacta entre el tamaño de los archivos de journal y el contenido real. Tampoco aclara si el problema se reproduce en otros sistemas de archivos además de XFS, aunque el issue original sugiere que sí. No hay una solución o workaround documentado en el reporte.
