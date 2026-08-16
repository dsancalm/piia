# PIIA

Un fanzine diario sobre IA que se escribe solo.

Cada mañana un agente lee las fuentes, elige lo que ha tenido tracción real,
descarga el artículo original, extrae los hechos y redacta los despachos del día
en español e inglés. Nadie los revisa antes de publicarlos.

Publicado en <https://dsancalm.github.io/piia>.

## Cómo funciona

```
cron (GitHub Actions, 06:30 UTC)
  │
  ├─ 1. Ingesta       RSS/Atom, con cuota por fuente
  ├─ 2. Dedup         data/seen.json, huella de la URL normalizada
  ├─ 3. Selección     el modelo puntúa; se publican 3, hasta 5 si hay material
  ├─ 4. Investigación se descarga la fuente original y se extraen hechos y código
  ├─ 5. Redacción     español e inglés, con las reglas antislop en el prompt
  ├─ 6. Humanizado    el código se aparta y vuelve intacto
  └─ 7. Commit        src/content/news/{es,en}/*.md, y el push despliega
```

El cupo diario es un techo, no una cuota: si nada supera el umbral, no se publica
nada. Es preferible un número corto que relleno.

## Puesta en marcha

```bash
npm install
npm run dev
```

Para generar despachos en local hace falta un `.env` con:

```
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=google/gemma-4-26b-a4b-it:free
```

```bash
node scripts/publish.mjs --dry        # no escribe nada, solo enseña qué saldría
node scripts/publish.mjs --max 3      # tirada real
```

En GitHub hace falta el secret `OPENROUTER_API_KEY` y activar Pages con origen
"GitHub Actions".

## Decisiones que no son obvias

**El código nunca pasa por el humanizador.** Antes del paso de estilo, los
bloques cercados y el código en línea se sustituyen por marcadores y se vuelven a
colocar intactos después. Si el modelo pierde o duplica un marcador, el despacho
se descarta. Un humanizador reescribe para romper la cadencia; aplicado sobre un
comando cambia un parámetro y lo deja plausible pero roto, y eso el lector no
puede detectarlo.

**Las reglas del humanizer están compiladas en el prompt.** La skill
`blader/humanizer` solo la lee un agente local; DeepSeek, al otro lado de
OpenRouter, no ve nada de eso. Están en `scripts/lib/humanize.mjs`, y las de
español no son la traducción de las inglesas porque los tics no son los mismos.

**El razonamiento del modelo va desactivado.** `deepseek-v4-flash` razona por
defecto y ese razonamiento consume el presupuesto de `max_tokens` antes de
escribir, así que la respuesta volvía vacía. Ver `reasoning` en
`scripts/lib/openrouter.mjs`.

**El frontmatter usa `story`, no `slug`.** El glob loader de Astro toma el campo
`slug` como identificador de la entrada, así que las versiones española e inglesa
del mismo despacho colisionaban y una pisaba a la otra sin avisar.

**El mensaje de commit no incluye titulares.** Vienen de fuentes externas y no
tienen por qué acabar dentro de un comando de shell.

## Pendiente

- Reddit como fuente. Requiere OAuth y tolerar el bloqueo de IPs de datacenter
  desde Actions.
- Verificar en render el layout de dos columnas de portada por encima de 1024px.

## Estructura

```
scripts/
  publish.mjs        orquestador de la tirada
  lib/feeds.mjs      fuentes RSS y cuotas
  lib/source.mjs     descarga del artículo original
  lib/write.mjs      selección, investigación, redacción, titulares
  lib/humanize.mjs   reglas antislop y blindaje del código
  lib/openrouter.mjs cliente del modelo
  lib/store.mjs      deduplicación
src/                 sitio Astro
```

`PRODUCT.md` recoge la verdad del producto y `DESIGN.md` el sistema visual.
