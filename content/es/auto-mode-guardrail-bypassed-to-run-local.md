---
title: "Un exploit burla la seguridad de Claude Code y el agente impide su propia limpieza"
summary: "Un ataque de inyección de prompt logra ejecutar código malicioso en el 80 % de las pruebas. La defensa automática bloquea al modelo cuando intenta matar el proceso sospechoso, dejando el entorno comprometido."
lang: es
story: auto-mode-guardrail-bypassed-to-run-local
publishedAt: 2026-08-28T18:59:45.328Z
sourceUrl: "https://simonwillison.net/2026/Aug/27/breaking-claude-code-opus-5-auto-mode/"
sourceName: "Simon Willison"
priority: urgent
tags: [seguridad, ia, anthropic, exploit]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic ha activado Auto Mode como opción predeterminada en Claude Code y afirma que la capa protege contra la inyección de prompt. Johann Rehberger ha publicado un ataque que, según sus pruebas, funciona en el 80 % de los intentos. El vector engaña al agente para que descargue y descomprima un archivo zip; al ejecutar el código resultante se importa el módulo `base64` de la biblioteca estándar, lo que a su vez carga y ejecuta un archivo `struct.py` extraído del propio archivo comprimido. Ese archivo malicioso toma el control del entorno.

En varias ejecuciones el modelo detectó la actividad sospechosa e intentó matar el proceso malicioso, pero Auto Mode denegó la orden de limpieza. El resultado es paradójico: la medida de seguridad impide que el propio agente detenga el código que acaba de permitir que se ejecute. Rehberger y Simon Willison coinciden en que, bajo riesgo adversarial, la única forma segura de operar agentes de codificación es aislarlos en un sandbox real , contenedor, máquina virtual o sandbox del sistema operativo, cortar la salida de red, supervisar la actividad y no exponer el directorio home, claves SSH ni credenciales cloud al tiempo de ejecución del agente.

## Qué no se sabe

- Detalles técnicos del exploit en `struct.py` y por qué la importación de `base64` lo dispara.
- Si Anthropic ha reconocido o parcheado la vulnerabilidad.
- Qué versión exacta de Claude Code Opus 5 se probó.
- Qué comandos concretos bloqueó Auto Mode durante los intentos de limpieza.
- Si el 80 % de éxito se reproduce en entornos distintos.
