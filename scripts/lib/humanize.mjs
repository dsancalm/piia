/**
 * Reglas del humanizer compiladas a texto de prompt.
 *
 * La skill `humanizer` vive en .claude/skills y solo la lee un agente que corra
 * en esta máquina. DeepSeek, al otro lado de OpenRouter, no ve nada de eso: solo
 * recibe lo que le mandemos por HTTP. Por eso las reglas se compilan aquí.
 *
 * Origen: .claude/skills/humanizer (blader/humanizer), a su vez derivado de
 * Wikipedia:Signs of AI writing. Si esa skill se actualiza, este archivo hay que
 * regenerarlo a mano.
 */

/** Reglas para el español. No son la traducción de las inglesas: los tics de la
 *  escritura automática en español son otros, y traducir "delve" no sirve de nada. */
const RULES_ES = `
No escribas como escribe una máquina. En concreto:

Prohibido sin excepción:
- Rayas y guiones largos (— y –). Usa punto, coma, dos puntos o paréntesis.
- Comillas tipográficas curvas. Usa comillas rectas.
- Emojis.
- Cerrar con un párrafo de perspectivas, futuro o balance optimista. Termina en
  el último hecho concreto.
- Frases de chat: "espero que esto ayude", "por supuesto", "aquí tienes".

Vocabulario que delata a un modelo en español, evítalo:
  crucial, clave (como adjetivo), fundamental, pivotal, robusto, potente,
  revolucionario, disruptivo, innovador, panorama, ecosistema (fuera de biología),
  abanico, sinergia, aprovechar (por usar), impulsar, potenciar, empoderar,
  destacar (por decir), cabe destacar, es importante señalar, en el vertiginoso
  mundo de, no solo... sino que también, tanto... como.

Construcciones que hay que deshacer:
- Participios y gerundios pegados al final para fingir profundidad: "...,
  reflejando la importancia de...", "..., permitiendo así...". Corta la frase.
- Grupos de tres. No fuerces "rápido, barato y sencillo" cuando hay dos cosas.
- Perífrasis en vez del verbo simple: "tiene la capacidad de procesar" es
  "procesa"; "se posiciona como" es "es".
- Variación elegante: si estás hablando del modelo, di "el modelo" las veces que
  haga falta. No lo llames "el sistema", "la herramienta" y "la solución" en
  párrafos seguidos.
- Rangos falsos: "desde la arquitectura hasta la comunidad" cuando esas dos cosas
  no están en la misma escala.
- Negaciones de coletilla: "sin sorpresas", "sin adivinar", pegadas al final.
- Anunciar lo que vas a hacer: "vamos a ver", "veamos en detalle", "esto es lo
  que necesitas saber". Dilo y ya.
- Aforismos: "X es el nuevo Y", "el lenguaje de", "la arquitectura de".
- Negrita mecánica y listas donde cada punto empieza por un término en negrita
  seguido de dos puntos.
- Títulos con mayúscula en cada palabra. En español solo va en mayúscula la
  primera palabra y los nombres propios.

Cómo tiene que sonar:
- Frases de longitudes distintas. Alterna cortas y largas.
- Voz activa y verbos simples. "Es", "tiene", "hace" no son errores.
- Concreto antes que general. Un número real vale más que un adjetivo.
- Si algo no se sabe, se dice que no se sabe. No lo rellenes con una frase
  plausible.
`.trim();

