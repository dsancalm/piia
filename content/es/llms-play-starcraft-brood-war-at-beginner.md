---
title: "Los mejores modelos de IA solo alcanzan nivel principiante en StarCraft Brood War"
summary: "Codex Astra xhigh gana el 100 % de sus 18 partidas, pero ningún modelo supera a un humano novato. El benchmark revela que los agentes ganan con ataques caóticos tempranos y subagentes descoordinados, no con estrategia."
lang: es
story: llms-play-starcraft-brood-war-at-beginner
publishedAt: 2026-09-20T11:51:57.221Z
sourceUrl: "https://bw.swerdlow.dev/report"
sourceName: "Hacker News (portada)"
priority: routine
tags: [ia, starcraft, benchmark, codex]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Brood War Bench ha publicado los primeros resultados comparativos de modelos de lenguaje grande jugando partidas completas de StarCraft: Brood War. El entorno es determinista, abierto y permite reproducir cada partida con las mismas condiciones. Ningún modelo superó el nivel de un principiante humano, pero las diferencias entre configuraciones son lo suficientemente grandes como para servir de referencia a quien investiga agentes de larga duración.

Codex Astra en su configuración xhigh ganó las 18 partidas que disputó (100 % de victorias) con 12,6 acciones por minuto y un coste de 10,54 dólares por partida. La misma familia en configuración medium quedó segunda con 88,9 % de victorias (16-2), 17,2 APM y 15,11 dólares por partida. Claude Fable cerró el podio con 83,3 % (15-3), 12,6 APM y 12,24 dólares. En el extremo opuesto, Grok 4.6 en sus tres configuraciones y Claude Haiku no ganaron ninguna partida; Haiku apenas alcanzó 0,3 APM.

## Comportamiento emergente y arquitectura de subagentes

Los modelos Codex tienden a estrategias de *cheese*: ataques tempranos con trabajadores o sondas en lugar de desarrollar economía y ejército tardío. Internamente, Codex crea subagentes separados para economía, producción y control militar que apenas se comunican. El resultado son oleadas de unidades enviadas de una en una sin coordinación. En la partida G009, Codex 5.6 Terra / medium movió su último Command Center a una esquina del mapa y sobrevivió seis minutos extra tras perder base y ejército principal, lo que sugiere cierta capacidad de evasión desesperada pero nula planificación estratégica.

## Coste, APM y escalado

Existe una correlación inversa entre configuración y APM en la familia Codex 5.6: a mayor nivel (xhigh), menor APM y menor coste por partida, pero también menor tasa de victoria. Codex 5.6 Luna / xhigh ganó solo el 38,9 % con 5,2 APM y 0,16 dólares por partida, mientras que su versión low empató al 50 % con 23,8 APM y 0,42 dólares. El coste total del experimento y el presupuesto por modelo no se han publicado.

## Lo que no se sabe

- Número exacto de partidas por entrada (solo se muestran W/L, aunque se infieren 18-20).
- Identidad precisa de "Codex 5.6 Sol/Luna/Terra" y "Codex Astra" (versiones, fechas, proveedores).
- Qué parámetros controlan los niveles xhigh/medium/low (sampling, compute, herramientas).
- Mapas, matchups de razas (PvT, ZvZ, etc.) y condiciones de victoria/derrota del benchmark.
- Arquitectura de los subagentes de Codex: prompts, herramientas, memoria, coordinación.
- Causa del mal rendimiento de Grok 4.6 (limitaciones del modelo, incompatibilidad con la interfaz de agente, etc.).
- Si el benchmark sigue activo y acepta nuevos modelos.
- Código fuente del entorno "Brood War solo para agentes" y del harness de evaluación.
