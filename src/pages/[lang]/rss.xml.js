import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Los dos feeds son el mismo código con otros rótulos. Estaban duplicados en
// es/ y en/, y un arreglo en uno se olvidaba en el otro.
const meta = {
  es: {
    title: 'PIIA — Lo que ha cambiado hoy en IA',
    description:
      'Un agente lee las fuentes cada día, investiga contra el material original y redacta lo que ha cambiado en IA y por qué te afecta.',
  },
  en: {
    title: 'PIIA — What changed in AI today',
    description:
      'An agent reads the sources each day, researches against the original material and writes what changed in AI and why it matters to you.',
  },
};

export function getStaticPaths() {
  return Object.keys(meta).map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
  const { lang } = context.params;

  const news = await getCollection('news', ({ data }) => data.lang === lang);
  news.sort((a, b) => b.data.publishedAt - a.data.publishedAt);

  // El sitio se sirve bajo /piia, así que el enlace de cada pieza se construye
  // desde site + base: un enlace relativo saldría del feed apuntando a la raíz
  // del dominio, que es de otro proyecto.
  const home = new URL(`${import.meta.env.BASE_URL}/`.replace(/\/+$/, '/'), context.site);

  return rss({
    title: meta[lang].title,
    description: meta[lang].description,
    site: home,
    customData: `<language>${lang}</language>`,
    items: news.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.publishedAt,
      link: new URL(`${lang}/${entry.data.story}/`, home).href,
      categories: entry.data.tags,
    })),
  });
}
