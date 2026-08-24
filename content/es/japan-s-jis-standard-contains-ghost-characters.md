---
title: "Los caracteres fantasma de JIS X 0208 siguen vivos en Unicode"
summary: "Unos caracteres sin significado ni pronunciación, creados por errores de catalogación en 1978, se colaron en el estándar japonés y luego en Unicode. Pueden aparecer en cualquier texto digital y tu código debe manejarlos."
lang: es
story: japan-s-jis-standard-contains-ghost-characters
publishedAt: 2026-08-16T07:09:42.585Z
sourceUrl: "https://www.dampfkraft.com/ghost-characters.html"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [unicode, jis, caracteres]
generatedBy: deepseek/deepseek-v4-flash-0731
---
En 1978, el Ministerio de Economía, Comercio e Industria de Japón fijó una codificación que acabaría conociéndose como JIS X 0208. Dentro de ese estándar viven unos caracteres que no deberían existir: los llamados "caracteres fantasma" (幽霊文字). No tienen significado conocido, ni pronunciación, ni una fuente clara de la que procedan. Y sin embargo, están ahí, y han acabado en Unicode.

La historia se remonta a la catalogación de nombres de lugares japoneses. Una de las fuentes principales para esos caracteres era el *Overview of National Administrative Districts* (国土行政区画総覧), una lista exhaustiva de topónimos. La edición más reciente tiene siete volúmenes, cada uno de unas novecientas páginas. Con semejante volumen de datos, los errores eran inevitables.

Algunos fantasmas nacieron directamente de fallos de catalogación. El carácter 妛, por ejemplo, fue un error al intentar registrar "山 sobre 女". El carácter original, 𡚴, no se añadió a JIS ni a Unicode hasta mucho más tarde. Otros casos son más difíciles de rastrear. El único carácter sin precedente histórico ni fuente clara es 彁, que probablemente se creó como una lectura errónea de 彊.

En 1997 se lanzó una investigación para descubrir el origen de estos caracteres. No está claro si esa investigación llegó a identificar todas las procedencias o solo algunas. Lo que sí se sabe es que los caracteres fantasma no se quedaron en JIS. Cuando Unicode adoptó de forma general los estándares JIS, los incorporó también. Y Unicode tiene además su propio conjunto separado de caracteres fantasma, introducidos durante el proceso de unificación CJK.

Para quien programa, esto no es una curiosidad de archivo. Estos caracteres forman parte de los estándares de codificación que usas cada día. Pueden aparecer en texto digital, en bases de datos, en nombres de archivo o en entradas de usuario, y tu sistema tiene que manejarlos aunque no sepas qué significan. En la práctica, eso significa que un carácter que nadie sabe pronunciar puede colarse en una cadena, en un identificador o en una consulta, y tu código tiene que tratarlo como cualquier otro.

No hay código en la fuente original, así que no hay nada que copiar. Pero la próxima vez que veas un carácter raro en un log o en una respuesta de una API, piensa en 彁. Puede que esté ahí desde 1978, sin que nadie sepa por qué.

Lo que no se sabe: el texto no especifica cuántos caracteres fantasma hay en total en JIS X 0208, ni cuántos se originaron por errores de catalogación frente a otras causas. Tampoco detalla qué caracteres fantasma concretos están en Unicode además de los mencionados, ni si la investigación de 1997 identificó todos los orígenes o solo una parte.
