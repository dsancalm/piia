import { XMLParser } from 'fast-xml-parser';

/**
 * Fuentes de la v1. Todas son RSS o Atom público: sin claves, sin OAuth, sin
 * límites de cuota que puedan tumbar la tirada diaria.
 *
 * Reddit se probó y se quitó: bloquea las IP de GitHub Actions con un 403 y no
 * llegó a aportar una sola entrada. Volver a intentarlo exige OAuth.
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

/** Lee un canal y devuelve sus entradas normalizadas. Nunca lanza: una fuente
 *  caída no puede impedir que salga el número del día. */
export async function readFeed(feed) {
  try {
    // Algunas fuentes limitan por IP y responden 429 desde un runner, que sale por
    // un rango compartido. Se reintenta dos veces, a los 20 y a los 45 segundos.
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
          url: linkOf(entry).trim(),
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

    recent.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    return recent.slice(0, FEEDS[i].cap ?? 10);
  });

  return perSource.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
