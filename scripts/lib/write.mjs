import { complete, completeJson, MODEL } from './openrouter.mjs';
import { fetchSource } from './source.mjs';
import { humanizerRules, stripCode, restoreCode, assertCodeIntact, scrubProse, stripLeadingTitle } from './humanize.mjs';

const VOICE = {
  es: 'Escribes en español de España, en segunda persona cuando hablas al lector.',
  en: 'You write in English, addressing the reader as "you".',
};

/**
 * Paso 1: elegir qué merece un despacho.
 *
 * Se le pasa el material del día y devuelve una selección puntuada. El cupo es
 * un techo, no una cuota: si solo hay dos temas que aguanten, se publican dos.
 */
export async function select(candidates, { min = 3, max = 5 }) {
  const list = candidates
    .map((item, i) => `[${i}] ${item.title}\n    ${item.sourceName} — ${item.excerpt.slice(0, 300)}`)
    .join('\n\n');

  const result = await completeJson({
    system: `Eres el editor de un boletín diario sobre IA para programadores.

Tu trabajo es elegir qué merece un artículo hoy. Priorizas lo que cambia algo
para quien programa: un modelo nuevo con cifras, un cambio de precio, una
técnica reproducible, una herramienta que sustituye a otra.

Descartas: anuncios corporativos sin sustancia técnica, rondas de financiación,
opinión sin datos, listicles, y cualquier cosa que sea la misma noticia que otra
de la lista contada de otra forma.

Devuelves JSON con esta forma exacta:
{"picks":[{"index":0,"score":85,"angle":"qué aporta a un programador"}]}

score va de 0 a 100. Solo incluyes elementos con score >= 60. Como mucho ${max}.
Si no hay ${min} que lleguen a 60, devuelves menos: es preferible un número
corto a rellenar con paja.`,
    user: `Material de hoy:\n\n${list}`,
    temperature: 0.3,
    maxTokens: 3000,
  });

  const picks = Array.isArray(result?.picks) ? result.picks : [];

  return picks
    .filter((p) => Number.isInteger(p.index) && candidates[p.index] && p.score >= 60)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((p) => ({ ...candidates[p.index], score: p.score, angle: p.angle ?? '' }));
}

/**
 * Paso 2: investigar contra el material de origen y extraer hechos.
 *
 * Se hace aparte de la redacción a propósito. Pedirle a un modelo que investigue
 * y escriba en la misma pasada es lo que produce artículos que suenan bien y
 * dicen cosas que no están en la fuente.
 */
export async function research(item) {
  // Se lee la fuente primaria antes de extraer nada. El extracto del RSS es un
  // párrafo y no da para investigar ni contiene los comandos del original.
  const source = await fetchSource(item.url);
  const material = source?.text ? source.text.slice(0, 9000) : item.excerpt;

  const codeFromSource = source?.code?.length
    ? `\n\nBloques de código presentes en la fuente (textuales, no los modifiques):\n${source.code
        .map((c) => `---\n${c}`)
        .join('\n')}`
    : '';

  const facts = await completeJson({
    system: `Extraes hechos de un texto de origen. No añades nada que no esté en él.

Devuelves JSON:
{"facts":["hecho concreto y verificable"],
 "numbers":["cifra con su unidad y de qué es"],
 "unknowns":["lo que la fuente no dice y un lector querría saber"],
 "code":["comando o fragmento de código presente en la fuente, textual"],
 "matters":"por qué le cambia algo a alguien que programa, en una frase"}

Reglas: si la fuente no da cifras, "numbers" va vacío. Si no hay código, "code"
va vacío. No inventes nunca un comando, una cifra ni una cita. "unknowns" es
importante: es lo que el artículo va a declarar como no sabido en vez de
rellenarlo.`,
    user: `Título: ${item.title}\nFuente: ${item.sourceName}\nURL: ${item.url}\n\nTexto:\n${material}${codeFromSource}`,
    temperature: 0.2,
    maxTokens: 2500,
  });

  // El código que venga del HTML de la fuente es literal y vale más que el que
  // el modelo transcriba de memoria, así que manda sobre lo extraído.
  if (source?.code?.length) {
    facts.code = source.code;
  }

  return facts;
}

/**
 * Paso 3: redactar en un idioma, con las reglas del humanizer ya dentro del
 * prompt y el código sustituido por marcadores.
 */
