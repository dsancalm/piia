/**
 * Comprueba la cascada de modelos: que pasa al siguiente cuando uno falla y que
 * anota cuál respondió. Sin esto, un cambio en el bucle rompe la tirada y solo
 * se nota a las 6 de la mañana siguiente.
 *
 *   node --test scripts/lib/openrouter.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';

process.env.OPENROUTER_API_KEY = 'test';
process.env.OPENROUTER_MODELS = 'uno,dos,tres';

const { complete, MODELS } = await import('./openrouter.mjs');
const openrouter = await import('./openrouter.mjs');

/** Sustituye fetch por una función que responde según el modelo pedido. */
function stub(responder) {
  const calls = [];
  globalThis.fetch = async (_url, options) => {
    const { model } = JSON.parse(options.body);
    calls.push(model);
    return responder(model);
  };
  return calls;
}

const ok = (text) =>
  new Response(JSON.stringify({ choices: [{ message: { content: text } }] }), { status: 200 });

test('la lista se lee de OPENROUTER_MODELS', () => {
  assert.deepEqual(MODELS, ['uno', 'dos', 'tres']);
});

test('el segundo modelo atiende cuando el primero da 429', async () => {
  const calls = stub((model) => (model === 'uno' ? new Response('limitado', { status: 429 }) : ok('bien')));

  assert.equal(await complete({ system: 's', user: 'u' }), 'bien');
  // Dos intentos contra 'uno' antes de rendirse con él.
  assert.deepEqual(calls, ['uno', 'uno', 'dos']);
  assert.equal(openrouter.MODEL, 'dos');
});

test('un 400 descarta el modelo sin reintentarlo', async () => {
  const calls = stub((model) => (model === 'uno' ? new Response('mal', { status: 400 }) : ok('bien')));

  assert.equal(await complete({ system: 's', user: 'u' }), 'bien');
  assert.deepEqual(calls, ['uno', 'dos']);
});

test('si fallan los tres, lanza', async () => {
  const calls = stub(() => new Response('limitado', { status: 429 }));

  await assert.rejects(complete({ system: 's', user: 'u' }), /Ningún modelo respondió/);
  assert.equal(calls.length, 6);
});
