---
title: "SvelteKit 3.0 ships with server actions and TypeScript support"
summary: "The first stable release built on Svelte 5 runes adds automated migration, a new config location, and standard subpath imports. Remote functions stay experimental with no timeline."
lang: en
story: sveltekit-3-0-ships-with-server-actions
publishedAt: 2026-10-02T13:00:10.213Z
sourceUrl: "https://svelte.dev/blog/sveltekit-3-is-here"
sourceName: "Hacker News (portada)"
priority: flash
tags: [sveltekit, release, typescript, migration]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
SvelteKit 3.0 shipped on October 1, 2026. It is the first stable release built on Svelte 5's reactivity runes. It adds server actions and end-to-end TypeScript support. The migration path is automated. Run the following command in an existing project:

```bash
npx sv migrate sveltekit-3 --tasks all --confirm
```

To start a new project:

```bash
npx sv create my-new-app
```

The configuration file moves from `svelte.config.js` to `vite.config.ts`. The `$lib` alias is replaced by `#lib`, aligning with the standard subpath imports spec. Environment variables gain a more powerful API. Service workers need less boilerplate. Error handling improves across the board.

Remote functions, the feature that would let you call server code directly from the client, are not ready. They remain the top priority but require Async Svelte, which is still behind an experimental flag. There is no timeline for when either will land in stable.

The next in-person Svelte Summit takes place November 19, 20 in Ljubljana, Slovenia, doubling as the project's tenth anniversary celebration. The program has not been published.

## What we don't know

- Exact release date for remote functions or Async Svelte stable.
- Full list of breaking changes beyond the config move and alias rename.
- Specifics of the new environment variable API and service worker changes.
- Details of the improved error handling.
- Svelte Summit schedule.
