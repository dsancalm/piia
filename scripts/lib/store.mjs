import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const SEEN_PATH = 'data/seen.json';

/** La URL canónica identifica la noticia. Se normaliza para que los parámetros
 *  de campaña no hagan pasar por nueva una noticia ya publicada. */
export function fingerprint(url) {
  let clean = url;
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    parsed.search = '';
    parsed.hostname = parsed.hostname.replace(/^www\./, '');
    clean = parsed.toString().replace(/\/$/, '');
  } catch {
    // Una URL que no se puede interpretar se usa tal cual antes que perderla.
  }
  return createHash('sha256').update(clean).digest('hex').slice(0, 16);
}

export async function loadSeen() {
  try {
    const raw = await readFile(SEEN_PATH, 'utf8');
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export async function saveSeen(seen) {
  await mkdir(dirname(SEEN_PATH), { recursive: true });
  // Se conservan los últimos 4000 identificadores: suficiente para más de un año
  // al ritmo de publicación previsto, y mantiene el archivo pequeño.
  const kept = [...seen].slice(-4000);
  await writeFile(SEEN_PATH, `${JSON.stringify(kept, null, 0)}\n`, 'utf8');
}

/** Convierte un titular en un identificador de ruta estable y sin acentos. */
export function toStory(title) {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 7)
    .join('-')
    .slice(0, 60);
}
