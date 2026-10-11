---
title: "El tráfico de bots de Yandex se desploma en Cloudflare Radar"
summary: "La vista de AS13238 muestra una caída vertical en siete días, coincidente con un incidente en su centro de datos. Sin cifras exactas ni causa confirmada, los modelos de reputación y WAF calibrados con ese volumen histórico pueden empezar a fallar."
lang: es
story: hacker-news-debates-bot-traffic-drop-after
publishedAt: 2026-10-11T13:23:19.281Z
sourceUrl: "https://radar.cloudflare.com/bots/as13238?dateRange=7d"
sourceName: "Hacker News (portada)"
priority: routine
tags: [cloudflare, yandex, bots, waf]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un enlace en Hacker News apunta a la vista de Cloudflare Radar filtrada por el AS13238 (Yandex), con la opción de tráfico de bots activada y un rango de siete días. El autor del envío afirma que se observa una caída repentina coincidente con un ataque a un centro de datos de Yandex. La publicación acumula 274 puntos y 106 comentarios, lo que indica que la comunidad ha detectado la anomalía y está debatiendo su alcance.

La gráfica de Radar muestra una línea que baja en vertical en el intervalo reciente. Cloudflare no publica en esa vista el porcentaje exacto ni el volumen absoluto, así que no hay una cifra concreta para introducir en un modelo de capacidad. Tampoco se sabe si el descenso afecta a todo el AS13238 o solo a prefijos concretos, ni si el origen es un daño físico en el datacenter, un corte de fibra, una mitigación deliberada por parte de Yandex o un error de configuración en el anuncio BGP. Los 106 comentarios no se han volcado aquí; pueden contener trazas, capturas de BGPmon o hipótesis sobre la causa raíz, pero no forman parte de los hechos verificados.

## Qué cambia para quien opera defensas anti-bot

Si Yandex es una fuente habitual de tráfico automatizado en tu perímetro, la línea base de detección se ha movido. Un WAF o un rate-limiter calibrado con el volumen histórico de ese AS puede empezar a generar falsos negativos (tráfico legítimo que ahora parece anómalamente bajo) o falsos positivos (reglas que esperaban más ruido del que llega). La dependencia de un único proveedor grande como origen de bots concentra el riesgo: un evento de infraestructura en su red altera la señal global que usan los modelos de reputación de IP y los sistemas de scoring de Cloudflare, Akamai, Fastly o soluciones on-premise que consumen feeds de amenaza.

Para ajustar la configuración, exporta la serie temporal de Radar (API o CSV) y compara los últimos siete días con la ventana anterior. Busca el punto de inflexión y mide la delta en peticiones por segundo y en puntuación de bot score. Si usas listas de bloqueo basadas en ASN, evalúa si mantener el AS13238 en ellas sigue teniendo sentido mientras la emisión está deprimida, o si conviene bajar el umbral de scoring para ese rango hasta que el tráfico se recupere o se confirme la causa.

## Lo que no se sabe

- Magnitud exacta de la caída (porcentaje o peticiones por segundo).
- Fecha y naturaleza confirmada del incidente en el datacenter de Yandex.
- Alcance: todo el AS13238 o solo prefijos específicos.
- Causa técnica verificada: daño físico, corte de red, mitigación intencional, error BGP u otra.
- Contenido y conclusiones de los 106 comentarios en Hacker News.
