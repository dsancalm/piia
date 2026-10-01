---
title: "Netlify recorta la latencia de sus Edge Functions al 20 % con microVMs Firecracker"
summary: "El cambio de V8 isolates a Firecracker deja la invocación warm en 5,6 ms (p50) y los cold starts en 9 ms, afectando solo al 1,2 % de las llamadas. La arquitectura interna usa Unikraft y EROFS, pero la API para desarrolladores no ha cambiado."
lang: es
story: netlify-cuts-edge-latency-in-half-with
publishedAt: 2026-10-01T13:45:24.100Z
sourceUrl: "https://www.netlify.com/blog/edge-functions-firecracker-microvms/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [netlify, edge, firecracker, latencia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Netlify ha movido sus Edge Functions de V8 isolates a Firecracker MicroVMs. La latencia en caliente cae en picado: la invocación warm promedia 5, 6 ms en el p50, frente a los 25, 40 ms de antes. En el p99 la mejora es del 47,4 %, así que incluso bajo carga la respuesta es más rápida.

El salto viene de Firecracker, un microVM ligero que arranca instancias en menos de un milisegundo y las restaura desde snapshots de memoria en ~2 ms en el p99. Cada función corre en su propio MicroVM, montado sobre EROFS sin comprimir y memory-mapeado para leer solo lo necesario. Los compute nodes, separados de los edge nodes, se construyen desde una imagen base de Unikraft, y Unikraft gestiona todo el ciclo de vida del VM: boot, snapshot, restore, scale-to-zero.

Los cold starts, que antes eran un problema, ahora ocurren en el 1,2 % de las invocaciones y tardan de media 9 ms. El enrutamiento entre nodos usa rendezvous hashing para mantener afinidad y calentar cachés, pero relaja esa afinidad pasado un umbral para evitar hot spots. La entrega de logs es cinco veces más rápida y la disponibilidad se sitúa en el 99,998 %.

Netlify ejecuta unos mil millones de Edge Functions al día y la migración no ha tocado ni una línea de código para los desarrolladores. URL imports, npm, built-ins de Node, netlify.toml y el desarrollo local siguen funcionando igual. La arquitectura interna ha cambiado; la superficie de programación no.

Lo que no se sabe: los límites concretos de CPU, memoria o conexiones por servicio, el umbral exacto de relajación del hashing, los paquetes instalados en los compute nodes, el overhead de memoria por MicroVM, el coste económico comparativo, las versiones de Node.js o V8 usadas, la política de retención de snapshots o los detalles de los circuit breakers y condiciones de rerouting.
