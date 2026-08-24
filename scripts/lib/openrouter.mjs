const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Modelos a probar, en orden. Todos gratuitos y de proveedores distintos: los
 * `:free` se saturan a diario y un 429 arrastra a todo el catálogo del mismo
 * proveedor, así que encadenar dos Nvidia seguidos no serviría de nada.
 *
 * Se sobreescribe con OPENROUTER_MODELS, separando por comas.
 */
export const MODELS = (
  process.env.OPENROUTER_MODELS ??
  'nvidia/nemotron-3-ultra-550b-a55b:free,dots-studio/dots-3-note-preview:free,poolside/laguna-s-2.1:free'
)
  .split(',')
  .map((name) => name.trim())
  .filter(Boolean);

if (MODELS.length === 0) {
  throw new Error('OPENROUTER_MODELS está definida pero vacía');
}

/** El modelo que atendió la última llamada. El frontmatter lo anota. */
export let MODEL = MODELS[0];

/**
 * Una llamada al modelo. Prueba los modelos en orden y se queda con el primero
 * que responde. Esto corre desatendido a las 6 de la mañana y un 429 no puede
 * tumbar la edición del día.
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
    temperature,
    max_tokens: maxTokens,
    // Varios de estos modelos razonan por defecto y el razonamiento consume el
    // presupuesto de `max_tokens` antes de llegar a escribir: con el límite justo,
    // la respuesta vuelve vacía. Para extraer y redactar no aporta.
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

  for (const model of MODELS) {
    // Dos intentos por modelo. Uno solo descartaría un modelo bueno por un corte
    // de red; más que dos alarga la tirada sin arreglar un límite que dura minutos.
    for (let attempt = 0; attempt < 2; attempt += 1) {
      if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 3000));

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
          body: JSON.stringify({ ...body, model }),
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
          lastError = new Error(`${model}: la respuesta no traía contenido`);
          continue;
        }
        MODEL = model;
        return text.trim();
      }

      const detail = await response.text().catch(() => '');
      lastError = new Error(`${model} respondió ${response.status}: ${detail.slice(0, 200)}`);

      // 4xx que no sea 429 no lo arregla esperar: este modelo no acepta la
      // petición y toca pasar al siguiente.
      if (response.status !== 429 && response.status < 500) break;
    }

    console.warn(`  ${lastError.message}`);
  }

  throw new Error(`Ningún modelo respondió. Último fallo: ${lastError.message}`);
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

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      // Se prueba el siguiente.
    }
  }

  throw new Error(`No se pudo interpretar la respuesta como JSON: ${raw.slice(0, 200)}`);
}
