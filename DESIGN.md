# Design

<!-- impeccable:design-schema 1 -->

Registrado desde el mundo construido, no desde la intención. Si el código y este
archivo discrepan, manda el código.

## Mundo

El servicio de cable de una agencia de noticias automática. Papel de servicio
casi blanco, tinta de teletipo y un solo acento: el rojo de prioridad. Despachos
con etiqueta, hora y procedencia en jerarquía de sala de redacción. Rechaza la
retícula de tarjetas oscuras con neón de los blogs de IA y el papel craft con
letra dibujada del mundo anterior (fanzine), que este mundo reemplaza por
completo.

Semilla de dirección: `012bfcd3`. Forma: teletipo de agencia, candidato 4 de la
lista ordenada del usuario.

Voz: el usuario pidió a mitad de build copy humano y sin jerga de agencia. Lo
que lee el visitante dice "noticia" (no "despacho"), "Edición del", "Noticias
anteriores"; el cierre "— Fin del despacho —" se eliminó. La jerga del cable
(`dispatch`, `service`, `wirehead`) vive solo en clases y comentarios del
código. La voz humana manda sobre el rótulo de rutado.

## Color

Estrategia: monocromo de tinta sobre papel con un único acento. El rojo señala
prioridad o actividad; nunca decora.

| Token | Valor | Papel |
|---|---|---|
| `--paper` | `#FCFCFA` | Suelo de todo el sitio y `theme-color` |
| `--paper-deep` | `#F4F3EE` | Ficha pegada encima: recuadro de procedencia, código en línea, hover del botón de copiar |
| `--ink` | `#15181B` | Texto, titulares y reglas dobles. 17.35:1 sobre papel |
| `--ink-soft` | `#4A4F55` | Texto secundario, metadatos, `:visited`. 8.05:1 sobre papel; 7.44:1 sobre `--paper-deep` |
| `--wire-red` | `#B3001B` | El acento del cable. 6.97:1 sobre papel; blanco sobre rojo 7.16:1 |
| `--rule` | `rgba(21, 24, 27, 0.18)` | Hairlines: separadores de lista, filo de secciones, borde del código en línea |
| `#14171A` | (literal) | Fondo del bloque de código, la única superficie oscura del mundo |

Dónde aparece el rojo, y solo ahí: base de 4px bajo la marca, antena del robot,
sello macizo de "Última hora" y contorno de "Importante", cabeza del recuadro de
procedencia, subrayados de hover/`aria-current`, contorno de foco, `::selection`
y tap-highlight. Ningún rojo es relleno decorativo: cada uno marca prioridad,
posición actual o acción disponible.

Claro, no oscuro (`color-scheme: light`): lectura de texto largo durante la
jornada. La excepción oscura es el bloque de código, que es la pantalla del
lector fotografiada, no papel.

## Tipografía

- Titulares y rótulos: **Libre Franklin Variable** (`--display`). Pesos 600
  (nav, enlaces de pieza), 700 (titulares base), 800 (cabeza de portada, rótulos
  en caja alta). Precargada.
- Lectura larga: **Literata Variable** (`--serif`). Cuerpo a `1.0625rem/1.7`.
  Su itálica marca el conmutador de idioma. Precargada.
- **JetBrains Mono Variable** (`--mono`): solo hora, dato y código, con
  `tabular-nums` en las horas. Nunca como disfraz de "técnico": los rótulos van
  en la sans.

Escala: cabeza de portada `clamp(2.1rem, 4.6vw, 3.4rem)` peso 800, tracking
-0.025em; `h1` de artículo `clamp(2rem, 4.5vw, 3rem)` a máx. 24ch; titular de
índice 1.25rem (1.1rem en dos columnas); `h2` de prosa 1.4rem; entradilla
1.2rem/1.55 a máx. 52ch.

Roles compactos en caja alta: etiqueta de prioridad `.tag` (0.72rem, 800,
tracking 0.08em), línea de servicio `.service` (0.78rem, 600, tracking 0.1em),
cabecera de sección `.wirehead` (0.82rem, 800, con regla hasta el margen).

