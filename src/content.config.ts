import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Un despacho por idioma. El agente escribe el mismo artículo en src/content/news/es
// y src/content/news/en compartiendo el campo `slug`, que es lo que empareja ambas
// versiones para el conmutador de idioma.
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    // Entradilla del despacho. Es lo que se lee en portada, así que se limita para
    // que el listado no degenere en párrafos.
    summary: z.string().max(280),
    lang: z.enum(['es', 'en']),
    // Empareja las dos versiones de idioma del mismo despacho y da la ruta.
    // No puede llamarse `slug`: el glob loader toma ese campo como id de la
    // entrada, y entonces las dos versiones de idioma colisionan y una pisa a
    // la otra silenciosamente.
    story: z.string(),
    publishedAt: z.coerce.date(),
    // Atribución obligatoria: sin fuente comprobable no se publica.
    sourceUrl: z.string().url(),
    sourceName: z.string(),
    // Prioridad de transmisión. Ordena la portada y decide el peso tipográfico.
    priority: z.enum(['flash', 'urgent', 'routine']).default('routine'),
    tags: z.array(z.string()).default([]),
    // Modelo que redactó la pieza. Va impreso en el artículo: el lector debe poder
    // saber qué máquina escribió lo que está leyendo.
    generatedBy: z.string(),
  }),
});

export const collections = { news };
