---
title: "Datasette-auth-github 1.0 corrige la persistencia de sesión en móviles"
summary: "La primera versión estable del plugin añade el atributo Max-Age a las cookies para que el login sobreviva a reinicios del navegador, solucionando un fallo que afectaba especialmente a Mobile Safari."
lang: es
story: datasette-github-auth-plugin-hits-1-0
publishedAt: 2026-09-20T11:49:50.926Z
sourceUrl: "https://simonwillison.net/2026/Sep/19/datasette-auth-github/"
sourceName: "Simon Willison"
priority: routine
tags: [datasette, plugin, autenticacion, github]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison ha publicado datasette-auth-github 1.0, la primera versión estable de su plugin para autenticar usuarios de Datasette mediante cuentas de GitHub. El cambio principal que justifica el salto a 1.0 es la corrección de un fallo en la gestión de cookies de sesión: no incluían el parámetro `Max-Age`, por lo que expiraban al cerrar el navegador. En la práctica, esto rompía la persistencia de la sesión cada vez que el usuario cerraba la pestaña o reiniciaba el dispositivo, un problema especialmente visible en Mobile Safari.

El fallo estaba documentado en el issue #80 del repositorio. La ausencia de `Max-Age` hacía que el navegador tratara la cookie como de sesión, eliminándola automáticamente al terminar la sesión de navegación. La versión 1.0 añade ese atributo para que la cookie tenga una vida útil definida y la autenticación sobreviva a reinicios.

El plugin se está usando en producción en el sitio de demostración `agent.datasette.io` y ha sido probado contra Datasette 0.65.x y la rama 1.0ax. Willison ha indicado que su intención es ir promocionando a 1.0 aquellos plugins que considera estables y listos para uso en producción.

## Qué no se sabe

- Qué valor concreto se ha asignado a `Max-Age` en la corrección.
- Desde qué versión anterior se salta a 1.0.
- Qué otros cambios, si los hay, incluye esta versión además de la corrección de cookies.
- Número de instalaciones o usuarios activos del plugin.
- Qué significa exactamente la denominación `1.0ax` de Datasette (alpha, preview u otra cosa).
