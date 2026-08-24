---
title: "Chicken Scheme 6.0.0 cambia cadenas a UTF-8 y rompe APIs antiguas"
summary: "La nueva versión migra las cadenas a UTF-8, reorganiza la E/S y los módulos, y elimina funciones obsoletas. Si usabas read-u8vector o #${...}, tendrás que actualizar tu código."
lang: es
story: chicken-scheme-6-beta-rewrites-runtime-modules
publishedAt: 2026-08-11T07:49:26.210Z
sourceUrl: "https://code.call-cc.org/releases/6.0.0/NEWS"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [scheme, lanzamiento, utf-8, api]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Chicken Scheme 6.0.0 ya está disponible, y la lista de cambios es larga. La versión más visible para quien escribe Scheme es la migración interna a UTF-8. Las cadenas dejan de ser secuencias de bytes y los locativos en cadenas se indexan por code-point, no por byte. Eso afecta a cualquier código que asumiera que un carácter ocupaba una posición.

La API de entrada y salida también se ha reorganizado. Los antiguos `read-u8vector`, `read-u8vector!` y `write-u8vector` desaparecen, reemplazados por `read-bytevector`, `read-bytevector!` y `write-bytevector` en `(chicken io)`. El módulo `(chicken blob)` deja de existir como tal y pasa a ser `(chicken bytevector)`. La sintaxis de lectura `#${...}` para blobs se ha eliminado. Si tenías código que la usaba, tendrás que migrarlo.

```scheme
;; Antes
(read-u8vector 10 port)

;; Ahora
(read-bytevector 10 port)
```

La gestión de procesos cambia de forma. `process-fork`, `process-run`, `process` y `process*` ya no devuelven un PID, sino un objeto de proceso. Si tu código comparaba el resultado con un número, se rompe. Las operaciones de bloqueo de archivos en `(chicken file posix)` ahora usan `flock(2)`, lo que cambia el comportamiento en sistemas donde antes se usaba `fcntl`.

Los cambios en la impresión de símbolos son sutiles pero pueden alterar salidas. `symbol-escape` controla ahora si los símbolos se imprimen en modo escapado, y la decisión de cuándo escapar es más estricta. Las secuencias de escape hexadecimales en cadenas y símbolos extendidos deben terminar con `;`. Las sintaxis de lectura `#ci` y `#cs` se han eliminado; se usan los marcadores `#![no-]fold-case`.

La alineación con R7RS continúa. Varias primitivas se han movido de `(chicken base)` a módulos R7RS, y los módulos `r4rs`, `r5rs`, `r4rs-null` y `r5rs-null` se han renombrado a `(scheme XXX)`. Los alias de módulo para `srfi-0`, `srfi-6`, `srfi-9`, `srfi-11`, `srfi-23`, `srfi-39` y `srfi-98` se han eliminado. `syntax-error` ya no está en `(chicken syntax)`, ahora es una macro en `(scheme base)`.

La opción `-r5rs-syntax` se ha renombrado a `-r7rs-syntax` y ya no deshabilita la sintaxis de símbolos extendidos. El depurador `feathers` ha salido del núcleo y ahora es un egg. En Windows, la compilación mínima con mingw ya no se soporta: necesitas un shell POSIX y utilidades básicas de línea de comandos. El sistema se puede construir con `zig cc` como reemplazo del compilador C.

También hay cambios de seguridad. Se corrigió CVE-2022-45145, que permitía inyección de comandos a través de metadatos de egg durante la instalación. La opción de runtime `-:b` se ha eliminado por insegura, y el procesamiento de opciones de runtime se detiene en la primera opción que no sea de runtime.

## Lo que no se sabe

La fecha exacta de lanzamiento no aparece en la fuente. Tampoco se detallan los cambios en la API de señales POSIX más allá de la nueva función `make-signal-handler`. No se especifican mejoras de rendimiento, cambios en la gestión de memoria ni en el sistema de tipos. Los requisitos exactos del sistema para la compilación no se concretan, más allá de la necesidad de un shell POSIX en Windows.
