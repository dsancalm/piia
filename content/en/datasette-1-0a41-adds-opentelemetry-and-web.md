---
title: "Datasette 1.0a41 adds OpenTelemetry and Web Component modals"
summary: "Native OpenTelemetry support streams traces and metrics to existing collectors via standard environment variables, while a new <datasette-modal> Web Component replaces every dialog with a reusable, plugin-friendly element that handles focus, keyboard dismissal, and custom..."
lang: en
story: datasette-1-0a41-adds-opentelemetry-and-web
publishedAt: 2026-09-25T12:05:53.546Z
sourceUrl: "https://simonwillison.net/2026/Sep/24/datasette/"
sourceName: "Simon Willison"
priority: routine
tags: [datasette, opentelemetry, web-components, alpha]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Datasette 1.0a41 ships with native OpenTelemetry support contributed by Alec Garcia. The integration means traces, metrics, and logs flow directly from the ASGI application into whatever collector you already run, without sidecar agents or middleware shims. You configure the exporter through the standard `OTEL_EXPORTER_OTLP_ENDPOINT` and `OTEL_SERVICE_NAME` environment variables, and Datasette respects the rest of the OpenTelemetry SDK conventions.

At the same time, every modal dialog in the codebase has been rewritten as a single `<datasette-modal>` Web Component. The component encapsulates focus trapping, keyboard dismissal, backdrop handling, and slot-based content projection. Because it registers on the global `CustomElementRegistry`, any plugin can drop `<datasette-modal>` into its own templates and get the same behaviour without bundling extra JavaScript. The component API is documented in the plugin authoring guide with the following minimal example:

```html
<datasette-modal id="confirm-delete">
  <form method="post" action="/delete" slot="content">
    <p>Delete this row?</p>
    <button type="submit">Yes</button>
    <button type="button" data-close>Cancel</button>
  </form>
</datasette-modal>

<script>
  document.getElementById('confirm-delete').show()
</script>
```

The component emits `datasette-modal-show` and `datasette-modal-hide` events so surrounding code can react without polling.

## What is not known

The release notes do not list which specific OpenTelemetry instruments are enabled by default, nor whether custom attributes are attached to database query spans. There is no migration guide yet for plugins that currently inject the old modal markup, and the project has not published a target date for the 1.0 stable release.