Medida `--measure: 66ch`. Entradilla 52ch, tagline 40ch, colofón 58ch. Los
titulares llevan `text-wrap: balance` y `overflow-wrap: break-word`: los escribe
una máquina y un token sin espacios no puede reventar el ancho en móvil.

## Materia

Tinta plana sobre papel liso: sin sombras, sin texturas, sin trazos dibujados.
La materia del mundo son las reglas tipográficas y una sola pieza de pantalla:

- **Reglas dobles**: cabecera gruesa sobre fina (3px/1px), pie espejo fina sobre
  gruesa (1px/3px). Son bordes CSS de tinta plena, no SVG.
- **Hairlines** `--rule` para todo lo demás: separadores del índice y del
  archivo, filo superior de cada `h2` de prosa, cola del `.wirehead`.
- **Escalera del teletipo** (`.tag`): roja maciza con texto blanco (Última
  hora), contorno rojo de 1.5px inset (Importante), tinta suave con contorno
  hairline (Del día). La palabra lleva el significado; el color lo refuerza.
- **Recuadro de procedencia**: `--paper-deep` con regla gruesa de tinta arriba
  (3px) y cabeza en rojo caja alta. Es la ficha de rutado del despacho.
- **Marca**: lockup SVG π + robot + A en trazo `currentColor`; la I es el cuerpo
  del robot redactor (dos ojos de tinta) y su antena remata en punto rojo.
  Pedido explícitamente por el usuario. Bajo el enlace, la base roja de 4px: el
  acento como pie de imprenta. Favicon a juego: π blanco sobre placa roja
  (`#B3001B`, radio 6).
- **Bloque de código**: fondo `#14171A` forzado con `!important` porque Shiki
  (tema `github-dark-default`) escribe el suyo en el `style` en línea del `pre`
  y solo eso lo sobrescribe. Oscuro a propósito dentro de un mundo claro: es lo
  que el lector copia a su terminal. Señal de desplazamiento en dos capas de
  fondo: sombra clara fija en el filo derecho y capa del color del bloque con
  `background-attachment: local` que la tapa al llegar al final. Los bloques
  `text` (prompts en lenguaje natural) envuelven con `pre-wrap`; el código real
  conserva el scroll para no romper líneas copiables.
- **Radios solo en lo que no es papel**: 4px el bloque de código, 3px el código
  en línea y el botón de copiar, 6 el favicon. El papel no tiene esquinas
  redondeadas.
- **Botón "Copiar"**: papel con borde de tinta de 1px, rótulo en caja alta;
  montado por el único script del sitio. "Copiado" invierte a tinta sobre papel.

## Composición

- Ritmo de espaciado `--s1..--s6` (0.5 / 0.875 / 1.5 / 2.5 / 4 / 6.5 rem).
  Contenedor `.wrap`: `min(100% - 2.5rem, 74rem)`.
- **Masthead**: marca, tagline y nav en una barra alineada por baseline; bajo
  40rem el tagline y el nav bajan a filas completas. El nav marca posición con
  subrayado rojo (`aria-current`).
- **Portada**: línea de servicio "Edición del [fecha] · N noticia(s)", cabeza
  del día como `h1` a peso de portada, y a partir de `64rem` la pila "También
  hoy" sube a segunda columna (`1.85fr / 1fr`, filo izquierdo hairline) con la
  cabeza `sticky`: la columna ancha nunca queda vacía.
- **La edición solo contiene su día** (clave de día en `Europe/Madrid`). Lo
  anterior baja a "Noticias anteriores": filas de título + hora tabulada
  agrupadas por fecha, con `content-visibility: auto` porque el archivo crece un
  día cada día.
- **El índice es un índice**: entradilla cortada a dos líneas (`line-clamp`),
  sin etiquetas; titulares en `h3` bajo el `h2` de sección.
