/**
 * Texto plano a partir de HTML.
 *
 * Lo usan las dos entradas del pipeline: el extracto que viene dentro del RSS
 * y el artículo original que se descarga. Antes había una copia en cada sitio y
 * las dos decodificaban las entidades en orden distinto.
 */

/**
 * Decodifica las entidades con `&amp;` al final.
 *
 * El orden importa: si `&amp;` va primero, `&amp;lt;` se convierte en `&lt;` y
 * de ahí en `<`. El original decía `&lt;` como texto, no una etiqueta.
 */
const decode = (html) =>
  html
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');

/** Quita las etiquetas y devuelve el texto en una sola línea. */
export function stripTags(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}
