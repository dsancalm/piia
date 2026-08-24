/**
 * Comprueba el orden de decodificación de las entidades. Si `&amp;` se resuelve
 * antes que el resto, un `&amp;lt;` citado en la fuente acaba convertido en una
 * etiqueta y el texto miente sobre lo que decía el original.
 *
 *   node --test scripts/lib/html.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { stripTags } from './html.mjs';

test('un ampersand escapado no se convierte en etiqueta', () => {
  assert.equal(stripTags('<p>escribe &amp;lt;div&amp;gt; aqui</p>'), 'escribe &lt;div&gt; aqui');
});

test('quita etiquetas y colapsa los espacios', () => {
  assert.equal(stripTags('<h1>Uno</h1>\n\n<p>dos   tres</p>'), 'Uno dos tres');
});

test('descarta script, style, nav y footer con su contenido', () => {
  assert.equal(
    stripTags('<nav>menu</nav><p>cuerpo</p><script>var x=1</script><footer>pie</footer>'),
    'cuerpo',
  );
});

test('resuelve las dos formas del apostrofo', () => {
  assert.equal(stripTags('<p>it&#39;s y it&apos;s</p>'), "it's y it's");
});
