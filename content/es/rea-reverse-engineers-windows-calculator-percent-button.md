---
title: "REA permite a un agente de código hacer ingeniería inversa de binarios y apps web"
summary: "La herramienta se instala con un solo comando y muestra un plan antes de aplicar cambios. En la calculadora de Windows recuperó la lógica del botón de porcentaje leyendo ensamblador x64; en el dinosaurio de Chrome encontró la regla de aceleración inspeccionando JavaScript..."
lang: es
story: rea-reverse-engineers-windows-calculator-percent-button
publishedAt: 2026-10-10T12:49:58.801Z
sourceUrl: "https://rea.tools/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [ingenieria-inversa, agentes, binarios, javascript]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
REA es una herramienta que permite a un agente de codificación inspeccionar un programa y explicar su funcionamiento mediante ingeniería inversa. Se instala con:

```bash
npx rea-agents@latest setup
```

El comando muestra un plan para aprobación y requiere reiniciar el agente tras la instalación.

La demostración con la Calculadora de Windows (versión 11.2508.4.0, x64) ilustra cómo REA recupera lógica de negocio desde un binario nativo. Al pulsar `200 + 10%` el resultado es 220 porque el botón `%` toma el porcentaje del primer operando: 10 % de 200 = 20, luego suma. REA localizó la DLL y extrajo instrucciones en ensamblador x64 donde los IDs de operador `0x5c` (Multiplicar) y `0x5b` (Dividir) saltan a la misma rutina, mientras que la constante `0x64` (100 decimal) se usa para la división.

```asm
0x180124945: MOV EAX, dword ptr [R13 + 0x18]
0x180124949: CMP EAX, 0x5c
0x18012494c: JZ 0x180124aba
0x180124952: CMP EAX, 0x5b
0x180124955: JZ 0x180124aba
0x18012495b: MOV EDX, 0x64
0x180124960: LEA RCX, [RSP + 0x160]
0x180124968: CALL 0x180122650
...
```

La lógica reconstruida es: si la operación es multiplicar o dividir, `percent = current / 100`; en caso contrario (suma/resta), `percent = current * previous / 100`.

En el juego del dinosaurio de Chrome (edición derivada de Chromium de wayou), REA inspeccionó `index.js` mediante la conexión de depuración local y encontró la regla de aceleración: velocidad inicial 6, incremento de 0.001 por actualización hasta un máximo de 13.

```js
if (this.currentSpeed < this.config.MAX_SPEED) {
  this.currentSpeed += this.config.ACCELERATION;
}
```

Constantes: `ACCELERATION: 0.001`, `MAX_SPEED: 13`, `SPEED: 6`. Tras 4 000 actualizaciones la velocidad llega a 10.0 y tras 10 000 a 13.0 (redondeado a un decimal).

REA soporta tres tipos de análisis: binarios nativos (ejecutables/bibliotecas), JavaScript/Electron (módulos, rutas, IPC, ASAR) y actividad de navegador/runtime (captura y comparación de ejecuciones). La web ofrece una guía de inicio con ejemplo guiado (app Notes), FAQ, Discord y GitHub para issues.

---

### Lo que no se sabe

- Requisitos del sistema y agentes de codificación compatibles (VS Code, Cursor, Zed, etc.).
- Licencia y modelo de precios (gratis, comercial, open source).
- Detalles técnicos de cómo REA se conecta al proceso objetivo (API de depuración, instrumentación, hooks).
- Formatos de salida que devuelve REA al agente (JSON, texto, AST, desensamblado).
- Soporte para arquitecturas distintas de x64 (ARM, ARM64, x86).
- Manejo de código ofuscado, empaquetado o con anti-debugging.
- Privacidad: si se envía código a servidores externos o todo es local.
- Limitaciones en binarios firmados, protegidos o del Windows Store (Calculator es UWP).
- Cómo se especifican símbolos/PDBs para mejorar el análisis.
- Si REA puede modificar el binario en caliente (hot-patching) o solo leer.
