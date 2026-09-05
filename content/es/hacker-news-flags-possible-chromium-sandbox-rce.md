---
title: "Hilo en Hacker News alerta de un fallo crítico en Chromium que se estaría explotando"
summary: "El identificador CVE-2026-85046 aparece en el NVD pero la ficha está vacía; el año 2026 sugiere reserva futura o error. Sin datos técnicos confirmados, la comunidad trata el aviso como creíble por la puntuación del hilo."
lang: es
story: hacker-news-flags-possible-chromium-sandbox-rce
publishedAt: 2026-09-05T10:51:44.412Z
sourceUrl: "https://nvd.nist.gov/vuln/detail/cve-2026-85046"
sourceName: "Hacker News (portada)"
priority: flash
tags: [chromium, seguridad, cve, zero-day]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un hilo en Hacker News advierte de una vulnerabilidad de ejecución remota de código que escapa del sandbox de Chromium. Según el título, se está explotando activamente en todas las versiones actuales del motor. La entrada enlaza a la ficha del NVD para CVE-2026-85046 y suma 513 puntos con 279 comentarios, lo que muestra que la comunidad técnica la considera crítica.

El identificador lleva el año 2026, lo que sugiere que el CVE podría estar reservado pero no publicado, o que hay un error en la numeración. Hasta que el NVD muestre la ficha completa no se conoce la puntuación CVSS, el vector de ataque ni las versiones exactas afectadas. Tampoco hay detalles públicos sobre cómo se está llevando a cabo la explotación ni si existe algún *workaround* oficial más allá de actualizar el navegador.

Cualquier desarrollador que use Chrome, Edge, Brave, Opera o una WebView basada en Chromium está expuesto mientras no aplique el parche correspondiente. La recomendación inmediata es actualizar el navegador en cuanto la versión corregida esté disponible y, en entornos de alto riesgo, considerar deshabilitar JavaScript en sitios no confiables como medida temporal.

## Lo que no se sabe

- Si CVE-2026-85046 existe realmente o es un identificador futuro o erróneo.
- Descripción técnica, CVSS, vector de ataque y versiones afectadas exactas.
- Detalles de la explotación activa reportada.
- Mitigaciones o *workarounds* publicados oficialmente.
