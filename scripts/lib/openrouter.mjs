const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

export const MODEL = process.env.OPENROUTER_MODEL ?? 'deepseek/deepseek-v4-flash-0731';

/**
 * Una llamada al modelo. Reintenta ante fallos transitorios porque esto corre
 * desatendido a las 6 de la mañana y un 429 no puede tumbar la edición del día.
 */
export async function complete({
  system,
  user,
  temperature = 0.7,
  maxTokens = 4000,
  json = false,
  reasoning = false,
}) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('Falta OPENROUTER_API_KEY');
  }

  const body = {
    model: MODEL,
    temperature,
    max_tokens: maxTokens,
    // Este modelo razona por defecto y el razonamiento consume el presupuesto de
    // `max_tokens` antes de llegar a escribir: con el límite justo, la respuesta
    // vuelve vacía. Para extraer y redactar no aporta, así que va desactivado.
    reasoning: reasoning ? { effort: 'low' } : { enabled: false },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  };

  if (json) {
    body.response_format = { type: 'json_object' };
  }

  let lastError;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    if (attempt > 0) {
      // Espera creciente: 2s, 8s, 18s.
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt * attempt));
    }

    let response;
    try {
      response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://dsancalm.github.io/piia',
          'X-Title': 'PIIA',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(180_000),
      });
    } catch (error) {
      lastError = error;
      continue;
    }

    if (response.ok) {
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      if (!text) {
        lastError = new Error('La respuesta no traía contenido');
        continue;
      }
      return text.trim();
    }

    const detail = await response.text().catch(() => '');
    lastError = new Error(`OpenRouter respondió ${response.status}: ${detail.slice(0, 300)}`);

    // 4xx que no sea 429 es culpa nuestra: reintentar no lo arregla.
    if (response.status !== 429 && response.status < 500) {
      throw lastError;
    }
  }

  throw lastError;
}

/**
 * Cierra un JSON que se quedó a medias porque la respuesta tocó el límite de
 * tokens. Descarta el último elemento incompleto y cierra lo que quedó abierto,
 * que es preferible a perder la tirada entera por un corchete.
 */
function repairTruncatedJson(text) {
  const stack = [];
  let inString = false;
  let escaped = false;
  let lastComplete = -1;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\' && inString) {
      escaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (char === '{' || char === '[') {
      stack.push(char === '{' ? '}' : ']');
    } else if (char === '}' || char === ']') {
      stack.pop();
      // Un elemento de array acaba de cerrarse por completo.
      if (stack.length === 2) lastComplete = i;
    }
  }

  if (stack.length === 0) return text;

  const cut = lastComplete > 0 ? text.slice(0, lastComplete + 1) : text.replace(/,[^,]*$/, '');
  const open = [];
  let str = false;
  let esc = false;
  for (let i = 0; i < cut.length; i += 1) {
    const c = cut[i];
    if (esc) { esc = false; continue; }
    if (c === '\\' && str) { esc = true; continue; }
    if (c === '"') { str = !str; continue; }
    if (str) continue;
    if (c === '{' || c === '[') open.push(c === '{' ? '}' : ']');
    else if (c === '}' || c === ']') open.pop();
  }

  return cut + open.reverse().join('');
}

/** Igual que `complete`, pero exige JSON válido de vuelta. */
export async function completeJson(options) {
  const raw = await complete({ ...options, json: true });

  const candidates = [raw];

  // Algunos modelos envuelven el JSON en un bloque cercado pese a pedirlo crudo.
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) candidates.push(fenced[1].trim());

  const braced = raw.match(/\{[\s\S]*\}/);
  if (braced) candidates.push(braced[0]);

  const opening = raw.indexOf('{');
  if (opening >= 0) candidates.push(repairTruncatedJson(raw.slice(opening)));

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      // Se prueba el siguiente.
    }
  }

  throw new Error(`No se pudo interpretar la respuesta como JSON: ${raw.slice(0, 200)}`);
}
