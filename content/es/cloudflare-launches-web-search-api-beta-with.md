---
title: "Cloudflare lanza en beta una API de búsqueda web unificada para agentes de IA"
summary: "La Web Search API centraliza logs, autenticación y facturación en AI Gateway y permite elegir entre Ceramic.ai, Exa y Linkup por petición sin recargo de plataforma."
lang: es
story: cloudflare-launches-web-search-api-beta-with
publishedAt: 2026-10-05T15:08:16.373Z
sourceUrl: "https://developers.cloudflare.com/changelog/post/2026-10-02-introducing-web-search-api/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [cloudflare, api, busqueda, ia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare ha lanzado en beta la Web Search API, una interfaz REST que permite a agentes y aplicaciones de IA obtener resultados de búsqueda en tiempo real sin tener que integrar y facturar por separado servicios como SerpAPI, Brave Search o Google Custom Search. La llamada se enruta a través de AI Gateway: los logs, la autenticación y la facturación se centralizan en la cuenta de Cloudflare, y el coste es el precio de lista del proveedor elegido sin recargo de la plataforma.

Al lanzamiento hay tres proveedores disponibles: Ceramic.ai, Exa y Linkup. Los tres ofrecen retención de datos cero (Zero Data Retention) para las peticiones que pasan por Cloudflare y cumplen los estándares de rastreo de bots verificados de la red. El desarrollador elige el proveedor en cada petición mediante el parámetro `provider`. También es posible utilizar una clave propia del proveedor (bring your own key), aunque la documentación no detalla aún cómo se configura ni si eso anula la facturación unificada por AI Gateway.

La invocación directa por REST requiere el identificador de cuenta y un token de API de Cloudflare con permisos de AI Gateway:

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/websearch/ \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "query": "What are some fun things to do in Salt Lake City as fall approaches?",
    "provider": "ceramic",
    "limit": 5,
    "options": { "gateway": { "id": "default" } }
  }'
```

Desde un Worker se usa el binding de AI, que evita manejar credenciales en el código:

```javascript
const response = await env.AI.websearch({
  gatewayId: "default",
  query: "What are some fun things to do in Salt Lake City as fall approaches?",
  provider: "exa",
  limit: 5,
});
const results = await response.json();
```

La respuesta devuelve un objeto JSON cuyo esquema exacto (campos, paginación, metadatos) no se ha publicado. Tampoco se conocen los precios de lista de Ceramic.ai, Exa y Linkup, los límites de cuota en beta, la fecha prevista de disponibilidad general ni si se añadirán más proveedores.
