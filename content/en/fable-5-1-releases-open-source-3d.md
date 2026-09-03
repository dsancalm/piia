---
title: "Fable 5.1 releases open-source 3D reconstructions of Union Square and Higashiyama"
summary: "Two browser-native Three.js worlds generate every detail from open data and public photos using autonomous agents. Union Square models four San Francisco blocks with working traffic signals and two full interiors."
lang: en
story: fable-5-1-releases-open-source-3d
publishedAt: 2026-09-03T12:02:43.612Z
sourceUrl: "https://github.com/PhiloLabs/fable51-worlds"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [threejs, openstreetmap, procedural, webgl]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Fable 5.1 ships two explorable, browser-native reconstructions of real places: Union Square in San Francisco and the Higashiyama corridor in Kyoto. Both run as plain Three.js applications started with `npm run dev`. No game engine, no proprietary tile format, no binary assets. Every facade, sign, tree, and traffic light is generated from open data and public reference photos by swarms of autonomous Claude agents.

The Union Square world covers the blocks bounded by Powell, Geary, Post, and Stockton. It uses real terrain, the real street grid, 129 identified storefronts, working traffic signals, cable cars on Powell Street, and a day-dusk-night cycle. Two interiors are fully explorable: the Apple store at 300 Post Street and the Nintendo store at 331 Powell Street. The numbers: 453 OSM footprints, 75 hand-authored facades, 220 pedestrians on a 1,398-node navigation graph, 109 vehicles, 23 interactive objects, and 34 camera positions validated against real photographs producing 147 comparison sheets and nine independent reviewer reports.

Higashiyama models 2.3 continuous, walkable kilometers from Gion to Kiyomizu-dera with 76 meters of elevation change. It renders as a hand-painted anime background using cel materials, hue-shifted shadow bands, screen-space ink from second-order depth difference, and split-tone grading. Zero binary assets. Every sign, noren curtain, lantern, roof tile, and cobblestone is drawn with Canvas2D at startup. The pipeline queries GSI LiDAR at 1-meter resolution for every elevation sample. Street widths are ray-cast against OSM footprints every 8 meters. The Yasaka Pagoda measures 38.79 meters with convex taper, not the commonly cited 46. The Kiyomizu stage sits at 115.5 meters above sea level, not 240, and spans 21.8 by 9.6 meters on 168 pillars of 0.64-meter diameter, not 18 by 10 meters on 139 pillars of 2 meters.

The full pipeline lives in the repository. Parallel agents scrape OSM, USGS, transit feeds, and storefront censuses with cited sources and confidence scores. Offline Blender Python scripts emit optimized GLB kits. The Three.js runtime assembles terrain, streets, facades, props, crowds, and traffic from JSON. A Playwright-driven QA suite captures fixed camera views and diffs them against reference photos. Independent reviewers , an architect, a geographer, a technical artist, an interaction designer , produce reports that drive the next fix cycle.

License is MIT for code and generated assets. Derived OSM geometry carries ODbL. USGS 3DEP data is public domain. Reference photos are not redistributed; provenance lives in `refs/*/SOURCES.md`. Real-world trademarks identify real businesses at their real locations and belong to their owners.

To run Union Square:

```bash
cd union-square-sf && npm install && npm run dev
```

To run Higashiyama:

```bash
cd kyoto-higashiyama && npm install && npm run dev
```

A standalone viewer is also available:

```bash
npm run viewer && open viewer/higashiyama.html
```

## What is not known

Minimum GPU requirements for 60 FPS. Download and disk size after `npm install`. Cutoff dates for the OSM, USGS, and GSI data snapshots. Planned update cadence for existing worlds. Roadmap beyond "More worlds coming." Internal architecture of the Fable 5.1 agents , prompts, tools, orchestration. Performance metrics on representative hardware. Whether an API or interchange format exists to import these worlds into other Three.js projects. Accessibility coverage for keyboard navigation, screen readers, and contrast. Contribution policy for external PRs correcting facades, adding storefronts, or improving shaders.
