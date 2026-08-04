/**
 * Descarga el artículo original y extrae su texto y su código.
 *
 * El extracto del RSS suele ser un párrafo, y con un párrafo no se puede
 * investigar nada ni aparecerá jamás un comando en los despachos. La fuente
 * primaria es la que trae los bloques de código, las cifras y los detalles.
 */

// Muchas páginas no usan <pre>: envuelven el comando en un <code> suelto o en un
// <div class="highlight">. Se recogen los tres.
const BLOCK = /<pre[\s\S]*?<\/pre>|<div[^>]+class="[^"]*highlight[^"]*"[\s\S]*?<\/div>|<code[^>]*>[\s\S]*?<\/code>/gi;

const decode = (html) =>
  html
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');

const textOf = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Devuelve `{ text, code }` de la URL, o null si no se puede leer. Nunca lanza:
 * si la fuente no se deja descargar, el despacho se escribe con el extracto y
 * ya está, pero la tirada no se cae.
 */
export async function fetchSource(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PIIA/1.0; +https://github.com/dsancalm/piia)',
        Accept: 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(25_000),
    });

    if (!response.ok) return null;

    const type = response.headers.get('content-type') ?? '';
    const body = await response.text();

    // Texto plano (por ejemplo unas notas de versión servidas en crudo).
    if (!type.includes('html')) {
      return { text: body.slice(0, 12_000), code: [] };
    }

    const code = [...body.matchAll(BLOCK)]
      .map((match) => textOf(match[0]))
      .map((snippet) => snippet.trim())
      .filter((snippet) => snippet.length > 12 && snippet.length < 1200)
      .slice(0, 6);

    // El cuerpo del artículo, si la página lo marca; si no, la página entera.
    const main =
      body.match(/<article[\s\S]*?<\/article>/i)?.[0] ??
      body.match(/<main[\s\S]*?<\/main>/i)?.[0] ??
      body;

    const text = textOf(main).slice(0, 12_000);

    return text.length > 200 ? { text, code } : null;
  } catch {
    return null;
  }
}
