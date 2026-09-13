---
title: "ChatGPT genera rutas circulares con OpenStreetMap pero pierde el código al compactar"
summary: "Simon Willison probó el agente GPT-6 Astra (Max) para crear bucles de 5 y 10 km desde su casa. El modelo entregó mapas interactivos, GPX y GeoJSON en 27 minutos, pero la compactación del contexto borró el Python ejecutado y el modelo no pudo recuperarlo después."
lang: es
story: chatgpt-compaction-erases-code-used-to-generate
publishedAt: 2026-09-13T12:21:54.173Z
sourceUrl: "https://simonwillison.net/2026/Sep/12/astra-running-routes/"
sourceName: "Simon Willison"
priority: urgent
tags: [chatgpt, openstreetmap, agentes, compactacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison ha probado ChatGPT Work con el modelo GPT-6 Astra (Max) para generar rutas de 5 y 10 kilómetros que salgan y vuelvan a su casa usando datos de OpenStreetMap. El agente tardó 27 minutos y entregó una visualización interactiva incrustada en la interfaz, un archivo GPX descargable y ficheros GeoJSON. Según el propio modelo, geocodificó la dirección con Nominatim, descargó calles y senderos mediante Overpass y calculó los bucles en local.

El resultado visible es un HTML servido desde `/workspace/el-granada-5k-share.html`. Contiene un elemento `<script type="application/json">` con la geometría completa de la ruta (un LineString de coordenadas) que D3.js 7.9.0, cargado desde `cdn.jsdelivr.net`, renderiza sobre un mapa base. La visualización usa la *skill* "visualize", cuyo Content Security Policy permite solo orígenes concretos: `cdnjs.cloudflare.com`, `esm.sh`, `cdn.jsdelivr.net`, `unpkg.com`, `fonts.googleapis.com`, `fonts.gstatic.com` y `fonts.bunny.net`. Cualquier otro dominio falla en silencio.

```html
<div id="eg-share-loop">
  <div class="viz-row">
    <h3>El Granada harbor loop</h3>
    <span class="text-small">5.1 km</span>
  </div>
  <div id="eg-share-stage"></div>
  <div class="text-small text-muted">
    Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>
  </div>
  <style>
    #eg-share-loop { width: 100%; }
    #eg-share-loop #eg-share-stage { width: 100%; margin: 8px 0; }
    #eg-share-loop .eg-share-map { display: block; width: 100%; touch-action: none; }
    #eg-share-loop .eg-share-map text { fill: var(--foreground); font-size: 12px; font-weight: 400; }
    #eg-share-loop .eg-share-label { paint-order: stroke; stroke: var(--background); stroke-width: 3px; stroke-linejoin: round; }
  </style>
  <script type="application/json" id="eg-share-data">
    { "route": { "type": "LineString", "coordinates": [ [-122.467425, 37.4997753] ... ] } }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>
  <script>
    (() => { const root=document.getElementById('eg-share-loop');
  </script>
</div>
```

El problema estructural apareció al intentar recuperar el código Python que el agente ejecutó realmente. La interfaz de ChatGPT no lo muestra y, cuando Willison lo pidió después, el modelo no pudo proporcionarlo porque el hilo había sufrido compactación. Willison señala que los sistemas LLM que compactan contexto deben preservar el texto previo a la compactación y hacerlo recuperable mediante llamadas a herramientas; de lo contrario, se pierden artefactos esenciales como el código generado.

## Lo que no se sabe

- El código Python exacto usado para calcular las rutas (perdido por compactación).
- La dirección concreta del usuario (aparece como `<my address>` en el prompt).
- Las coordenadas completas de la ruta (el JSON está truncado en el fragmento).
- Distancia y detalles de la ruta de 10K (solo se muestra la de 5K, 5,1 km).
- Si los archivos GPX y GeoJSON contienen geometría idéntica a la visualización HTML.
- La consulta Overpass exacta empleada para obtener calles y senderos.
- Cómo se configura o actualiza la lista de orígenes permitidos en el CSP de la *skill* "visualize".
