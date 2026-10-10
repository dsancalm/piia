---
title: "Telegram Desktop roba cuentas con un clic hasta la versión 7.2.8"
summary: "Un fallo en el manejo de enlaces tg:// permite inyectar comandos que leen archivos locales y los envían a un chat del atacante sin pedir confirmación. La versión 7.2.9 ya corrige el problema."
lang: es
story: telegram-desktop-flaw-lets-attackers-steal-files
publishedAt: 2026-10-10T12:47:57.497Z
sourceUrl: "https://beaksec.github.io/posts/telegram-desktop-one-click-account-takeover/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [telegram, vulnerabilidad, seguridad, escritorio]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Una vulnerabilidad crítica en Telegram Desktop permite el robo de cuentas con un solo clic. Las versiones hasta la 7.2.8 están afectadas por CVE-2026-107181, con una puntuación CVSS 3.1 de 8.1 (High). El fallo permite la lectura y exfiltración remota de archivos locales arbitrarios hacia un chat controlado por el atacante. La corrección llegó en la versión 7.2.9 (commit `db3405699f`).

## Mecanismo técnico: inyección en el IPC de instancia única

Telegram Desktop usa un *socket* local para pasar URLs a una instancia ya en ejecución. El problema está en el separador: un punto y coma sin escapar. Al deserializar los comandos recibidos, el código en `sandbox.cpp` divide la cadena por `;`:

```cpp
// sandbox.cpp:453-463 (abreviado)
for ( int32 to = cmds . indexOf ( QChar ( ';' ), from ); to >= from ; ... ) {
    auto cmd = base :: StringViewMid ( cmds , from , to - from );
    ...
    } else if ( cmd . startsWith ( u"OPEN:" _q )) {
        startUrls . append ( cmds . mid ( from + 5 , to - from - 5 ). mid ( 0 , 8192 ));
```

Un enlace `tg://` malicioso que contenga un punto y coma inyecta un segundo comando `OPEN:` en la instancia víctima. Ese comando alcanza el esquema interno `interpret:`, diseñado originalmente para la publicación automatizada de versiones (`Telegram/build/updates.py`). Este esquema lee un archivo de instrucciones local y envía su contenido a un chat **sin comprobaciones de autorización ni confirmación del usuario**.

## Cadena de explotación completa

1. El atacante envía un archivo de instrucciones (hasta 8 MiB) a un grupo. Telegram Desktop lo descarga automáticamente a una ruta predecible en Windows: `C:\Users\<usuario>\Downloads\Telegram Desktop\<nombre_archivo>`.
2. La víctima hace clic en un enlace `tg://`造ado, por ejemplo: `tg://x?a=1;OPEN:interpret:...`.
3. El punto y coma rompe el *parsing* y ejecuta `OPEN:interpret:` apuntando al archivo descargado.
4. El archivo de instrucciones especifica qué archivo robar (ej. `tdata` o `key_datas` para sesión) y el `channel:` destino de la exfiltración.

Ejemplo de vector de inyección crudo:
```
OPEN:tg://x?a=1;CMD:quit
```

## Qué no se sabe

- Si Linux y macOS son igualmente vulnerables (solo se confirma Windows, versión 6.9.3).
- Rutas exactas de descarga automática en Linux y macOS para colocar el archivo de instrucciones.
- Si el campo `from:` en el archivo de instrucciones es obligatorio (el texto indica que la comprobación solo se ejecuta si la línea está presente).
- Si la víctima debe ser miembro del `channel:` destino para que la exfiltración funcione.
- Si la 7.2.9 mitiga la inyección IPC en sí o solo bloquea la exposición del esquema `interpret:`.
- Cronología completa de divulgación y despliegue más allá de las fechas publicadas (3 y 7 de octubre de 2026).
