#!/usr/bin/env node
/**
 * Tirada diaria de PIIA.
 *
 * Lee las fuentes, descarta lo ya publicado, elige lo que merece un despacho,
 * investiga cada tema contra su fuente, redacta en español e inglés y escribe
 * los archivos Markdown. No commitea: de eso se encarga el workflow.
 *
 *   node scripts/publish.mjs [--dry] [--max 5]
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { collect } from './lib/feeds.mjs';
import { loadSeen, saveSeen, fingerprint, toStory } from './lib/store.mjs';
import { select, research, draft, headline, MODEL } from './lib/write.mjs';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const maxIndex = args.indexOf('--max');
const MAX = maxIndex >= 0 ? Number(args[maxIndex + 1]) : 5;
const MIN = 3;

/** El escapado de YAML importa: un titular con dos puntos rompe el frontmatter
 *  y tumba la build entera. Se citan siempre y se escapan las comillas. */
const yaml = (value) => `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

function toMarkdown({ meta, body, lang, story, item }) {
  const front = [
    '---',
    `title: ${yaml(meta.title)}`,
    `summary: ${yaml(meta.summary)}`,
    `lang: ${lang}`,
    `story: ${story}`,
    `publishedAt: ${new Date().toISOString()}`,
    `sourceUrl: ${yaml(item.url)}`,
    `sourceName: ${yaml(item.sourceName)}`,
    `priority: ${item.score >= 85 ? 'flash' : item.score >= 72 ? 'urgent' : 'routine'}`,
    `tags: [${meta.tags.join(', ')}]`,
    `generatedBy: ${MODEL}`,
    '---',
    '',
  ].join('\n');

  return `${front}${body.trim()}\n`;
}

async function main() {
  console.log(`PIIA · tirada del ${new Date().toISOString().slice(0, 10)} · modelo ${MODEL}`);

  console.log('\nLeyendo fuentes...');
  const fresh = await collect({ hours: 36 });
  console.log(`  ${fresh.length} entradas recientes`);

  const seen = await loadSeen();
  const candidates = fresh.filter((item) => !seen.has(fingerprint(item.url))).slice(0, 60);
  console.log(`  ${candidates.length} sin publicar todavía`);

  if (candidates.length === 0) {
    console.log('\nNada nuevo. No se publica.');
    return;
  }

  console.log('\nSeleccionando...');
  const picked = await select(candidates, { min: MIN, max: MAX });
  console.log(`  ${picked.length} seleccionadas`);

  if (picked.length === 0) {
    console.log('\nNada superó el umbral. Mejor no publicar que rellenar.');
    return;
  }

  let written = 0;

  for (const item of picked) {
    console.log(`\n· ${item.title.slice(0, 70)} (${item.score})`);

    try {
      const facts = await research(item);

      const bodies = {};
      for (const lang of ['es', 'en']) {
        bodies[lang] = await draft({ item, facts, lang });
      }

      const metas = {};
      for (const lang of ['es', 'en']) {
        metas[lang] = await headline({ body: bodies[lang], lang });
      }

      if (!metas.es.title || !metas.en.title) {
        throw new Error('El modelo no devolvió titular en los dos idiomas');
      }

      const story = toStory(metas.en.title) || fingerprint(item.url);

      for (const lang of ['es', 'en']) {
        const markdown = toMarkdown({
          meta: metas[lang],
          body: bodies[lang],
          lang,
          story,
          item,
        });

        if (dry) {
          console.log(`  [dry] ${lang}: ${metas[lang].title}`);
          continue;
        }

        await mkdir(`src/content/news/${lang}`, { recursive: true });
        await writeFile(`src/content/news/${lang}/${story}.md`, markdown, 'utf8');
      }

      seen.add(fingerprint(item.url));
      written += 1;
      console.log(`  publicado como ${story}`);
    } catch (error) {
      // Un despacho que falla no arrastra al resto de la tirada.
      console.warn(`  descartado: ${error.message}`);
    }
  }

  if (!dry) {
    await saveSeen(seen);
  }

  console.log(`\n${written} despacho(s) escritos.`);

  if (written === 0) {
    // Que no salga nada es un resultado posible, pero si nunca sale nada hay un
    // fallo real detrás. El código de salida lo hace visible en Actions.
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`\nFallo la tirada: ${error.message}`);
  process.exit(1);
});
