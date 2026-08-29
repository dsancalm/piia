---
title: "htmx 4.0.0 cambia a fetch y rompe la herencia de atributos"
summary: "La versión mayor sustituye XMLHttpRequest por fetch, exige el sufijo :inherited para propagar atributos, renombra eventos a un patrón unificado y desactiva la caché de historial en localStorage por defecto."
lang: es
story: htmx-4-0-0-replaces-xmlhttprequest-with
publishedAt: 2026-08-29T12:49:02.868Z
sourceUrl: "https://four.htmx.org/announcements/2026-08-28-htmx-4.0.0-is-released"
sourceName: "Hacker News (portada)"
priority: flash
tags: [htmx, javascript, frontend, migracion]
generatedBy: dots-studio/dots-3-note-preview:free
---
htmx 4.0.0 llega tras ocho meses de trabajo con un cambio interno de calado: la sustitución de XMLHttpRequest por la API fetch(). El movimiento limpia deuda técnica y alinea la librería con el estándar actual de los navegadores, pero arrastra una ristra de roturas de compatibilidad que obligan a revisar cualquier código existente.

La herencia de atributos deja de ser implícita. Donde antes bastaba con poner `hx-confirm="¿Seguro?"` en un contenedor para que afectara a los botones internos, ahora hay que añadir el sufijo `:inherited` de forma explícita. El ejemplo de la migración lo muestra claro:

```html
<!-- htmx 2 -->
<div hx-confirm="Are you sure?">
  <button hx-delete="/item/1">Delete</button>
</div>

<!-- htmx 4 -->
<div hx-confirm:inherited="Are you sure?">
  <button hx-delete="/item/1">Delete</button>
</div>
```

Para desactivar la herencia en un subárbol se usa `hx-disinherit`. La herramienta `npx htmx.org@4.0.0 upgrade-check` escanea el proyecto y señala los puntos que requieren el sufijo, aunque no aplica los cambios automáticamente.

Los eventos siguen un nuevo patrón `htmx:phase:action[:sub-action]`. `htmx:beforeRequest` pasa a llamarse `htmx:before:request` y el resto de la nomenclatura se homogeneiza. La tabla completa de equivalencias no está publicada aún, así que habrá que cruzar referencias con la documentación final.

El soporte de historial deja de escribir en localStorage por defecto. Al pulsar "atrás" el navegador vuelve a pedir el fragmento al servidor, lo que evita estados desincronizados pero aumenta el tráfico. Quien prefiera el comportamiento anterior puede activar la extensión `hx-history-cache`.

El algoritmo de morph swap, basado en idiomorph, entra en el núcleo como estrategia `morph`. Compara el DOM entrante con el actual y aplica solo las diferencias, preservando estado de foco, selecciones y componentes web. Aún no hay benchmarks públicos que comparen su coste frente al intercambio clásico `innerHTML`.

Entre las extensiones nuevas destacan `hx-sse` y `hx-ws` para Server-Sent Events y WebSockets nativos, `hx-multipart` para subidas de archivos sin formularios adicionales, `hx-preload` para precarga de respuestas y `hx-live`, una capa de scripting declarativo que compite conceptualmente con Alpine.js. El bundle `htmax.js` empaqueta htmx con las extensiones más usadas para quien quiera un solo archivo sin paso de build.

En npm la etiqueta `latest` sigue apuntando a la serie 2.x y lo hará al menos hasta principios de 2027. La versión 4 se instala con `npm install htmx.org@4.0.0` o `npx htmx.org@4.0.0` para la CLI de migración.

Lo que no se sabe
- Fecha exacta de publicación (la URL sugiere 2026-08-28 pero el texto no lo confirma).
- Tabla completa de mapeo de eventos antiguos a nuevos.
- Benchmarks de rendimiento de morph swap frente a swaps tradicionales.
- Detalles de compatibilidad de navegadores para la implementación basada en fetch().
- API completa de `hx-live`.
- Estimación real del esfuerzo de migración en bases de código medianas.
