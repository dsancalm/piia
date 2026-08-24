---
title: "Datasette corrige una inyección SQL que exponía tablas privadas"
summary: ""
lang: es
story: datasette-corrige-una-inyeccion-sql-que-exponia
publishedAt: 2026-08-07T07:55:33.111Z
sourceUrl: "https://simonwillison.net/2026/Aug/6/datasette/#atom-everything"
sourceName: "Simon Willison"
priority: urgent
tags: []
generatedBy: deepseek/deepseek-v4-flash-0731
---
Datasette 1.0a38 corrige un fallo de inyección SQL que afecta a instancias con tablas públicas y privadas en la misma base de datos. Simon Willison lo publicó el 6 de agosto de 2026, y la corrección también está en 0.65.3.

El error permitía a un usuario con acceso a cualquier tabla pública ejecutar ataques de inyección SQL a pesar de las restricciones de permisos. El resultado era acceso de solo lectura a datos de tablas privadas en la misma base de datos. Willison no ha encontrado ninguna instancia con esa configuración, pero el fallo es reproducible si tienes tablas mixtas.

La solución inmediata, si no puedes actualizar, es deshabilitar el permiso `execute-sql`:

```bash
datasette database.db \
  -p "execute-sql:off"
```

También puedes hacerlo por usuario o grupo desde la interfaz de permisos. Si usas `datasette-insert-api` o cualquier plugin que ejecute SQL arbitrario, revísalo: el fallo afecta a ese permiso concreto.

En las notas de la versión, Willison usa las etiquetas de seguridad, inyección SQL y datasette en su rastreador de problemas, así que está tratado como un problema de seguridad. La versión 1.0a38 sigue siendo una alfa, pero esta corrección está incluida en la rama estable con 0.65.3.

No se sabe el identificador exacto del CVE, ni si la corrección cambia el comportamiento de la API o de la interfaz. Tampoco hay una versión parcheada para otras ramas de mantenimiento que no sea 0.65.3. Si usas una versión anterior, actualiza a esa o a la alfa.
