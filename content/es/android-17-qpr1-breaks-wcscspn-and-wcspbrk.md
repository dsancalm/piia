---
title: "Regresión en bionic rompe wcscspn y wcspbrk en Android 17 QPR1"
summary: "Pixel 7 y 8a con la compilación de septiembre de 2026 tratan cualquier carácter ancho >= U+0100 como fin de cadena si el conjunto de rechazo tiene dos o más caracteres ASCII."
lang: es
story: android-17-qpr1-breaks-wcscspn-and-wcspbrk
publishedAt: 2026-10-14T12:25:38.536Z
sourceUrl: "https://github.com/android/ndk/issues/2260"
sourceName: "Hacker News (portada)"
priority: routine
tags: [android, bionic, regression, ndk]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Android 17 QPR1 (compilación CP3A.260905.009 de septiembre de 2026) trae una regresión en bionic: `wcscspn()` y `wcspbrk()` dejan de escanear en cuanto encuentran un carácter ancho >= U+0100 si el conjunto de rechazo tiene dos o más caracteres, todos < U+0100. El fallo afecta a Pixel 7 y Pixel 8a con esa compilación; Nothing Phone 2 en Android 16 no lo sufre.

La implementación que llega al dispositivo usa una tabla booleana de 256 bytes para conjuntos de rechazo formados solo por caracteres < 0x100, pero trata erróneamente cualquier carácter del texto >= 0x100 como coincidencia (condición de parada) en lugar de continuar el escaneo. Un barrido de todos los puntos de código U+0001 a U+10FFFF muestra 1 111 808 puntos (U+0100 a U+10FFFF) que devuelven 0 incorrectamente para `wcscspn(L"<cp>\n", L"x\n")`. Funciones como `wcsspn()`, `wcschr()`, `wcsrchr()`, `wmemchr()` y `wcsstr()` no se ven afectadas.

El impacto real ya se ha visto: Visual Pinball en Android (libwinevbs) fallaba al cargar tablas VBScript con emoji en comentarios; `FileSystem.MoveFolder` trataba rutas con caracteres >= U+0100 como patrones comodín. La solución provisional en el proyecto ha sido reemplazar las llamadas a `wcspbrk` con bucles sencillos (vpinball/libwinevbs#41, incluido en vpinball/vpinball@e7837322f4).

El colaborador de Google enh-google confirmó el bug en ToT, reconoció tests ausentes o incorrectos y planea añadir tests y hacer backport de la corrección. El test existente `TEST(wchar, wcspbrk)` solo usa entrada ASCII; el test de `wcscspn` también está mal (espera 2 para `wcscspn(L"he\ufffelo", L"lo")` pero obtiene 3).

El problema estructural es que las fuentes públicas de android17-release (android-17.0.0_r1, junio 2026) compilan `wcscspn`/`wcspbrk` desde external/llvm-libc y son correctas; la regresión se introdujo entre junio y septiembre. La rama android-latest-release está demasiado vieja para tener los cambios de abril y el código fuente de Android 17 QPR1, que lleva más de un mes en Pixel, no está publicado. Los mantenedores del NDK han tenido que desensamblar `libc.so` del dispositivo (`/apex/com.android.runtime/lib64/bionic/libc.so`) para diagnosticar y reportar el fallo.

```c
#include <stdio.h>
#include <wchar.h>
int main ( void ) {
    wchar_t s [] = { 'a' , 0x1F680 , 0x100 , 'b' , 'x' , '\n' , 0 };
    printf ( "wcscspn(s, L\"x\\n\") = %zu (expected 4)\n" , wcscspn ( s , L"x\n" ));
    printf ( "wcspbrk(s, L\"x\\n\") = index %ld (expected 4)\n" , ( long )( wcspbrk ( s , L"x\n" ) - s ));
    printf ( "wcsspn(s, L\"a\\U0001F680\") = %zu (expected 2)\n" , wcsspn ( s , L"a\U0001F680" ));
    return 0 ;
}
```

Salida en dispositivo afectado:
```
wcscspn(s, L"x\n") = 1 (expected 4)
wcspbrk(s, L"x\n") = index 1 (expected 4)
wcsspn(s, L"a\U0001F680") = 2 (expected 2)
```

Compilación de prueba con NDK r29:
```
aarch64-linux-android30-clang test.c -o test
adb push test /data/local/tmp/
adb shell /data/local/tmp/test
```

Lo que no se sabe:
- Fecha exacta en que se introdujo la regresión entre las versiones de junio y septiembre de 2026.
- Si la corrección se ha hecho backport a los dispositivos afectados o cuándo lo hará.
- Lista completa de dispositivos afectados más allá de Pixel 7, Pixel 8a y Nothing Phone 2.
- Si otras funciones de wide-string en bionic tienen bugs de optimización similares.
- Cronograma de publicación pública de las fuentes de Android 17 QPR1.
- Cómo piensa Google gestionar la transparencia de las fuentes de AOSP en el futuro.
