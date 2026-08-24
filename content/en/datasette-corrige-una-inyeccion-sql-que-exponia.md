---
title: "Datasette corrige una inyección SQL que exponía tablas privadas"
summary: "La vulnerabilidad permitía a usuarios con acceso a una tabla pública ejecutar SQL arbitrario y leer tablas privadas en la misma base de datos. Simon Willison publicó el parche el 6 de agosto de 2026 en las versiones 1.0a38 y 0.65.3."
lang: en
story: datasette-corrige-una-inyeccion-sql-que-exponia
publishedAt: 2026-08-07T07:55:33.112Z
sourceUrl: "https://simonwillison.net/2026/Aug/6/datasette/#atom-everything"
sourceName: "Simon Willison"
priority: urgent
tags: [seguridad, sql, datasette]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Datasette 1.0a38 corrige una vulnerabilidad de inyección SQL que afecta a instancias donde conviven tablas públicas y privadas en la misma base de datos. El error permitía a un usuario con acceso a cualquier tabla pública ejecutar consultas SQL arbitrarias, saltándose el sistema de permisos de Datasette y leyendo datos de tablas privadas en modo solo lectura.

Simon Willison publicó la corrección el 6 de agosto de 2026, tanto en la versión 1.0a38 como en la rama estable 0.65.3. El problema está etiquetado como seguridad (624) y como inyección SQL (19) en el repositorio de Datasette.

La causa es que el permiso `execute-sql` se evaluaba de forma insuficiente cuando la base de datos contenía tablas con permisos mixtos. Un usuario con acceso legítimo a una tabla pública podía usar la interfaz de consulta SQL de Datasette para acceder a tablas privadas de la misma base de datos. El permiso `execute-sql` no se comprobaba correctamente contra los permisos de cada tabla individual.

Willison no ha encontrado ninguna instancia real con esta configuración, pero la corrección es necesaria si sirves tablas públicas y privadas en la misma base de datos dentro de la misma instancia de Datasette.

La forma de mitigar el problema mientras tanto es deshabilitar el permiso `execute-sql`:

```json
{
  "datasette": {
    "permissions": {
      "execute-sql": false
    }
  }
}
```

Eso impide que se use la interfaz de consulta SQL de Datasette en cualquier base de datos, lo que elimina el vector de ataque.

## Lo que no se sabe

La fuente no especifica el identificador exacto del CVE ni los detalles técnicos de la vulnerabilidad. No se indica si la corrección introduce cambios de comportamiento en la API o en la interfaz de usuario. Y no se menciona si hay versiones parcheadas para otras ramas de mantenimiento además de la 0.65.3.
