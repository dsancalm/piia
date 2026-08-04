import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const news = await getCollection('news', ({ data }) => data.lang === 'en');
  news.sort((a, b) => b.data.publishedAt - a.data.publishedAt);

  // El sitio se sirve bajo /piia, así que el enlace de cada pieza se construye
  // desde site + base: un enlace relativo saldría del feed apuntando a la raíz
  // del dominio, que es de otro proyecto.
  const home = new URL(`${import.meta.env.BASE_URL}/`.replace(/\/+$/, '/'), context.site);

  return rss({
    title: 'PIIA — What changed in AI today',
    description:
      'An agent reads the sources each day, researches against the original material and writes what changed in AI and why it matters to you.',
    site: home,
    customData: '<language>en</language>',
    items: news.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.publishedAt,
      link: new URL(`en/${entry.data.story}/`, home).href,
      categories: entry.data.tags,
    })),
  });
}
