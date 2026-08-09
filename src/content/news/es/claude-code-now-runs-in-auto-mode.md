---
title: "Claude Code activa el modo automático por defecto el 14 de agosto"
summary: "Anthropic cambia la configuración de Claude Code para que el modelo ejecute acciones sin pedir permiso, basándose en un estudio donde solo el 13,6% de los humanos rechazó comandos dañinos. La decisión preocupa por la inyección indirecta de prompts."
lang: es
story: claude-code-now-runs-in-auto-mode
publishedAt: 2026-08-09T07:32:13.622Z
sourceUrl: "https://simonwillison.net/2026/Aug/8/auto-mode/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [claude, seguridad, ia, actualización]
generatedBy: deepseek/deepseek-v4-flash-0731
---
El cambio llega el 14 de agosto. Auto mode pasa a ser la configuración por defecto en nuevas sesiones de Claude Code para los planes Pro, Max y Team. Hasta ahora, el modo por defecto pedía confirmación antes de ejecutar comandos sensibles. A partir de esa fecha, el modelo decide solo si una acción es segura o no.

Anthropic justifica el cambio con dos evaluaciones. La primera, un experimento con 1.053 testers pagados donde se sustituyó un aviso de permiso por un comando peligroso. Solo el 13,6% de los humanos rechazó la acción dañina. Auto mode habría bloqueado el 89% de esas acciones. La segunda, encargada a Trajectory Labs, probó 72 escenarios de inyección indirecta de prompts. Ninguno de los 720 intentos de ataque tuvo éxito contra Claude Fable 5, Opus 5 o Sonnet 5 ejecutando auto mode.

El argumento de Anthropic es que los humanos son peor freno que el propio modelo. Los datos de su experimento lo apoyan, pero la muestra es pequeña y el escenario artificial. Un programador con contexto sobre su propio código probablemente rechace más del 13,6% de las acciones dañinas. La cifra real de acierto humano en condiciones normales no aparece en la fuente.

La preocupación para quien usa Claude Code es la inyección indirecta. Un paquete malicioso, un archivo README o una salida de compilación pueden contener instrucciones ocultas que el modelo procesa sin que tú las veas. Auto mode elimina la confirmación humana justo en el punto donde antes podías detectar algo raro. Anthropic afirma que sus modelos resisten esos ataques, pero la evaluación de Trajectory Labs no está publicada en detalle.

Si trabajas con dependencias de terceros o código que no has escrito tú, el cambio te afecta más. El modo por defecto ya no te va a preguntar antes de ejecutar. Puedes volver al modo anterior en la configuración de tu sesión o en tu archivo de configuración.

Para ejecutar la suite de pruebas que usa Anthropic en sus evaluaciones, primero hay que descargar los archivos del modelo y luego lanzar pytest:

```
uvx fetch-model-files .
uv run pytest
```

El comando `fetch-model-files` es una herramienta de uv que descarga los archivos necesarios para reproducir los tests. No hay más detalles en la fuente sobre qué pruebas incluye esa suite.

No se sabe cuándo publicará Anthropic las evaluaciones completas, ni cómo responde auto mode a ataques que le ordenen ejecutar comandos a través de paquetes maliciosos. Tampoco hay confirmación independiente de las cifras de Trajectory Labs. Si usas Claude Code, revisa la configuración de tu sesión antes del 14 de agosto si prefieres mantener la confirmación manual.
