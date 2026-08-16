import { XMLParser } from 'fast-xml-parser';

/**
 * Fuentes de la v1. Todas son RSS o Atom público: sin claves, sin OAuth, sin
 * límites de cuota que puedan tumbar la tirada diaria.
 *
 * Reddit entra en una segunda fase y necesita OAuth. La forma de esta lista ya
 * lo contempla: añadir un tipo de fuente distinto no obliga a tocar el resto.
 */
// Anthropic no expone RSS público: todas las rutas habituales dan 404. Si algún
// día lo publica, entra aquí.
export const FEEDS = [
  { name: 'Hacker News (portada)', url: 'https://hnrss.org/frontpage?points=150', weight: 1.15, cap: 12 },
  { name: 'Simon Willison', url: 'https://simonwillison.net/atom/everything/', weight: 1.2, cap: 8 },
  { name: 'OpenAI', url: 'https://openai.com/news/rss.xml', weight: 1.3, cap: 6 },
  { name: 'Google Research', url: 'https://research.google/blog/rss/', weight: 1.1, cap: 6 },
  { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', weight: 1.1, cap: 6 },
  // Los repositorios de preprints publican cientos de entradas al día. Sin cuota
  // se comen la lista entera y la selección no llega a ver nada más.
  { name: 'arXiv cs.CL', url: 'https://rss.arxiv.org/rss/cs.CL', weight: 0.9, cap: 8 },
  { name: 'arXiv cs.AI', url: 'https://rss.arxiv.org/rss/cs.AI', weight: 0.9, cap: 8 },
  // El .rss es la única vía pública que queda: el .json responde 403 y old.reddit
  // ya solo sirve la interfaz nueva, que sin JavaScript no trae ni un post.
  // `t=week` en vez de `t=day` porque el subreddit es pequeño: el top del día deja
  // una sola entrada dentro de la ventana de 36 horas, y el de la semana deja tres.
  // Sigue ordenado por votos, que es la única señal de tendencia que da el feed.
  { name: 'Reddit r/AIDeveloperNews', url: 'https://www.reddit.com/r/AIDeveloperNews/top.rss?t=week', weight: 1.15, cap: 12, reddit: true },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
});

const asArray = (value) => (value === undefined ? [] : Array.isArray(value) ? value : [value]);

const text = (value) => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return String(value['#text'] ?? '');
  return String(value);
};

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

function linkOf(entry) {
  if (typeof entry.link === 'string') return entry.link;

  const links = asArray(entry.link);
  const alternate =
    links.find((l) => l?.['@_rel'] === 'alternate' && l?.['@_href']) ??
    links.find((l) => l?.['@_href']);

  return alternate?.['@_href'] ?? text(entry.id) ?? '';
}

/** Reddit enlaza al hilo, no al artículo. Cuando el post apunta fuera, ese enlace
 *  es el que vale: trae el contenido que hace falta para investigar, y permite
 *  ver que la noticia ya salió por otra fuente. Los self-post se quedan con el
 *  hilo, que es donde está lo que cuentan. */
function outboundLink(html) {
  for (const [, url] of html.replace(/&amp;/g, '&').matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    try {
      if (!/(^|\.)(reddit\.com|redd\.it)$/.test(new URL(url).hostname)) return url;
    } catch {
      // Un href que no se puede interpretar como URL no sirve.
    }
  }
  return null;
}

/** Lee un canal y devuelve sus entradas normalizadas. Nunca lanza: una fuente
 *  caída no puede impedir que salga el número del día. */
export async function readFeed(feed) {
  try {
    // Reddit limita por IP y responde 429 con facilidad desde un runner, que sale
    // por un rango compartido. Sin reintento la fuente aporta cero la mitad de los
    // días. Se reintenta dos veces, a los 20 y a los 45 segundos.
    let response;
    for (const wait of [0, 20_000, 45_000]) {
      if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));

      response = await fetch(feed.url, {
        headers: { 'User-Agent': 'PIIA/1.0 (+https://github.com/dsancalm/piia)' },
        signal: AbortSignal.timeout(30_000),
      });

      if (response.status !== 429) break;
      console.warn(`  ${feed.name}: HTTP 429, se reintenta`);
    }

    if (!response.ok) {
      console.warn(`  ${feed.name}: HTTP ${response.status}`);
      return [];
    }

    const parsed = parser.parse(await response.text());
    const entries = [...asArray(parsed?.rss?.channel?.item), ...asArray(parsed?.feed?.entry)];

    return entries
      .map((entry) => {
        const published =
          text(entry.pubDate) || text(entry.published) || text(entry.updated) || text(entry['dc:date']);

        const body =
          stripTags(text(entry.description)) ||
          stripTags(text(entry.summary)) ||
          stripTags(text(entry['content:encoded'])) ||
          stripTags(text(entry.content));

        return {
          title: stripTags(text(entry.title)),
          url: (feed.reddit && outboundLink(text(entry.content))) || linkOf(entry).trim(),
          excerpt: body.slice(0, 1200),
          publishedAt: published ? new Date(published) : new Date(),
          sourceName: feed.name,
          weight: feed.weight,
        };
      })
      .filter((item) => item.title && item.url.startsWith('http'));
  } catch (error) {
    console.warn(`  ${feed.name}: ${error.message}`);
    return [];
  }
}

/** Lee todas las fuentes en paralelo y devuelve lo publicado en las últimas horas,
 *  respetando la cuota de cada fuente para que ninguna cope la lista. */
export async function collect({ hours = 36 } = {}) {
  const results = await Promise.all(FEEDS.map(readFeed));
  const cutoff = Date.now() - hours * 3600 * 1000;

  const perSource = results.map((items, i) => {
    const recent = items.filter((item) => item.publishedAt.getTime() > cutoff);

    // Un feed `top` llega ordenado por votos. Reordenarlo por fecha antes de
    // aplicar la cuota deja lo más nuevo en vez de lo más votado, que es justo la
    // señal por la que se lee.
    if (!FEEDS[i].reddit) {
      recent.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    }

    return recent.slice(0, FEEDS[i].cap ?? 10);
  });

  return perSource.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
