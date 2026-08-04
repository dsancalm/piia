// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Un bloque de código con scroll horizontal tiene que poder recorrerse con el
 * teclado: sin esto, quien no usa ratón no llega al final de un comando largo.
 */
function scrollableCodeBlocks() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'pre') {
        node.properties = {
          ...node.properties,
          tabindex: '0',
          role: 'region',
          'aria-label': 'Bloque de código',
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
      // Tema oscuro para los bloques de código, que en este zine son la fotocopia
      // de la pantalla pegada sobre el papel.
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
