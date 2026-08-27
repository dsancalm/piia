---
title: "InfluxDB usó IA para escribir un millón de líneas en su motor IOx"
summary: "Paul Dix asegura que su equipo generó y refinó ese código durante meses hasta lograr un motor de consulta fiable en producción. No se revela el modelo ni el proceso de verificación, pero la escala supera los ejemplos habituales de asistencia por LLM."
lang: es
story: influxdata-cto-says-ai-wrote-one-million
publishedAt: 2026-08-27T17:54:58.388Z
sourceUrl: "https://simonwillison.net/2026/Aug/26/paul-dix/"
sourceName: "Simon Willison"
priority: routine
tags: [influxdb, ia, programacion, iox]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Paul Dix, cofundador y CTO de InfluxDB, dice que su equipo usó IA para escribir un millón de líneas de código y refinarlo durante meses hasta lograr un software fiable que corre en millones de máquinas. El anuncio apareció en el blog de Simon Willison el 26 de agosto de 2026. No nombra el sistema de IA ni explica cómo verificaron el resultado, pero Dix sostiene que tener un "oráculo" para comparar salidas no quita mérito al logro.

El caso es IOx, el motor de consulta de InfluxDB. Sirve de prueba de que la programación asistida por LLM ya no se queda en autocompletar funciones o sacar scripts pequeños. Aquí la IA intervino en la escritura y el refinamiento continuo de una pieza crítica de una base de datos de series temporales que usan millones de desarrolladores. Dix argumenta que, con un buen sistema de verificación y una dirección clara, la IA puede producir software complejo y sofisticado y persistir en su mejora hasta que funciona.

No se sabe cómo se verificaba cada cambio, qué papel tenían los humanos en la revisión, ni si el millón de líneas pertenece a un solo proyecto o a varios. Tampoco se aclara si la IA trabajó de forma autónoma o en estrecha colaboración con ingenieros. El post original de Dix, "The end of programming", no está en la fuente, así que el razonamiento completo queda fuera.

Lo que está claro es la escala: trabajo en producción, sobre un producto real, con millones de usuarios. Es significativamente mayor que lo que suele verse en ejemplos de IA para programar. Si en el futuro se publican los detalles del sistema de verificación y el rol humano, podrían servir de referencia a otros equipos que quieran replicar el proceso. Por ahora, el caso de InfluxDB/IOx es un dato, no una receta.
