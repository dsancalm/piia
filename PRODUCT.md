# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Desarrolladores hispanohablantes que trabajan con IA a diario y no pueden seguir
el ritmo de publicación del sector. Su situación: cada día aparecen modelos,
técnicas de prompting, trucos para reducir consumo de tokens y herramientas que
supuestamente dejan obsoleto algo anterior, repartidos entre blogs oficiales,
Hacker News, arXiv, Reddit y Twitter. El trabajo que vienen a hacer es
enterarse de lo que ha cambiado y decidir si les afecta, sin dedicarle una hora
diaria a rastrear fuentes.

Son lectores recurrentes, no visitantes de paso: vuelven a diario o cada pocos
días. Leen desde el escritorio durante la jornada y desde el móvil en ratos
sueltos.

## Product Purpose

PIIA convierte el ruido diario sobre IA en un puñado de entradas legibles. Un
agente automático ingiere fuentes, selecciona los temas con tracción real,
investiga cada uno contra su fuente primaria y redacta un artículo nuevo.

Cada entrada responde a dos preguntas: qué ha pasado y por qué le importa al
lector — si cambia cómo programa, cuánto cuesta, o qué sustituye a qué. Ese
segundo tramo es la razón de existir del producto; sin él, PIIA sería un
agregador de titulares más.

Éxito significa que un lector pueda dedicar cinco minutos al día y no quedarse
descolgado.

## Positioning

Un agregador enlaza. PIIA investiga y redacta.

La diferencia defendible no es automatizar la publicación, que es trivial, sino
el compromiso editorial sobre el texto generado: se escribe contra la fuente
primaria (el paper, el release oficial), se declara explícitamente lo que no se
sabe en lugar de rellenarlo, y se somete a un paso de despersonalización de
estilo para que no suene a texto de máquina.

El sitio es honesto sobre su naturaleza: el contenido está generado por IA y se
dice, con enlace visible a la fuente original en cada pieza. Esa franqueza es
parte del posicionamiento, no una nota legal al pie.

## Operating Context

- Sitio estático publicado en GitHub Pages. Sin login, sin cuentas, sin
  comentarios, sin backend en tiempo de ejecución.
- La publicación ocurre por GitHub Actions en cron: el agente escribe Markdown
  al repositorio, commitea, y el push dispara el despliegue.
- Publicación automática sin revisión previa. Los errores se corrigen a
  posteriori, así que cada artículo debe ser individualmente reversible y su
  procedencia siempre comprobable por el lector.
- Bilingüe español e inglés, ambos con prefijo de idioma en la ruta.

## Capabilities and Constraints

- **Volumen:** 3 artículos por día. Sube a 5 los días en que varios temas
  superen el umbral de relevancia. Nunca por debajo de la calidad para llenar
  el cupo.
- **Fuentes v1:** solo RSS/Atom. Reddit queda para una segunda fase y requiere
  OAuth. Twitter/X descartado en v1 por coste de API.
- **Modelo de redacción:** `google/gemma-4-31b-it:free` vía OpenRouter.
  Fijado por decisión del usuario.
- **Contenido técnico:** los artículos incluyen bloques de código y comandos de
  terminal. Deben poder copiarse y ejecutarse sin alteración; ningún paso de
  reescritura de estilo puede tocar su interior.
- **Deduplicación:** una noticia ya publicada no se repite, aunque reaparezca
  en varias fuentes.
- **Despliegue:** ruta base `/piia` bajo `dsancalm.github.io`.

## Brand Commitments

- **Nombre:** PIIA. Definitivo.
- **Voz:** directa y técnica. Un colega que cuenta lo que ha pasado sin vender
  nada. Concreto, sin hipérbole, sin entusiasmo de nota de prensa. Admite lo
  que no se sabe.
- **Compromiso antislop:** el texto pasa por un paso de humanización que elimina
  marcadores de escritura automática. Este compromiso es de estilo; no
  sustituye a la exigencia de que el contenido tenga sustancia.

## Evidence on Hand

- Referencia visual recogida en `.impeccable/refs/` (dirección zine dibujado a
  mano), explorada en una sesión previa y aún no aprobada como mundo visual.
- No existen todavía artículos reales: en el momento de diseñar, el corpus está
  vacío. El diseño debe sostenerse tanto con tres entradas como con cientos.
- No hay lectores, métricas de tráfico, testimonios ni patrocinadores. Nada de
  eso puede aparecer inventado en la interfaz.

## Product Principles

1. **La procedencia es parte del contenido.** El lector siempre puede llegar a
   la fuente original en un clic y saber que el texto lo escribió una máquina.
2. **El código es intocable.** La cadena de generación puede reescribir prosa;
   nunca lo que va dentro de un bloque de código.
3. **Menos entradas y mejores.** El cupo diario es un techo, no una cuota que
   haya que llenar.
4. **Decir "no se sabe" antes que rellenar.** Un hueco declarado vale más que
   una frase plausible inventada.
5. **Publicar automático obliga a poder rectificar.** Cada pieza debe ser
   trazable y reversible por separado.

## Accessibility & Inclusion

Lectura prolongada de texto técnico en escritorio y móvil. Requisitos que se
derivan de ello y del uso de animación: contraste suficiente para leer párrafos
largos, respeto de `prefers-reduced-motion`, y bloques de código legibles y
copiables sin depender del color para distinguir la sintaxis.