export async function draft({ item, facts, lang }) {
  const rules = humanizerRules(lang);

  const brief =
    lang === 'es'
      ? `Titular original: ${item.title}
Fuente: ${item.sourceName}
Ángulo: ${item.angle}

Hechos comprobados:
${(facts.facts ?? []).map((f) => `- ${f}`).join('\n') || '- (la fuente da poco detalle)'}

Cifras:
${(facts.numbers ?? []).map((n) => `- ${n}`).join('\n') || '- (ninguna)'}

Código presente en la fuente:
${(facts.code ?? []).map((c) => `- ${c}`).join('\n') || '- (ninguno)'}

Lo que no se sabe:
${(facts.unknowns ?? []).map((u) => `- ${u}`).join('\n') || '- (nada reseñable)'}

Por qué importa: ${facts.matters ?? ''}`
      : `Original headline: ${item.title}
Source: ${item.sourceName}
Angle: ${item.angle}

Verified facts:
${(facts.facts ?? []).map((f) => `- ${f}`).join('\n') || '- (the source gives little detail)'}

Numbers:
${(facts.numbers ?? []).map((n) => `- ${n}`).join('\n') || '- (none)'}

Code present in the source:
${(facts.code ?? []).map((c) => `- ${c}`).join('\n') || '- (none)'}

What is not known:
${(facts.unknowns ?? []).map((u) => `- ${u}`).join('\n') || '- (nothing notable)'}

Why it matters: ${facts.matters ?? ''}`;

  const system = `Escribes para PIIA, un boletín diario de IA para programadores.
${VOICE[lang]}

Cada pieza responde a dos cosas: qué ha pasado, y por qué le afecta a quien
programa. La segunda es la que justifica que el artículo exista.

Formato de salida: Markdown, entre 300 y 500 palabras. Empiezas directamente por
el primer párrafo, sin título: el título va aparte. Usas como mucho dos encabezados
de nivel 2.

Si en los hechos aparece código o comandos, incluyes al menos un bloque cercado
con su lenguaje, copiado literalmente de la fuente. No lo reescribas, no lo
"mejores" y no le cambies los parámetros: el lector lo va a copiar y ejecutar.
Si no hay código en los hechos, no te lo inventes.

Terminas con un apartado breve que diga honestamente lo que no se sabe. Nunca
rellenas ese hueco con una suposición.

Además:
- Nada de preguntas retóricas para abrir un párrafo. Afirma.
- Nada de "cambia las reglas del juego", "con lupa", "abre la puerta a", "revoluciona".
- No pegues URLs sueltas dentro del texto. El enlace a la fuente ya va aparte.
- No te dirijas al lector con "para ti, que programas". Habla y ya.

${rules}`;

  const body = await complete({
    system,
    user: brief,
    temperature: 0.75,
    maxTokens: 2200,
  });

  // El código se aparta antes del pulido de estilo y vuelve intacto después.
  const { text, blocks } = stripCode(body);

  const polished = await complete({
    system: `Eres un editor. Reescribes el texto para quitarle los tics de la
escritura automática, conservando todos los hechos, el orden de las ideas y el
formato Markdown.

Los marcadores con la forma __PIIA_CODE_0__ son bloques de código. Los dejas
exactamente donde están, sin tocarlos, sin renumerarlos y sin añadir ni quitar
ninguno.

Devuelves solo el texto reescrito.

${rules}`,
    user: text,
    temperature: 0.65,
    maxTokens: 2200,
  });

  assertCodeIntact(polished, blocks);

  return restoreCode(stripLeadingTitle(scrubProse(polished)), blocks);
}

/**
 * Recorta sin partir palabras. Un modelo que se pasa de largo es normal; una
 * entradilla que acaba en "optimización p" es un defecto visible en portada.
 */
function clip(text, limit) {
  if (text.length <= limit) return text;

  const cut = text.slice(0, limit);

  // Se prefiere cerrar en el final de una frase; si no lo hay, en la última
  // palabra completa.
  const sentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  if (sentence > limit * 0.55) return cut.slice(0, sentence + 1);

  const word = cut.lastIndexOf(' ');
  return `${cut.slice(0, word > 0 ? word : limit).replace(/[,;:]$/, '')}...`;
}

/** Paso 4: titular y entradilla, ya sobre el texto final. */
export async function headline({ body, lang }) {
  const rules = humanizerRules(lang);

  const result = await completeJson({
    system: `Escribes el titular y la entradilla de un artículo ya redactado.
${VOICE[lang]}

Devuelves JSON: {"title":"...","summary":"...","tags":["...","..."]}

El titular dice lo que ha pasado, en menos de 80 caracteres. Nada de dos puntos
partiendo la frase, nada de preguntas retóricas, nada de "esto es lo que".
La entradilla tiene menos de 260 caracteres y añade el porqué, no repite el
titular. Entre dos y cuatro etiquetas en minúscula, de una palabra.

${rules}`,
    user: body.slice(0, 3000),
    temperature: 0.6,
    maxTokens: 500,
  });

  // Un titular de más de 85 caracteres ocupa cinco líneas en portada y deja de
  // leerse de un vistazo. El modelo se pasa con frecuencia aunque el prompt lo
  // pida corto, así que el límite se aplica aquí.
  return {
    title: clip(scrubProse(String(result.title ?? '')), 85).replace(/\.\.\.$/, ''),
    summary: clip(scrubProse(String(result.summary ?? '')), 275),
    tags: (Array.isArray(result.tags) ? result.tags : [])
      .map((t) => String(t).toLowerCase().replace(/[^a-záéíóúñ0-9-]/g, ''))
      .filter(Boolean)
      .slice(0, 4),
  };
}

export { MODEL };
