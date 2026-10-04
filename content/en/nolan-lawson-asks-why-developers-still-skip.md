---
title: "Nolan Lawson asks why developers still skip native browser APIs"
summary: "Lawson traces the shift from browser lag to ecosystem habit: React and npm workflows steer teams toward component packages before they consider native options like <dialog> or position:sticky."
lang: en
story: nolan-lawson-asks-why-developers-still-skip
publishedAt: 2026-10-04T12:47:14.084Z
sourceUrl: "https://nolanlawson.com/2026/10/03/why-dont-more-developers-use-the-platform/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [browsers, javascript, css, developer-tools]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Nolan Lawson published "Why don't more developers 'use the platform'?" on October 3, 2026. The piece traces the gap between native browser APIs and the everyday choices developers make.

Historically, browsers lagged behind libraries like jQuery. Teams waited years for Internet Explorer 6 to fade before they could rely on standard features. Today most browsers are evergreen, though Safari still updates only about seven times a year. That cadence is no longer the primary blocker.

The friction has shifted. Developers steeped in the React and npm ecosystem reach for a component package before they consider `position: sticky` or `<dialog>`. Documentation used to live in scattered blogs and Stack Overflow threads. MDN and web.dev have consolidated that reference layer, yet a library landing page such as Dragula still feels more inviting than the MDN entry for the native Drag and Drop API.

There is also a psychological component. Building a modal from scratch , `position:absolute`, `z-index`, focus trapping, Escape key handling , is more engaging than dropping in `<dialog>`. Lawson calls this the IKEA effect: developers value what they assemble themselves, which then motivates them to maintain and publish that code to npm. Many current "use the platform" advocates, Lawson included, cut their teeth writing polyfills and libraries (PouchDB for IndexedDB and WebSQL) that later pulled them into W3C standards work.

CSS ignorance played its part. For years layout required hacks , clearfix, floats, `min-width: 0` , so teams moved logic to JavaScript. Native solutions for line clamping, textarea resizing, or scrollbar hiding simply did not exist.

The pattern repeats outside the browser. Lawson describes a ClickHouse project where he and a colleague built custom pre-compression and a separate key-value store, unaware that ClickHouse compresses automatically and its columnar storage already optimizes the workload. Reading the documentation and running benchmarks showed the native path was faster and simpler. The senior engineer archetype, Lawson notes, is the person who replaces a complex subsystem with a single line because they know the platform deeply.

On AI, Lawson offers an optimistic view: large language models have encyclopedic knowledge of APIs and, when prompted to test and benchmark, tend to prefer native solutions. The pessimistic counterpoint is not included in the published excerpt.

```css
position: sticky
```

```html
<dialog>
</dialog>
```

What is not known: Lawson's pessimistic take on AI impact; adoption rates for `<dialog>` versus npm modal libraries; comparative benchmarks for the specific examples cited; the breakdown of developers who build for fun, reach for libraries from habit, or simply do not know the native API exists; and the ClickHouse dataset size, compression metrics, or engineering hours spent on the custom solutions.
