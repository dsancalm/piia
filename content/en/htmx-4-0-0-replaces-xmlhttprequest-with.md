---
title: "htmx 4.0.0 replaces XMLHttpRequest with fetch() API"
summary: "htmx 4.0.0 switches its core from XMLHttpRequest to fetch(), enabling native WebSocket and Server-Sent Events via new extensions. The update introduces explicit attribute inheritance, a new event naming convention, and idiomorph-based DOM morphing."
lang: en
story: htmx-4-0-0-replaces-xmlhttprequest-with
publishedAt: 2026-08-29T12:49:02.869Z
sourceUrl: "https://four.htmx.org/announcements/2026-08-28-htmx-4.0.0-is-released"
sourceName: "Hacker News (portada)"
priority: flash
tags: [htmx, fetch, websockets, server-sentevents]
generatedBy: dots-studio/dots-3-note-preview:free
---
htmx 4.0.0 arrived after eight months of development with a fundamental internal shift: the library replaced XMLHttpRequest with the fetch() API. The change enables native WebSocket and Server-Sent Events support through the new hx-ws and hx-sse extensions, removing the need for separate polyfills or third-party wrappers. The core remains under 14 kB gzipped and requires no build step.

The most immediate breaking change is attribute inheritance. In 2.x, a parent element with `hx-confirm="Are you sure?"` would pass that behavior down to child buttons automatically. Version 4.0 makes inheritance explicit. You must now write `hx-confirm:inherited` on the parent, or use the new `hx-disinherit` attribute to opt out selectively. The project ships an upgrade tool that flags these patterns:

```bash
npx htmx.org@4.0.0 upgrade-check
```

Event naming follows a new `htmx:phase:action[:sub-action]` convention. The old `htmx:beforeRequest` becomes `htmx:before:request`. The full mapping table is not yet published, so existing listeners will fail silently until updated.

History navigation no longer caches responses in localStorage by default. Pressing the back button now re-fetches the URL, which aligns with standard browser behavior but changes expectations for offline-first applications. A new `hx-history-cache` extension restores the previous caching strategy if needed.

Morph swaps arrive via the idiomorph algorithm, allowing fine-grained DOM diffing instead of wholesale innerHTML replacement. The new `<hx-partial>` tag provides a declarative way to mark out-of-band swap targets, replacing the previous `hx-swap-oob` attribute approach.

A bundled distribution called `htmax.js` packages htmx with the most popular extensions (preload, download, alpine-compat, multipart, live) for teams that want a single script tag.

Version 4.0 is deliberately not tagged as `latest` on npm. The 2.x line will remain the default install target until early 2027, giving teams a long migration window.

What is not known: the exact release date (the URL suggests 2026-08-28 but the text does not confirm it), the complete event name mapping table, performance benchmarks for morph swaps versus traditional swaps, browser compatibility details for the fetch-based implementation, the full API for the hx-live scripting solution, and a realistic migration effort estimate for typical codebases.
