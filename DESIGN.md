# Design

<!-- impeccable:design-schema 1 -->

Registrado desde el mundo construido, no desde la intención. Si el código y este
archivo discrepan, manda el código.

## Mundo

Un fanzine técnico fotocopiado. Papel crema con hebra de pulpa, tinta negra de
rotulador y tres subrayadores planos pasados a mano. Rechaza explícitamente la
retícula de tarjetas oscuras con etiqueta monoespaciada que envía cualquier blog
de IA.

Semilla de dirección: `fa142f91`. El dado asignó "teletipo de agencia"; el
usuario eligió el retador de catálogo `hand-drawn-zine-explainer`, y una elección
del usuario manda sobre la tirada.

## Color

Estrategia: paleta completa con tres roles señalizados. Ninguno decora.

| Token | Valor | Papel |
|---|---|---|
| `--paper` | `#FFF8EC` | Suelo de todo el sitio |
| `--paper-deep` | `#F5ECD8` | Papel pegado encima (recuadro de procedencia, código en línea) |
| `--ink` | `#111111` | Texto y trazo. 17.3:1 sobre papel |
| `--ink-soft` | `#4A4438` | Texto secundario, tintado desde el papel y no gris. 8.87:1 |
| `--hl-yellow` | `#FFE34D` | Relleno del sello de última hora. Va contra tinta: 14.7:1 |
| `--hl-yellow-mark` | `#FFD814` | Trazo de subrayador sobre papel. El `#FFE34D` se queda en 1.32:1 y no marca nada |
| `--hl-pink` | `#FF6BAE` | Procedencia: de dónde salió esto |
| `--hl-teal` | `#00C7B7` | Lo verificable y el halo exterior de foco |

Claro, no oscuro. Se decide desde la escena de uso: lectura de texto técnico
largo durante la jornada laboral, en escritorio y en ratos sueltos en el móvil.

## Tipografía

- Display: **Permanent Marker** (`--marker`), autoalojada. Titulares, sellos,
  cifra del colofón. Nunca para texto corrido.
- Cuerpo: **Figtree Variable** (`--sans`). Geométrica, legible en párrafo largo.
- Código: **JetBrains Mono Variable** (`--mono`). Solo para código, datos y
  medida. Nunca como disfraz de "técnico": las etiquetas van en sans.

Medida de línea `--measure: 68ch`. Entradilla 52ch, entradilla de portada 46ch.
Titular de portada `clamp(2.4rem, 6.5vw, 4.4rem)`.

## Materia

Es lo que separa este mundo de un blog con fondo crema. Nada de esto se hace con
bordes CSS:

- **Marcos**: SVG de trazo irregular con grosor variable y esquinas que se pasan,
  pintados como `background-image` estirado. No `border-image`: recorta el SVG en
  nueve piezas y en cajas pequeñas las piezas se montan sobre el texto.
- **Subrayadores** (`.hl`, `.hl-pink`, `.hl-teal`): trazo SVG con el borde
  superior desigual que sobresale por los extremos.
- **Reglas de cabecera y pie**: trazo SVG ondulado, nunca `border-bottom`.
- **Pliegues** entre despachos: trazo SVG, horizontal apilado y vertical en dos
  columnas.
- **Fibra del papel**: mosaico SVG de trazos cortos en tres direcciones al 3,2%
  de opacidad, sobre `body`. No es una trama de puntos ni `feTurbulence`.

## Composición

- **Portada**: cabecera rotulada, fecha del número, despacho de portada a tamaño
  de cartel. A partir de `64rem` la pila del resto del día sube a una segunda
  columna (`1.85fr / 1fr`) separada por un pliegue vertical, para que el lector
  vea más de un titular sin desplazarse.
- **Despacho**: sello de prioridad y hora, titular, entradilla, y el recuadro de
  procedencia **antes** del texto. La atribución no es una nota al pie.
- **Bloque de código**: fondo `#16150f` forzado con `!important`, porque Shiki
  escribe el suyo en un `style` en línea y solo eso lo sobrescribe. Lleva
  `tabindex="0"` y `role="region"` para poder recorrerse con teclado, y una
  sombra a la derecha que avisa de que hay contenido desplazado.

## Movimiento

Un solo momento autorado: el subrayador amarillo que barre bajo el titular al
pasar por encima, `320ms` con `cubic-bezier(0.16, 1, 0.3, 1)`, partiendo de un
estado ya visible. `prefers-reduced-motion` lo neutraliza.

## Accesibilidad

- Foco: contorno de tinta de 3px más halo teal exterior. El teal solo sobre papel
  se queda en 1.94:1 y no llega al 3:1 exigido a un indicador no textual.
- Los enlaces de fuente conservan subrayado de tinta además de la banda rosa: la
  banda sola da 2.36:1 y no basta como señal de enlace.
- Los sellos de prioridad dicen la palabra ("Última hora", "Importante", "Del
  día"). El color no es el único portador de la información.

## Pendiente de verificar

El layout de dos columnas a partir de `64rem` está implementado pero no se ha
comprobado en render: el navegador del entorno de desarrollo no pasó de 910px de
ancho. Igualmente sin verificar el reflow por debajo de `40rem`.
