---
title: "Claude Code activa el modo auto por defecto tras un experimento con 1053 evaluadores"
summary: "El 14 de agosto, el modo auto de Claude Code bloquea comandos peligrosos de forma automática para los planes Pro, Max y Team. Anthropic lo justifica con un experimento en el que su clasificador detectó el 89% de los comandos dañinos frente al 13,6% de los humanos."
lang: es
story: auto-mode-is-now-default-in-claude
publishedAt: 2026-08-10T08:16:22.194Z
sourceUrl: "https://claude.com/blog/auto-mode-default-in-claude-code"
sourceName: "Hacker News (portada)"
priority: flash
tags: [claude-code, seguridad, permissions, anthropic]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Claude Code cambia su comportamiento por defecto el 14 de agosto. El modo auto, que clasifica y bloquea comandos peligrosos antes de ejecutarlos, pasa a ser la opción activa para los planes Pro, Max y Team. Para Enterprise, la API y las plataformas en la nube sigue siendo opcional, con activación manual.

Anthropic justifica el cambio con un experimento controlado con 1.053 evaluadores profesionales pagados. Los humanos detectaron el 13,6% de los comandos peligrosos. El clasificador de auto mode bloqueó el 89%. En números absolutos: 937 de 1.053 frente a 143. El clasificador bloqueó 800 comandos que un humano había aprobado. Los humanos bloquearon 6 que el clasificador dejó pasar.

Hay un dato que pesa más que la precisión del clasificador: el 62% de los usuarios ha usado `bypassPermissions` o ha pulsado "no preguntar de nuevo" en Bash. El 25% de las sesiones interactivas empiezan directamente en modo bypass. La aprobación de permisos es casi automática: el 97% de las solicitudes se aceptan. Los usuarios han creado reglas amplias como `Bash(python:*)` o `Bash(node:*)` en el 43% de los casos, y el 5% permite cualquier comando de shell. Con esos hábitos, el filtro humano no filtra casi nada.

Los números de seguridad en sesiones reales lo confirman. En severidad de producción (nivel 7 o superior), el 6,3% de las sesiones con aprobación manual contenía una acción dañina que el usuario no había pedido explícitamente. En auto mode, el 2,4%. El clasificador se endureció con Apollo Research y su tasa de fallos bajó del 12% al 7%.

Los usuarios de auto mode en Teams y Enterprise envían un 25% más de pull requests. Ese dato sugiere que menos interrupciones se traducen en más trabajo terminado, aunque no demuestra causalidad.

Si usas reglas amplias como `Bash(python:*)`, ten en cuenta que auto mode las deja de lado temporalmente. Siguen existiendo, pero el clasificador se aplica antes. Puedes volver al modo anterior o cambiar los valores por defecto.

```bash
claude config set --global autoMode off
```

También puedes mantener las reglas y desactivar el clasificador por sesión con `bypassPermissions`.

## Lo que no se sabe

La fecha exacta en que auto mode será el valor por defecto en Enterprise y las plataformas en la nube, solo se dice "en el próximo mes". Los datos internos de red-teaming y pruebas de penetración de terceros se resumen en resultados agregados, sin desglose. No se publican los nombres de las organizaciones de red-teaming salvo Apollo Research. El coste del clasificador en tokens por llamada se describe como "un pequeño número de tokens extra", sin cifra exacta. Tampoco se detallan las reglas de manejo de datos aplicadas en el endurecimiento.