- **Artículo**: sello y hora en mono, titular, entradilla, y el recuadro de
  procedencia **antes** del texto con la declaración de autoría de máquina: la
  atribución no es una nota al pie. A partir de `72rem` el recuadro se pega al
  margen derecho como marginalia `sticky`. Prosa a 66ch; cada `h2` abre con su
  hairline. Al pie, pager "Más reciente / Anterior" en dos columnas y "Volver a
  la portada".
- **About y 404 no llevan línea de servicio**: adaptación intencional. El
  usuario pidió copy humano sin jerga de agencia, y en una página que habla en
  voz humana el rótulo de rutado sobra. La voz manda sobre el sistema.
- **404**: única para todo el sitio (español primero, inglés debajo), con sello
  rojo "Retirada": el producto garantiza retiradas y un enlace muerto no puede
  caer en el 404 de GitHub.
- Estado vacío de portada: `h1` + explicación a 46ch de quién publica y qué
  significa el vacío.

## Movimiento

Tesis: el cable entra. Todo lo autorado se activa solo bajo
`prefers-reduced-motion: no-preference`; con movimiento reducido queda el estado
final (el neutralizador global además apaga explícitamente los pseudo-elementos
`::view-transition-*`, que no alcanza de otro modo).

- **Llegada (portada, una vez por carga)**: `wire-in` — fundido con 6px de
  subida, 320ms, `cubic-bezier(0.16, 1, 0.3, 1)` — escalonado: línea de
  servicio, cabeza (+60ms), pila del día (+140ms).
- **Continuidad**: view transitions MPA (`@view-transition`, raíz a 240ms). El
  titular clicado viaja de la portada a su artículo
  (`view-transition-name: d-{story}`); el resto funde.
- **Feedback**: subrayado rojo en hover/foco (grosor 2–3px, offset 4–5px);
  "Copiado" mantiene el estado invertido 1.8s. Nada más se mueve: el papel
  impreso no anima.

## Accesibilidad

- Contrastes medidos sobre `--paper`: tinta 17.35:1, tinta suave 8.05:1, rojo
  6.97:1; blanco sobre rojo 7.16:1; tinta suave sobre `--paper-deep` 7.44:1.
- Foco: contorno rojo de 3px con offset de 2px, visible sobre papel (6.97:1) y
  sobre el bloque de código (offset 3px, con papel de por medio).
- Los sellos dicen la palabra ("Última hora", "Importante", "Del día"); el
  color no es el único portador.
- Todo `pre` lleva `tabindex="0"` y `role="region"` con `aria-label` en el
  idioma de la página (plugin rehype): el scroll horizontal se recorre con
  teclado.
- Skip link; `nav` anunciado "Principal"/"Main"; `aria-current="page"`.
  Jerarquía real: `h1` la cabeza de portada (o el vacío, o el artículo), `h2`
  las secciones (`.wirehead`), `h3` el índice y las fechas de archivo.
- Áreas táctiles ≥44px vía `padding-block` en enlaces; donde el enlace es flex
  item el padding estira la fila y se acepta; en nav, colofón y 404 se compensa
  con margen negativo. Excepción conocida: los `h3` del carril a ≥64rem quedan
  en ≈40.7px — contexto de puntero fino, AA cumplido.
- `:visited` baja a tinta suave en el índice y en el archivo (el lector diario
  distingue lo leído); la cabeza de portada nunca: siempre imprime a tinta
  plena.
- `color-scheme: light`, `theme-color` `#FCFCFA`, tap-highlight rojo al 16%,
  `touch-action: manipulation`. TZ fija `Europe/Madrid` en toda fecha y hora
  impresa: lo impreso no depende del runner de CI.
- `hreflang` alternos con `x-default`; el conmutador de idioma declara `lang`.
  `overflow-wrap` en titulares, entradillas y prosa: las URLs y tokens de
  máquina no revientan el móvil.

## Verificado en render

Build de producción con 42 páginas ok; contrato de dirección con seed
`012bfcd3` presente en `dist/es/index.html`; detector CLI con 0 hallazgos;
`scrollWidth` 390 = viewport en móvil real (portada y artículo, sin overflow
horizontal). Capturas desktop 1470px y móvil 390px del 2026-08-06.
