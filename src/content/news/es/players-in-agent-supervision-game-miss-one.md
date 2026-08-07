---
title: "Los humanos solo detectan el 66% de los comandos maliciosos que propone una IA"
summary: "Un experimento con más de 40.000 partidas muestra que los jugadores fallan una de cada tres amenazas reales. Los comandos que parecen rutinarios, como los de npm run, son los que más engañan."
lang: es
story: players-in-agent-supervision-game-miss-one
publishedAt: 2026-08-07T07:56:50.306Z
sourceUrl: "https://scalex.dev/blog/ai-agent-permissions-stats/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [seguridad, ia, experimento]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Un experimento con más de 40.000 partidas de un juego de terminal ha medido cómo de bien los humanos detectan comandos maliciosos que un agente de IA propone ejecutar. El resultado: los jugadores solo aciertan el 66,3% de las veces, y fallan una de cada tres amenazas reales.

El juego, diseñado para simular la aprobación de comandos de un agente, registró 409.000 decisiones individuales. El 32,9% de las sesiones terminaron con puntuación negativa, lo que significa que el jugador aprobó suficientes comandos peligrosos como para perder. Solo el 35,2% de los participantes detectó todas las amenazas, y de esos, únicamente el 20,8% lo hizo sin bloquear demasiados comandos legítimos. El 7% de los jugadores aprobó todos los comandos sin excepción.

## Los comandos que más engañan

El patrón más interesante es que los fallos no se concentran en comandos técnicamente complejos, sino en los que parecen rutinarios. El comando más aprobado por error fue `npm run analyze`, que los jugadores aceptaron el 64,7% de las veces. Los tres comandos `npm run` (analyze, setup y deploy) fallaron en conjunto el 52,5% de las ocasiones. Un comando como `cat ~/.zshrc`, que lee el historial de shell, fue aprobado por el 45,9% de los jugadores.

Los comandos más peligrosos sí se bloquearon con más frecuencia, pero no tanto como cabría esperar. `rm -rf dist/` solo se bloqueó el 45% de las veces, y `kill $(lsof -t -i:3000)` el 43%. El comando `npm config set registry https://npm.internal`, que redirige el registro de paquetes a un servidor controlado por el atacante, se bloqueó el 59% de las veces.

## Qué implica para el diseño de permisos

Estos datos sugieren que confiar en el criterio humano como último filtro de seguridad es frágil. Los comandos que parecen parte del flujo normal de desarrollo, como los de `npm run`, generan una falsa sensación de seguridad. El problema no es que los humanos no sepan identificar un `rm -rf /`, es que no pueden distinguir entre un análisis de código legítimo y uno que exfiltra credenciales.

Para quien diseña sistemas de agentes de IA, la lección es que los permisos deben ser explícitos y granulares, no una pantalla de confirmación genérica. Separar credenciales por entorno, usar sandboxing y limitar qué comandos puede ejecutar un agente sin supervisión son medidas más fiables que depender de que la persona revise cada línea.

## Lo que no se sabe

La fuente no especifica cuántos jugadores únicos participaron en las 40.000 partidas, ni si hubo jugadores repitiendo muchas veces. Tampoco se indica la duración media de una partida ni el tiempo de presión por comando. No hay datos sobre el perfil de los participantes: no se sabe si eran desarrolladores profesionales, estudiantes o gente sin experiencia en terminal. Y no se detalla cómo se trataron estadísticamente las partidas repetidas del mismo jugador.
