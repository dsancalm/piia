---
title: "Un IDE de Visual Basic 6 funciona entero en el navegador"
summary: "El proyecto compila el runtime y el entorno a WebAssembly, así que abres y editas código VB6 sin instalar Windows 98, Wine ni máquinas virtuales. Aún no se sabe qué parte del lenguaje cubre, si carga proyectos reales con controles OCX ni cuál es su licencia."
lang: es
story: vb6-ide-runs-in-the-browser-via
publishedAt: 2026-10-05T15:16:27.689Z
sourceUrl: "https://wieslawsoltes.github.io/VB6/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [visualbasic, webassembly, legacy, ide]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un IDE completo de Visual Basic 6 funciona ahora dentro del navegador. El proyecto, publicado en GitHub Pages por el usuario wieslawsoltes, ha alcanzado 326 puntos y 104 comentarios en Hacker News. La URL directa es https://wieslawsoltes.github.io/VB6/ y carga la interfaz completa sin instalar nada en el sistema operativo host.

La implicación inmediata es que puedes abrir, editar y probar código VB6 legado desde cualquier máquina con un navegador moderno. No hace falta una máquina virtual con Windows 98 o XP, ni Wine, ni una instalación antigua de Visual Studio. Eso elimina la fricción habitual cuando toca tocar una aplicación de hace veinte años: configurar el entorno, localizar los OCX, registrar controles ActiveX y lidiar con dependencias de 32 bits en un SO de 64 bits.

El proyecto compila el runtime y el propio entorno a WebAssembly. Eso sugiere que el motor de ejecución de VB6 , o un subconjunto funcional, se ha portado a WASM, probablemente mediante Emscripten o una toolchain similar. Lo que no está claro es hasta qué punto cubre el lenguaje: si soporta `Option Explicit`, vinculación tardía, `CreateObject`, colecciones, arrays dinámicos, manejo de errores `On Error GoTo` o la sintaxis de clases (`Class_Initialize`, `Property Let/Get/Set`). Tampoco se sabe si el depurador permite puntos de interrupción, inspección de variables en tiempo de ejecución o la ventana Inmediato.

Otro punto abierto es la carga de proyectos reales. Un proyecto VB6 típico incluye un archivo `.vbp`, varios `.frm` (formularios con binarios incrustados), `.bas` (módulos), `.cls` (clases) y referencias a controles OCX de terceros. El IDE del navegador tendría que parsear el formato binario de los formularios, resolver referencias COM y emular el registro de controles ActiveX. No hay confirmación de que eso funcione hoy.

Tampoco se conoce la licencia, si hay repositorio público con el código fuente, ni el estado del proyecto: *proof-of-concept*, alpha usable o beta estable. El rendimiento comparado con VB6 nativo en hardware de la época , o en una VM moderna, no se ha publicado.

Lo que no se sabe: qué subconjunto del lenguaje y el runtime implementa; si carga y ejecuta proyectos `.vbp/.frm/.bas` completos con controles ActiveX/OCX; qué tecnologías exactas usa bajo el capó; licencia y repositorio de código; estado de madurez y rendimiento real.
