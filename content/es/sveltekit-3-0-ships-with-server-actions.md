---
title: "SvelteKit 3.0 ya está disponible con Reactivity Runes y Server Actions"
summary: "La primera versión estable con TypeScript end-to-end mueve la configuración a vite.config.ts y cambia el alias $lib por #lib. Las remote functions, la gran novedad pendiente, siguen bloqueadas por Async Svelte sin fecha de llegada."
lang: es
story: sveltekit-3-0-ships-with-server-actions
publishedAt: 2026-10-02T13:00:10.212Z
sourceUrl: "https://svelte.dev/blog/sveltekit-3-is-here"
sourceName: "Hacker News (portada)"
priority: flash
tags: [sveltekit, javascript, typescript, frontend]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
SvelteKit 3.0 se publicó el 1 de octubre de 2026. Es la primera versión estable que incorpora Reactivity Runes, Server Actions y TypeScript end-to-end.

El comando de migración asistida es:

```bash
npx sv migrate sveltekit-3 --tasks all --confirm
```

Para proyectos nuevos:

```bash
npx sv create my-new-app
```

El cambio estructural más visible está en la configuración: ahora vive en `vite.config.ts` en lugar de `svelte.config.js`. El alias `$lib` pasa a `#lib` mediante subpath imports estándar, lo que alinea el ecosistema con la especificación de Node y elimina configuración extra en TypeScript y bundlers.

Las variables de entorno ganan potencia y simplicidad, y los service workers reducen el boilerplate necesario. El manejo de errores mejora en general, aunque la nota no detalla los cambios concretos.

## Remote functions: el gran pendiente

Las remote functions , la característica que permite invocar funciones de servidor desde el cliente con tipado compartido, siguen sin estar listas. Son prioridad máxima, pero requieren Async Svelte, que permanece en fase experimental bajo flag. No hay fecha para su estabilización.

## Svelte Summit 2026

El próximo encuentro presencial será los días 19 y 20 de noviembre en Ljubljana, Eslovenia, coincidiendo con el décimo aniversario del framework.

---

### Lo que no se sabe

- Fecha exacta de disponibilidad de remote functions ni hoja de ruta de Async Svelte.
- Detalles específicos de los breaking changes más allá de la configuración y el alias.
- Qué cambios exactos trae la mejora en variables de entorno.
- Cómo es la nueva API de service workers con menos boilerplate.
- Qué mejoras específicas incluye el manejo de errores.
- Programa detallado del Svelte Summit en Ljubljana.