/** Reglas para el inglés, tomadas directamente de la skill. */
const RULES_EN = `
Do not write the way a machine writes. Specifically:

Banned outright:
- Em dashes and en dashes (— and –). Use a period, comma, colon or parentheses.
- Curly quotation marks. Use straight quotes.
- Emojis.
- Closing with a forward-looking or upbeat wrap-up paragraph. End on the last
  concrete fact.
- Chat artifacts: "I hope this helps", "Certainly!", "here is a".

Vocabulary that gives a model away, avoid it:
  delve, crucial, key (adjective), pivotal, landscape (abstract), tapestry,
  testament, underscore, showcase, foster, enhance, robust, seamless,
  leverage (as a verb), intricate, vibrant, groundbreaking, align with,
  it is important to note, in today's fast-paced world.

Constructions to undo:
- Present participles tacked on to fake depth: "..., highlighting the importance
  of...", "..., ensuring that...". Cut the clause.
- Groups of three. Do not force "fast, cheap and simple" when there are two things.
- Periphrasis instead of the plain verb: "has the ability to process" is
  "processes"; "serves as" is "is".
- Elegant variation: if you are talking about the model, say "the model" as many
  times as needed. Do not cycle through "the system", "the tool", "the solution".
- False ranges: "from architecture to community" when those are not on one scale.
- Tailing negations: "no guessing", "no wasted motion" stuck on the end.
- Announcing what you are about to do: "let's dive in", "here's what you need to
  know". Just say it.
- Aphorism formulas: "X is the Y of Z", "the language of", "the architecture of".
- Mechanical boldface, and lists where every item opens with a bolded term and a
  colon.
- Title Case In Headings. Use sentence case.

How it should read:
- Vary sentence length. Alternate short and long.
- Active voice and plain verbs. "Is", "has", "does" are not failures.
- Concrete before general. A real number beats an adjective.
- If something is not known, say it is not known. Do not fill the gap with a
  plausible sentence.
`.trim();

export function humanizerRules(lang) {
  return lang === 'es' ? RULES_ES : RULES_EN;
}

const FENCE = /(^|\n)(```|~~~)[^\n]*\n[\s\S]*?\n\2[ \t]*(?=\n|$)/g;
const INLINE = /`[^`\n]+`/g;
const PLACEHOLDER = /__PIIA_CODE_(\d+)__/g;

/**
 * Saca el código del texto antes de que ningún paso de estilo lo toque.
 *
 * Es la protección más importante del pipeline. Un humanizador reescribe para
 * romper la cadencia; aplicado sobre un comando cambia un flag y lo deja
 * plausible pero roto, y el lector no tiene forma de notarlo. Así que el código
 * no viaja: se queda aquí y vuelve intacto.
 */
export function stripCode(markdown) {
  const blocks = [];

  const keep = (match) => {
    blocks.push(match);
    return `__PIIA_CODE_${blocks.length - 1}__`;
  };

  // Los bloques cercados van primero: si no, el patrón de código en línea
  // partiría sus backticks por la mitad.
  const withoutFences = markdown.replace(FENCE, (match, lead) => lead + keep(match.slice(lead.length)));
  const text = withoutFences.replace(INLINE, keep);

  return { text, blocks };
}

/** Devuelve el código a su sitio, exactamente como estaba. */
export function restoreCode(text, blocks) {
  return text.replace(PLACEHOLDER, (match, index) => {
    const block = blocks[Number(index)];
    if (block === undefined) {
      throw new Error(`El modelo inventó el marcador ${match}, que no existe en el original`);
    }
    return block;
  });
}

/**
 * Comprueba que el modelo no se comió ni duplicó ningún marcador. Si lo hizo, el
 * texto se descarta: es preferible publicar un despacho menos que publicar un
 * comando alterado.
 */
export function assertCodeIntact(text, blocks) {
  const found = [...text.matchAll(PLACEHOLDER)].map((m) => Number(m[1]));
  const expected = blocks.map((_, i) => i);

  const missing = expected.filter((i) => !found.includes(i));
  if (missing.length > 0) {
    throw new Error(`Faltan ${missing.length} bloques de código en la respuesta del modelo`);
  }

  const duplicated = found.filter((value, i) => found.indexOf(value) !== i);
  if (duplicated.length > 0) {
    throw new Error(`El modelo duplicó los bloques de código ${[...new Set(duplicated)].join(', ')}`);
  }
}

// Emojis y dingbats. El modelo los cuela sobre todo cuando escribe sin razonar.
const EMOJI =
  /[\u{1F300}-\u{1FAFF}\u{1F000}-\u{1F0FF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu;

/** Últimos tics que se cuelan aunque el prompt los prohíba. Solo toca prosa. */
export function scrubProse(text) {
  return text
    .replace(/[—–]/g, ', ')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(EMOJI, '')
    .replace(/,\s*,/g, ',')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+$/gm, '')
    .trim();
}
