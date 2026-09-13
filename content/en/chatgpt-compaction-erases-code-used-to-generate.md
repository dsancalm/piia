---
title: "ChatGPT compaction erases code used to generate running routes"
summary: "Simon Willison had ChatGPT create 5K and 10K loops from his home using OSM data. The model ran Python for 27 minutes and delivered maps and GPX files, but the code vanished when the thread was compacted."
lang: en
story: chatgpt-compaction-erases-code-used-to-generate
publishedAt: 2026-09-13T12:21:54.174Z
sourceUrl: "https://simonwillison.net/2026/Sep/12/astra-running-routes/"
sourceName: "Simon Willison"
priority: urgent
tags: [chatgpt, compaction, openstreetmap, agents]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison used ChatGPT with GPT-6 Astra (Max) to generate 5K and 10K running routes that loop from his home address using OpenStreetMap data. The model worked for 27 minutes and produced an embedded visualization, a downloadable GPX file, and GeoJSON files. It reported using Nominatim to geocode the address and Overpass to download local OSM roads and trails, then calculated the loops locally. The actual Python code the model executed was not visible in the ChatGPT UI, and the model could not provide it later because the thread had been compacted.

## The compaction problem

Willison argues that LLM systems using compaction must preserve pre-compacted text and make it available via agent tool calls to prevent loss of artifacts like code. In this run, the model wrote Python to query Overpass, compute loops, and emit GPX and GeoJSON. That code ran inside the environment but disappeared from the conversation history once compaction occurred. The model later claimed it could not retrieve the code because the relevant turns had been summarized away. For developers building on these platforms, any artifact not explicitly saved to the workspace or returned as a file is at risk of being lost silently. The workaround is to force the agent to write code to a file in the workspace and then read it back, but that adds friction and is not guaranteed by the platform.

## Visualization internals

The map visualization used the "visualize" skill, creating an HTML file at `/workspace/el-granada-5k-share.html` embedded directly in the ChatGPT UI. The visualization HTML contains a `<script type="application/json">` element with the full route geometry (LineString coordinates) needed to render the route and map using D3.js. D3.js v7.9.0 is loaded from `cdn.jsdelivr.net`, which is on the allow-listed CDN origins for the visualize skill.

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
    { "route": { "type": "LineString", "coordinates": [ [ -122.467425, 37.4997753 ] ... ] } }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>
  <script>
    (() => { const root=document.getElementById('eg-share-loop');
```

The visualize skill's Content Security Policy (CSP) allows only specific origins: `cdnjs.cloudflare.com`, `esm.sh`, `cdn.jsdelivr.net`, `unpkg.com`, `fonts.googleapis.com`, `fonts.gstatic.com`, and `fonts.bunny.net`. Other origins are blocked and fail silently. This constraint shapes what libraries and assets can be used in generated visualizations.

## What is not known

The exact Python code used to calculate the running routes was lost due to thread compaction. The specific address used was redacted as `<my address>` in the prompt. The exact coordinates of the full route are truncated as `[...]` in the HTML snippet. The distance and details of the generated 10K route are not shown; only the 5K route appears in the shared visualization. It is not known whether the GPX and GeoJSON files contained identical geometry to the HTML visualization. The specific Overpass query used to fetch OSM roads and trails was not disclosed. How the visualize skill CSP allow-list is configured or updated is not documented publicly.
