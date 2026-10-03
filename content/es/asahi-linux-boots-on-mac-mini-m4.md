---
title: "Asahi Linux en Mac mini M4: arranque parcial con m1n1 y kernel"
summary: "Tras superar SPTM, inicialización de GXF y problemas de MMU, se logró arrancar un kernel Asahi en el Mac mini M4 con earlycon y todos los núcleos. Quedan por resolver WFI en M4 y el driver cpuidle."
lang: es
story: asahi-linux-boots-on-mac-mini-m4
publishedAt: 2026-10-03T12:05:59.068Z
sourceUrl: "https://yuka.dev/blog-2026-10-02-linux-m4.html"
sourceName: "Hacker News (portada)"
priority: routine
tags: [asahi, m1n1, macos, m4]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Compraste un Mac mini M4 en noviembre de 2024 pensando que Asahi Linux avanzaría rápido. El primer escollo fue SPTM (Secure Page Table Monitor), un endurecimiento del kernel XNU que estrena la generación M4 y obliga a reescribir m1n1 para ejecutar macOS bajo el hipervisor y trazar accesos MMIO. La solución práctica fue desactivar la seguridad de arranque estricta desde macOS Recovery, instalar m1n1 como objeto de arranque personalizado y obtener consola serie.

En M4, m1n1 solo arranca en modo BRINGUP. La inicialización de GXF falla porque está bloqueada en arranque raw, así que se hizo condicional y se omitió. Escribir en RVBAR provocaba crash, pero el registro ya contenía el valor correcto; bastó con no tocarlo. El 1 de diciembre de 2024 a las 17:37 se confirmó proxy USB funcional:

```
2024-12-01 17:37 <yuka> can confirm this state gives a working usb proxy, as in a "Generic m1n1 uartproxy v1.4.17-61-ga24ff77" turns up in lsusb, and I can open a shell :)
```

En el Chaos Communication Congress de finales de 2025 se retomó el trabajo. Se logró arrancar un kernel mínimo con earlycon, pero la salida se cortaba en "Vectoring to next stage". Usando debug_putc de m1n1 adaptado para imprimir un carácter y bisectando, el fallo quedó en la inicialización de la MMU en `arch/arm64/kernel/head.S`. La MMU habilitada rompía el acceso al UART por MMIO porque Linux no crea mapeo 1:1 del espacio MMIO como hace m1n1; añadir ese mapeo en las tablas de páginas iniciales permitió avanzar.

Nuevo crash al escribir en `SYS_IMP_APL_VM_TMR_FIQ_ENA_EL2` durante la inicialización del controlador de interrupciones. Comentar la escritura permitió llegar a shell. Ese registro se desbloqueó en nuevas versiones de iBoot, por lo que el workaround ya no es necesario.

El 23 de enero de 2026 a las 12:35 se añadió `earlycon=s5l,0x3ad200000` a los argumentos de arranque y a las 12:36 se obtuvo salida útil antes del crash. Faltaba `stdout-path = "serial0"` en el device tree; al añadirlo aparecieron volcados de registros y trazas de pila en crashes tempranos.

m1n1 no arrancaba núcleos secundarios por falta de `smp_start_offset`; usando el offset de M1-M3 se lograron iniciar. En M1-M3, un bit "chicken" (`ARM64_REG_CYC_OVRD_ok2pwrdn_force_mask`) hace que WFI borre registros x0-x31; XNU los guarda y restaura, m1n1 lo desactiva y el kernel Asahi lo reactiva para estados de sueño profundos y boost de frecuencia. En M4 ese bit parece bloqueado o eliminado y el comportamiento por defecto no cumple la especificación ARM64: WFI no debe perder estado arquitectural.

En abril de 2026 se logró arranque con todos los núcleos sustituyendo WFI y WFIT por NOP en el kernel. Se descartó el framework de erratas del kernel por la dificultad de detectar cuándo NOP-ear WFI (por ejemplo, una VM bajo hipervisor macOS atrapa WFI para scheduling). Will Deacon propuso un bootarg para desactivar WFI idle; m1n1 lo añade condicionalmente en bare-metal con WFI roto. Mientras tanto, el driver downstream `cpuidle-apple` gestiona estados de sueño; el trabajo PSCI EFI conduit de Sven apunta a solución upstream futura.

El mecanismo para evitar crashes por WFI/WFIT ya está fusionado en mainline Linux y en m1n1, permitiendo arranque nativo con núcleos secundarios en Macs M4. Los mismos workarounds funcionan en M4 Pro, M4 Max y chips M5. La ingeniería inversa de periféricos avanza lento pero constante; el trabajo de Sven en el hipervisor m1n1 para arrancar y trazar macOS ayudará con cámara, controlador de pantalla e inicialización de GPU.

## Qué no se sabe

- Versión exacta de iBoot que desbloquea `SYS_IMP_APL_VM_TMR_FIQ_ENA_EL2`.
- Detalles de la implementación del bootarg para desactivar WFI idle (nombre, valores).
- Estado actual y calendario del trabajo PSCI EFI conduit de Sven para cpuidle upstream.
- Progreso y cronograma de la ingeniería inversa de cámara, display controller y GPU.
- Si el workaround de WFI/NOP afecta al consumo energético o rendimiento en M4 Pro/Max/M5.
- Fecha de liberación de las versiones de mainline Linux y m1n1 que incluyen el fix de WFI.
