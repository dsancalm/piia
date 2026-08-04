---
title: "FFmpeg 9.0 llega con cambios de API y nuevas opciones"
summary: "La nueva versión mayor de FFmpeg ya está disponible, con cambios de API que pueden romper compilaciones y nuevas opciones en la línea de comandos. Las notas de lanzamiento están en GitHub, y los desarrolladores deben revisarlas antes de actualizar."
lang: es
story: ffmpeg-9-0-ships-with-api-breaks
publishedAt: 2026-08-04T11:36:11.319Z
sourceUrl: "https://github.com/FFmpeg/FFmpeg/blob/n9.0/RELEASE_NOTES"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ffmpeg, lanzamiento, software]
generatedBy: deepseek/deepseek-v4-flash-0731
---
FFmpeg 9.0 ya está disponible. La noticia ha llegado por Hacker News, donde el anuncio acumula 198 puntos y 33 comentarios. Las notas de lanzamiento completas están en el repositorio oficial de GitHub, en la rama n9.0.

Si trabajas con FFmpeg, una versión mayor como esta suele implicar cambios de API que rompen la compilación de tu código, nuevas opciones en la línea de comandos que alteran el comportamiento de tus pipelines, y un puñado de filtros nuevos o mejorados. La versión 8.0 salió hace menos de un año, así que el ritmo de cambios se mantiene alto.

## Qué esperar de una versión mayor

FFmpeg sigue un esquema de versionado donde el número mayor cambia cuando hay incompatibilidades. Eso significa que algunas funciones marcadas como obsoletas en versiones anteriores pueden haber desaparecido, y que las bibliotecas como libavcodec o libavformat pueden haber cambiado sus firmas. Si compilas contra ellas, tocará revisar el código.

También es habitual que las versiones mayores traigan mejoras de rendimiento en decodificadores y codificadores. Para quien procesa vídeo en servidores o en pipelines de análisis, eso se traduce en menos tiempo de CPU por frame, o en la posibilidad de usar hardware de forma más eficiente.

Los filtros de audio y vídeo son otra zona donde FFmpeg mueve ficha con frecuencia. Nuevos filtros, parámetros añadidos a los existentes o cambios en la sintaxis de las cadenas de filtros pueden romper scripts que llevaban tiempo funcionando. Si tienes un pipeline que depende de un filtro concreto, esta es la versión en la que toca probar antes de actualizar en producción.

## Cómo comprobar los cambios

El sitio oficial de FFmpeg suele publicar un documento de cambios detallado junto a cada lanzamiento. En el repositorio de GitHub, la rama n9.0 contiene las notas de lanzamiento que menciona el anuncio. Ahí encontrarás la lista completa de lo que ha cambiado, incluyendo las nuevas APIs y las funciones eliminadas. Es el primer sitio donde mirar si tienes dudas sobre compatibilidad.

La comunidad en Hacker News lleva 33 comentarios discutiendo el lanzamiento. Es un número bajo comparado con otros anuncios, pero puede servir para ver qué problemas de compilación o qué regresiones están encontrando otros desarrolladores antes de que tú las sufras.

## Lo que no se sabe

Las notas de lanzamiento están publicadas, pero no se ha confirmado qué cambios concretos incluye la versión 9.0 respecto a la 8.x. Tampoco se sabe la fecha exacta de lanzamiento ni qué novedades son las que más afectan a desarrolladores. Para eso tendrás que leer las notas tú mismo.
