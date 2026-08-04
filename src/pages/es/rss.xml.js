import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const news = await getCollection('news', ({ data }) => data.lang === 'es');
  news.sort((a, b) => b.data.publishedAt - a.data.publishedAt);

  // El sitio se sirve bajo /piia, así que el enlace de cada pieza se construye
  // desde site + base: un enlace relativo saldría del feed apuntando a la raíz
  // del dominio, que es de otro proyecto.
  const home = new URL(`${import.meta.env.BASE_URL}/`.replace(/\/+$/, '/'), context.site);

  return rss({
    title: 'PIIA — Lo que ha cambiado hoy en IA',
    description:
      'Un agente lee las fuentes cada día, investiga contra el material original y redacta lo que ha cambiado en IA y por qué te afecta.',
    site: home,
    customData: '<language>es</language>',
    items: news.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.publishedAt,
      link: new URL(`es/${entry.data.story}/`, home).href,
      categories: entry.data.tags,
    })),
  });
}
