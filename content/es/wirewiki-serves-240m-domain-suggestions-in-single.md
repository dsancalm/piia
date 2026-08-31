---
title: "Wirewiki autocompleta 240 millones de dominios con dos índices y cabe en un solo"
summary: "La \"head\" guarda en RAM un trie con los 100.000 dominios más populares y la \"tail\" usa bloques delta-comprimidos mapeados con mmap para el resto. El índice completo ocupa 2,5 GB en disco."
lang: es
story: wirewiki-serves-240m-domain-suggestions-in-single
publishedAt: 2026-08-31T14:22:20.743Z
sourceUrl: "https://ruurtjan.com/articles/p99-0ms-autocomplete-for-240-million-domain-names"
sourceName: "Hacker News (portada)"
priority: flash
tags: [autocompletado, dominios, indice, latencia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Wirewiki resuelve el autocompletado de 240 millones de dominios dividiendo el problema en dos índices. La "head" usa los primeros 100.000 dominios de la lista Tranco y guarda un trie en memoria con las ocho mejores sugerencias precalculadas para cada prefijo. El acceso es O(longitud de lo tecleado) y cabe en RAM. La "tail" cubre el resto mediante bloques de 256 nombres delta-comprimidos; un directorio de 27 MB mapeado con mmap permite buscar en O(longitud * log(número de dominios)) sin leer el fichero entero. En disco el índice completo ocupa 2,5 GB; las páginas calientes se quedan en la caché del sistema operativo.

El cliente no espera a soltar la tecla. En `keyDown` pide sugerencias para el carácter actual y para el siguiente; en `keyUp` renderiza lo que ya ha llegado. La API devuelve hasta ocho sugerencias por prefijo más un objeto `next` con sugerencias para cada uno de los 38 caracteres válidos (a‑z, 0‑9, `-`, `.`). La respuesta máxima son 312 entradas: ~5 kB sin comprimir, ~2,5 kB con gzip o brotli.

La ruta de red es Browser Cloudflare (edge cache) nginx API. La latencia de red domina. El autor midió tecleando 100 dominios rápido y obtuvo un presupuesto p99 de 121 ms entre pulsación y liberación (`keyPress1Duration + gap + keyPress2Duration`). Definió la latencia del artículo como `keyUp to results ready for rendering`. A 60 Hz un frame dura 16,7 ms; con ese presupuesto el margen p50 es 8,33 ms y el p99 cae en ~0 ms*.

Pruebas de carga con 720.000 consultas simuladas (60.000 dominios tecleados) en modo open-loop:
- API sola: p99 < 2 ms.
- nginx + API: p99 15 ms a 1.600 req/s.
- End-to-end (Cloudflare + nginx + API): dentro de los 121 ms incluso con 1.000 usuarios simultáneos.

El único servidor está en Europa. Tráfico desde EE. UU. añade 100‑200 ms y rompe el p99 global. La solución teórica , varios servidores con geo load balancing, se considera excesiva para un proyecto de nicho. El umbral de "instantáneo" de Nielsen (100 ms) se cumple en rutas cacheadas por Cloudflare, pero no de forma consistente worldwide.

## Lo que no se sabe
- Latencia p99 real en producción para usuarios globales (solo hay presupuesto teórico y pruebas sintéticas).
- Porcentaje de consultas que caen en "head" frente a "tail".
- Tasa de acierto del caché de Cloudflare en rutas calientes y su impacto en p99 global.
- Detalles de implementación del trie (lenguaje, biblioteca, tamaño en memoria).
- Formato exacto de compresión delta y estructura de bloques en el índice "tail".
- Coste y arquitectura concreta para desplegar múltiples servidores con geo load balancing.
- Si se han integrado ya Certificate Transparency logs o Archive.org como fuentes adicionales.
- Número de usuarios concurrentes reales y distribución geográfica actual.
