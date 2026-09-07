---
title: "Austin Z. Henley comprime un intérprete de Python en 1024 bytes de C"
summary: "El código ejecuta un subconjunto real con variables de una letra, bucles, funciones recursivas y precedencia de operadores sin construir AST ni bytecode, reanalizando el buffer en cada iteración."
lang: es
story: python-interpreter-fits-in-1-kib-of
publishedAt: 2026-09-07T12:52:20.119Z
sourceUrl: "https://austinhenley.com/blog/python1024.html"
sourceName: "Hacker News (portada)"
priority: flash
tags: [python, c, codegolf, intérprete]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Austin Z. Henley ha publicado un intérprete de Python completo en 1024 bytes de código C, tras no conseguir comprimirlo en 512. El resultado ejecuta un subconjunto real del lenguaje: variables de una letra, aritmética con precedencia, comparaciones, estructuras `if/else`, bucles `while` y `for-in-range` con bloques `else`, funciones recursivas, impresión y comentarios. El analizador es de descenso recursivo y evalúa sobre la marcha sin construir AST ni bytecode.

El estado cabe en cuatro variables globales: un buffer de 999 caracteres para el fuente, una tabla de 256 enteros para las variables, y punteros de posición y línea. Los bucles y las llamadas a función funcionan saltando hacia atrás en el propio buffer y re-analizando cada iteración, apoyándose en la pila de C para la recursión. La versión legible supera los 4.800 bytes; la golfada recurre a C89 implícito, nombres de una letra, operadores ternarios y de coma, y literales ASCII en lugar de caracteres.

```c
char src[999];
int vars[256];
int pos, ch, line_start;

int parse_sum(void) {
    int value = parse_term();
    while (ch == '+' || ch == '-') {
        if (ch == '+') value = value + parse_term();
        else value = value - parse_term();
    }
    return value;
}

if (ch > 96) {
    value = vars[ch];
    next();
}
```

El intérprete ejecuta FizzBuzz sin espacios superfluos:

```
def buzz():
for n in range(101):
if n % 15 == 0:
print("FizzBuzz")
else:
if n % 3 == 0:
print("Fizz")
else:
if n % 5 == 0:
print("Buzz")
else:
print(n)
buzz()
```

La detección de variables usa el rango ASCII: `ch > 96` identifica minúsculas. La precedencia se resuelve encadenando `parse_sum`, `parse_term` y `parse_factor`. No hay manejo de errores: una entrada malformada provoca comportamiento indefinido.

Lo que no se sabe: rendimiento comparado con CPython u otros micro-intérpretes, límites exactos de profundidad de recursión, comportamiento con tabulaciones frente a espacios, y si compila limpio en MSVC sin extensiones GNU.
