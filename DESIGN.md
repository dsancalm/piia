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
  de cartel. A partir de `64rem` la pila del día sube a una segunda columna
  (`1.85fr / 1fr`) separada por un pliegue vertical, y el cartel es `sticky`
  para acompañar el scroll: la columna ancha nunca queda vacía.
- **El número solo contiene su día** (clave de día en `Europe/Madrid`). Los
  despachos de tiradas anteriores bajan a "Números anteriores": lista compacta a
  ancho completo bajo su pliegue, agrupada por fecha. Así la fecha del número
  nunca miente y el rail no crece sin límite.
- **Rail**: es un índice, no una segunda lectura. Entradilla cortada a dos
  líneas (`line-clamp`), sin etiquetas; titulares en `h3` dentro de la sección
  "También hoy" (`h2`). El titular del cartel es el `h1` de la portada.
- **Despacho**: sello de prioridad y hora, titular, entradilla, y el recuadro de
  procedencia **antes** del texto. La atribución no es una nota al pie. A partir
  de `72rem` el recuadro se pega al margen derecho como marginalia (`sticky`,
  rotado 0.9deg): el margen del pliego lleva contenido, no vacío.
- **Bloque de código**: fondo `#16150f` forzado con `!important`, porque Shiki
  escribe el suyo en un `style` en línea y solo eso lo sobrescribe. Lleva
  `tabindex="0"` y `role="region"` (etiquetado por idioma) para poder recorrerse
  con teclado. La señal de desplazamiento son dos capas: una sombra clara fija
  en el filo derecho y una capa del color del bloque, `background-attachment:
  local`, que la tapa al llegar al final (la sombra negra anterior era invisible
  sobre el fondo negro). Los bloques `text` (prompts en lenguaje natural)
  envuelven con `pre-wrap`; el código real conserva el scroll para no romper
  líneas copiables. Botón "Copiar" montado por el único script del sitio, como
  pegatina en marker; al copiar estampa "Copiado" en teal.
- **Artículo**: pager "Más reciente / Anterior" bajo un pliegue al pie, en el
  mismo idioma, para hojear el fanzine sin volver a portada.
- **404**: página propia en el mundo (sello "Retirado" rosa), porque el producto
  garantiza retiradas y un enlace muerto no puede caer en el 404 de GitHub.

## Movimiento

Tesis: el número sale de la imprenta. Todo lo autorado se activa solo bajo
`prefers-reduced-motion: no-preference`; sin soporte o con movimiento reducido
queda el estado final visible.

- **Focal (portada, una vez por carga)**: el sello del cartel se estampa
  (`scale 1.18→1` componiendo con su inclinación `--tilt`, 260ms) y el
  subrayador de la fecha se pasa de izquierda a derecha (520ms, delay 280ms).
- **Continuidad**: view transitions entre documentos (`@view-transition`,
  MPA). El titular clicado viaja de la portada a su posición de artículo
  (`view-transition-name: d-{story}`); el resto funde como papel. Los
  pseudo-elementos `::view-transition-*` se apagan explícitamente bajo
  movimiento reducido, porque el neutralizador global no los alcanza.
- **Scroll**: despachos del rail y días del archivo asoman al entrar en
  viewport, y el subrayador de cada `h2` de artículo se dibuja, con
  `animation-timeline: view()` tras `@supports`; fuera de Chromium degrada a
  estático.
- **Feedback**: barrido amarillo del titular en hover (320ms,
  `cubic-bezier(0.16, 1, 0.3, 1)`); el sello se recoloca un grado al pasar por
  el despacho; las gotas de tinta del rodillo caen escalonadas al tocar la
  marca; "Copiado" asienta con un `scale` corto.

## Accesibilidad

- Foco: contorno de tinta de 3px más halo teal exterior. El teal solo sobre papel
  se queda en 1.94:1 y no llega al 3:1 exigido a un indicador no textual.
- Los enlaces de fuente conservan subrayado de tinta además de la banda rosa: la
  banda sola da 2.36:1 y no basta como señal de enlace.
- Los sellos de prioridad dicen la palabra ("Última hora", "Importante", "Del
  día"). El color no es el único portador de la información.
- Jerarquía real por página: `h1` en portada (titular del cartel), artículo y
  vacío; el rail va en `h3` bajo su `h2`. El `nav` del masthead se anuncia
  "Principal"/"Main", no con el nombre del primer enlace.
- Enlaces del nav con área táctil ≥44px (padding compensado con margen
  negativo). `touch-action: manipulation` y tap-highlight amarillo en
  interactivos.
- Hover de navegación siempre en amarillo marcador: el rosa queda reservado a
  procedencia y el teal al halo de foco. Ningún color de hover decora.
- `color-scheme: light`, `theme-color` papel, TZ fija `Europe/Madrid` en toda
  fecha impresa (la hora no depende del runner de CI).

## Verificado en render

Dos columnas a partir de `64rem`, sticky del cartel, marginalia a `72rem`,
reflow móvil a 390px (sin overflow horizontal), 404, botón de copiar y feeds RSS
comprobados en navegador el 2026-08-04 (desktop 1470px y viewport 390px).
