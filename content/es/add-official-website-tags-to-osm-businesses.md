---
title: "Añade webs a OSM con WebsiteWizard en JOSM"
summary: "Instala el plugin, descarga tu barrio y usa búsquedas automáticas para etiquetar comercios sin web. Verifica cada URL y sube el changeset con source=survey o website. Evita directorios y redes sociales."
lang: es
story: add-official-website-tags-to-osm-businesses
publishedAt: 2026-09-13T12:50:24.238Z
sourceUrl: "https://high5apps.github.io/josm-plugin-website-wizard/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [osm, josm, website, geodatos]
generatedBy: dots-studio/dots-3-note-preview:free
---
Contribuir a OpenStreetMap no requiere permisos especiales ni flujos de aprobación. Basta con una cuenta, un editor y quince minutos para añadir el sitio web oficial de un comercio que falte en el mapa. El tutorial usa JOSM, el editor de escritorio escrito en Java, porque sus plugins reducen la fricción a la hora de rellenar etiquetas repetitivas como `website`, `contact:website` o `opening_hours`. La descarga pesa unos 365 MB y arranca sin instalación adicional en cualquier sistema con una JVM reciente.

## El flujo con Website Wizard

Una vez dentro de JOSM, instalas el plugin *WebsiteWizard* desde la lista oficial. Descargas un área pequeña , unas pocas manzanas, no toda la ciudad, con `Archivo → Descargar del OSM` o `Ctrl+Shift+↓`. El asistente lanza búsquedas en DuckDuckGo por el nombre del establecimiento y su dirección, y te presenta la URL candidata. Tu trabajo es confirmar que sea el sitio oficial del negocio, no una ficha en TripAdvisor, Facebook o un directorio genérico. Si la URL pasa el filtro, el plugin escribe la etiqueta `website` y, opcionalmente, `contact:website`.

La consulta que usa el plugin para encontrar candidatos sin etiquetar es:

```
name=* ((amenity=* "addr:housenumber"=*) | shop=*) -website=* -"contact:website"=*
```

Esa expresión selecciona nodos y vías que tienen nombre y número de calle, son comercios o equipamientos, y carecen de ambos campos de web. Al subir el conjunto de cambios (changeset) añades un comentario descriptivo , por ejemplo, "Add website to Wallingford shops and amenities", y declaras `source=survey` si has verificado la URL in situ o `source=website` si la has tomado de la página del propio negocio.

## Qué gana tu pipeline

Cada etiqueta `website` que subes aparece en minutos en Nominatim, Overpass, OsmAnd, Organic Maps y cualquiera de los cientos de servicios que consumen la base de datos planetaria. Si tus procesos de geocodificación, enrutamiento o enriquecimiento de direcciones dependen de OSM, corregir upstream evita mantener parches privados que se desincronizan. El autor del tutorial añadió 66 webs en el barrio de Wallingford, Seattle, en una sola tarde; en Estados Unidos queda cerca de un millón de comercios sin ese dato.

## Lo que no se sabe

- Si *WebsiteWizard* funciona en todas las versiones de JOSM o requiere una mínima.
- Qué criterio aplicar cuando DuckDuckGo no devuelve un resultado claro o el sitio oficial no está en inglés.
- Si copiar la URL de una web comercial implica alguna restricción de licencia o términos de uso.
- Si la descarga del AOI trae ya elementos con `website` relleno y el plugin los salta automáticamente.
