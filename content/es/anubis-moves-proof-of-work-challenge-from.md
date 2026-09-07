---
title: "Anubis pasa su prueba de trabajo a WebAssembly tras un año de desarrollo"
summary: "El desafío anti-scraping mueve la carga criptográfica del hilo principal JS a un módulo WASM de 180 KB Brotli que exige crypto.getRandomValues y performance.now. Sin fallback: navegadores sin WASM o con bloqueadores como JShelter son rechazados."
lang: es
story: anubis-moves-proof-of-work-challenge-from
publishedAt: 2026-09-07T12:54:11.382Z
sourceUrl: "https://anubis.techaro.lol/blog/2026/anubis-wasm/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [anubis, webassembly, scraping, bots]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anubis ha tardado un año en enviar su desafío de prueba de trabajo (PoW) compilado a WebAssembly. La herramienta, diseñada para frenar el scraping agresivo de bots de IA mediante un esquema tipo Hashcash, movía hasta ahora toda la carga criptográfica al hilo principal del navegador en JavaScript. El cambio a WASM busca recortar el tiempo que el usuario espera antes de acceder al contenido y reducir los ciclos de CPU que el servidor de borde dedica a verificar cada solución.

El repositorio etiqueta la versión actual como `v1.28.0-pre1.0.20260906214259-7564aa1d8a85`. El binario WASM se sirve junto al resto de assets estáticos y se instancia en el cliente mediante la API estándar `WebAssembly.instantiateStreaming`. No hay *fallback* a JavaScript: si el navegador no soporta WASM o el usuario emplea extensiones que bloquean características modernas de JS (como JShelter), el desafío falla y se deniega el acceso. La arquitectura mantiene la verificación en el edge; el servidor solo comprueba que el *nonce* entregado cumple la dificultad objetivo, sin ejecutar WASM en su lado.

Durante la integración surgieron tres fricciones principales. Primero, el tamaño del módulo: la compilación con `wasm-pack` y `wasm-opt -Oz` deja un artefacto de ~180 KB comprimidos con Brotli, lo que añade una ida y vuelta de red en la primera visita. Segundo, el *sandboxing*: el módulo no tiene acceso a *host bindings* ni a `wasi:io`; toda la entropía y el temporizador vienen de *imports* JavaScript mínimos (`crypto.getRandomValues`, `performance.now`). Tercero, la determinista del *hash*: cualquier discrepancia entre la implementación de referencia en Rust y la salida del navegador invalida la prueba, lo que obligó a fijar la versión de `sha2` y a desactivar optimizaciones de punto flotante que variaban entre motores.

El objetivo declarado es sustituir el PoW por *fingerprinting* pasivo (renderizado de fuentes, *canvas*, *audio context*) que identifique navegadores *headless* sin interacción del usuario. Existe una rama *no-JS* en desarrollo que serviría un desafío basado en cookies firmadas y encabezados `Sec-CH-UA`, pero no hay fecha de liberación ni métricas de falsos positivos.

## Lo que no se sabe

- Rendimiento real: latencia media del desafío WASM frente a la versión JS en dispositivos móviles y de escritorio.
- Porcentaje de tráfico bloqueado por falta de soporte WASM o por extensiones de privacidad.
- Cómo se gestiona la rotación de claves y la actualización del módulo WASM sin invalidar sesiones en curso.
- Efectividad del *fingerprinting* planeado frente a *headless* modernos que emulan APIs completas.
