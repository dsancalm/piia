---
title: "Anthropic lanza Claude Haiku 5.5 con un 75 % menos de coste y ajuste de esfuerzo"
summary: "El nuevo modelo pequeño reduce el precio de ejecución frente a Haiku 4.5 y añade un control para priorizar coste o inteligencia. Anthropic también rebaja a la mitad las lecturas de caché de Sonnet 5.5, abaratando un 20 % las cargas agenticas."
lang: es
story: anthropic-releases-claude-haiku-5-5-as
publishedAt: 2026-10-08T13:54:11.492Z
sourceUrl: "https://www.anthropic.com/claude-haiku-5-5"
sourceName: "Hacker News (portada)"
priority: flash
tags: [anthropic, claude, haiku, ia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic ha lanzado Claude Haiku 5.5, su modelo pequeño más barato, rápido y capaz hasta la fecha. Está pensado para tareas de alto volumen sensibles al coste: resúmenes, compactaciones, consultas a bases de datos, clasificación y soporte al cliente en vivo. También funciona como subagente junto a Opus 5.5 y Sonnet 5.5 en flujos de codificación, donde la latencia por turno de agente importa.

El coste medio de ejecución cae un 75 % frente a Haiku 4.5. En paralelo, Anthropic reduce a la mitad el precio de las lecturas de caché de Sonnet 5.5, lo que hace que este modelo sea aproximadamente un 20 % más barato en la mayoría de cargas agenticas. Los suscriptores de los planes Max y Team reciben un crédito mensual de API para construir agentes y aplicaciones en la plataforma Claude, aunque no se ha publicado el importe exacto.

Haiku 5.5 introduce por primera vez en la familia un ajuste de esfuerzo (effort setting) que permite optimizar hacia coste o hacia inteligencia. Los parámetros, niveles y comportamiento concreto de ese ajuste no se han documentado aún.

## Benchmarks publicados

| Benchmark | Haiku 5.5 | Haiku 4.5 | GPT-6 Luna | Sonnet 5.5 |
|---|---:|---:|---:|---:|
| GDPval-AA v2.1 | 1620 | 735 | 1437 | 1840 |
| AA-Briefcase v1.1 | 1578 | 614 | 1336 | 1824 |
| OSWorld 2.1 offline subset | 72,4 % | 15,7 % | 48,9 % | 83,9 % |
| Humanity's Last Exam (sin herramientas) | 45,9 % | 10,2 % | , | 56,9 % |
| Humanity's Last Exam (con herramientas) | 57,4 % | 18,7 % | , | 64,5 % |
| Terminal-Bench 4.0 | 39,2 % | 0,0 % | 16,4 % | 70,6 % |
| FrontierCode 1.1 | 46,4 % | , | 42,4 % | 52,1 % |
| Chartography (sin herramientas) | 46,4 % | 6,4 % | 29,1 % | 61,6 % |

Clientes de acceso temprano (Asana, HubSpot, AlphaSense, Box, Rogo, Cognition) reportan mejoras consistentes. Asana cita una reducción de latencia superior al 30 % y hasta 2,5 veces más velocidad de inferencia por turno de agente.

El identificador de modelo para la API es `claude-haiku-5-5`.

## Lo que no se sabe

- Precio absoluto por millón de tokens de entrada y salida para Haiku 5.5.
- Precio exacto de las lecturas de caché de Sonnet 5.5 tras el recorte.
- Importe del crédito mensual de API para planes Max y Team.
- Fecha de disponibilidad general y regiones soportadas.
- Detalles técnicos del ajuste de esfuerzo (parámetros, niveles Low/Med/High/Xhigh/Max).
- Resultados de GPT-6 Luna en Humanity's Last Exam y FrontierCode (marcados como , ).
- Metodología completa de evaluación (remite a System Card no incluida).
- Límites de tasa, ventana de contexto y soporte de herramientas específicas para Haiku 5.5.
