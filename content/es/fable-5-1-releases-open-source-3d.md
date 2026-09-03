---
title: "Fable 5.1 publica dos ciudades enteras que corren en el navegador sin motor de juego"
summary: "Union Square y Higashiyama se generan desde scripts que leen OSM, LiDAR y fotos; nada de assets binarios ni tiles propietarios. El pipeline completo está en el repo bajo licencia MIT y ODbL."
lang: es
story: fable-5-1-releases-open-source-3d
publishedAt: 2026-09-03T12:02:43.611Z
sourceUrl: "https://github.com/PhiloLabs/fable51-worlds"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [threejs, openstreetmap, lidar, procedural]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Fable 5.1 publica dos reconstrucciones urbanas completas que se ejecutan en el navegador como aplicaciones Three.js puras. No hay motor de juego, no hay tiles 3D propietarios y no hay assets binarios prehechos: cada geometría, cada textura y cada comportamiento nace de scripts que leen OpenStreetMap, LiDAR público y fotos de referencia, y emiten código que `npm run dev` levanta en segundos.

El repositorio entrega hoy dos mundos. Union Square cubre las manzanas delimitadas por Powell, Geary, Post y Stockton en San Francisco: 453 huellas OSM, 75 fachadas modeladas a mano, 129 escaparates identificados por nombre, semáforos funcionales, cable cars de la línea Powell, ciclo día/atardecer/noche y dos interiores explorables (Apple Union Square en 300 Post St y Nintendo SAN FRANCISCO en 331 Powell St). La simulación mueve 220 peatones sobre un grafo de 1.398 nodos y 109 vehículos. Higashiyama modela 2,3 km continuos de la ruta Gion Kiyomizu-dera en Kioto con 76 m de desnivel real. El render usa un estilo anime pintado a mano: materiales cel, bandas de sombra con hue-shift, tinta en pantalla a partir de la segunda diferencia de profundidad y split-tone grading. Todo , señales, noren, linternas, tejas, adoquines, se dibuja con Canvas2D al arranque. Son 266 edificios, 471 escaparates, 19 hitos heroicos en 15 distritos, 1.938 árboles de 11 especies, 3.076 props de 60 tipos y 142 interacciones.

El pipeline está entero en el repo. La fase de reconocimiento lanza agentes paralelos que extraen OSM, USGS 3DEP, datos de tránsito y censo de escaparates adjuntando fuente y nivel de confianza. La generación offline corre scripts `bpy` que emiten kits GLB optimizados. El runtime Three.js ensambla terreno, calles, fachadas, props, multitudes y tráfico desde JSON. El QA usa Playwright para capturar vistas fijas y hacer diff contra fotos libres; cuatro revisores independientes (arquitecto, geógrafo, technical artist, interacción) firman informes que alimentan el siguiente ciclo de fixes.

La precisión obsesiona. En Higashiyama cada elevación se consulta independientemente al GSI LiDAR de 1 m; los anchos de calle se ray-castean sobre huellas OSM cada 8 m. La pagoda Yasaka mide 38,79 m (no 46 m) con taper convexo; el escenario de Kiyomizu está a 115,5 m SNM (no 240 m) y mide 21,8 × 9,6 m sobre 168 pilares de 0,64 m de diámetro (no 18 × 10 m sobre 139 pilares de 2 m). Union Square valida 34 puntos de cámara contra fotos reales, genera 147 hojas de comparación y recoge 9 informes de revisores.

La licencia es MIT para código y assets generados. La geometría derivada de OSM cae bajo ODbL; la de USGS 3DEP es dominio público. Las fotos de referencia no se redistribuyen (su procedencia está en `refs/*/SOURCES.md`). Marcas y logos identifican negocios reales en sus ubicaciones reales y pertenecen a sus dueños.

Para arrancar:
```bash
cd union-square-sf && npm install && npm run dev
```
```bash
cd kyoto-higashiyama && npm install && npm run dev
```
El visor estático de Higashiyama:
```bash
npm run viewer && open viewer/higashiyama.html
```

Lo que no se sabe
- Requisitos de GPU mínimos para 60 FPS en cada mundo
- Tamaño de descarga y disco tras `npm install`
- Fecha de corte de los datos OSM, USGS y GSI usados
- Frecuencia de actualización prevista para los mundos actuales
- Próximos mundos en desarrollo más allá de "More worlds coming"
- Detalles de la arquitectura de agentes Claude Fable 5.1 (prompts, herramientas, orquestación)
- Métricas de rendimiento (frame time, draw calls, memoria) en dispositivos representativos
- Si existe API o formato de intercambio para importar estos mundos en otros proyectos Three.js
- Cobertura de accesibilidad (teclado, lectores de pantalla, contraste) en interiores y exteriores
- Política de contribución externa: ¿se aceptan PRs para corregir fachadas, añadir escaparates, mejorar shaders?
