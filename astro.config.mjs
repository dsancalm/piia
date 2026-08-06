// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Un bloque de código con scroll horizontal tiene que poder recorrerse con el
 * teclado: sin esto, quien no usa ratón no llega al final de un comando largo.
 */
function scrollableCodeBlocks() {
  return (tree, file) => {
    // El label se anuncia en el idioma de la página: el archivo vive bajo
    // news/es/ o news/en/.
    const path = String(file?.path ?? file?.history?.[0] ?? '');
    const label = /news[\\/]en[\\/]/.test(path) ? 'Code block' : 'Bloque de código';
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'pre') {
        node.properties = {
          ...node.properties,
          tabindex: '0',
          role: 'region',
          'aria-label': label,
        };
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://dsancalm.github.io',
  base: '/piia',
  markdown: {
    shikiConfig: {
      // Tema oscuro para los bloques de código: es lo que el lector copia a su
      // terminal, y se mantiene oscuro dentro del mundo claro del servicio.
      theme: 'github-dark-default',
      wrap: false,
    },
    rehypePlugins: [scrollableCodeBlocks],
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
