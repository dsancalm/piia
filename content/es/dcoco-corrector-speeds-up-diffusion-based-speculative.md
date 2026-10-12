---
title: "DCOCO acelera la inferencia con un corrector paralelo para drafters de difusión"
summary: "Investigadores presentan DCOCO, un módulo ligero que filtra candidatos de drafters como DFlash en un solo paso paralelo, elevando el throughput hasta un 23% frente a la competencia y 6,6× sobre decoding estándar sin reentrenar modelos."
lang: es
story: dcoco-corrector-speeds-up-diffusion-based-speculative
publishedAt: 2026-10-12T15:54:34.935Z
sourceUrl: "https://arxiv.org/abs/2610.12570"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [inferencia, difusion, llm, aceleracion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Los drafters basados en difusión como DFlash generan varios tokens futuros a la vez, pero cada posición se predice sin conocer qué tokens reales ocupan las posiciones anteriores del mismo bloque. Esa independencia rompe dependencias locales y obliga al modelo verificador a rechazar más a menudo, lo que reduce la longitud media aceptada y frena el throughput.

DCOCO (DFlash Contextual Corrector) resuelve el problema sin volver a la corrección secuencial. El mecanismo retiene varios candidatos por posición y, en un solo paso paralelo, puntúa la compatibilidad contextual entre candidatos de posiciones adyacentes. Solo los pares compatibles sobreviven; el resto se descarta antes de llegar al verificador. El corrector es ligero: se ejecuta en la misma GPU, añade una pasada de atención reducida sobre el conjunto de candidatos y no requiere reentrenar ni el drafter ni el verificador.

Los autores evalúan cuatro backbones de verificación distintos y diez benchmarks, cubriendo decoding greedy, estocástico y con razonamiento extendido. En todas las configuraciones DCOCO alcanza el mayor throughput promedio. Bajo carga concurrente (4‑32 peticiones simultáneas) supera al competidor más fuerte entre un 6% y un 23%, mientras que los correctores secuenciales caen por debajo del DFlash sin corregir. El speedup máximo frente a decoding vanilla llega a 6.6×.

El artículo (arXiv:2610.12570v1, 8 de octubre de 2026) lo firman Roy Eisenstadt, Harel Lidar, Tal Gonen, Omer Luxembourg, Itamar Zimerman, Lior Wolf, Eli David e Ilan Naiman.

---

### Lo que no se sabe

- Cuáles son los cuatro backbones de verificación y los diez benchmarks concretos.
- Arquitectura exacta, número de parámetros y overhead de memoria de DCOCO.
- Latencia añadida por el corrector y configuraciones de hardware (GPU, VRAM, batch sizes) usadas en los experimentos.
- Número de candidatos retenidos por posición y función de scoring empleada.
- Resultados desglosados por benchmark y modo de decoding.
- Disponibilidad futura de código y modelos, y bajo qué licencia.
