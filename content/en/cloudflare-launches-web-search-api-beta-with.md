---
title: "Cloudflare launches Web Search API beta with three providers"
summary: "The service routes live web queries through AI Gateway using Ceramic.ai, Exa, and Linkup, all meeting verified bot standards and zero data retention. Billing uses gateway credits at provider list prices with no markup, or you can supply your own API keys."
lang: en
story: cloudflare-launches-web-search-api-beta-with
publishedAt: 2026-10-05T15:08:16.374Z
sourceUrl: "https://developers.cloudflare.com/changelog/post/2026-10-02-introducing-web-search-api/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [cloudflare, api, search, ai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare released the Web Search API in beta on October 2, 2026. The service lets AI agents and applications query live web results through a single REST endpoint or a Workers binding. At launch three providers are available: Ceramic.ai, Exa, and Linkup. All three support Zero Data Retention for requests routed through Cloudflare and meet Cloudflare's verified bot crawling standards.

Requests flow through AI Gateway. They appear in gateway logs and are billed using AI Gateway credits at each provider's list price with no markup. You can also supply your own provider API key if you prefer to manage that relationship directly.

You can call the API with curl:

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/websearch/ \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "query": "What are some fun things to do in Salt Lake City as fall approaches?",
    "provider": "ceramic",
    "limit": 5,
    "options": {
      "gateway": { "id": "default" }
    }
  }'
```

From a Worker the binding looks like this:

```javascript
const response = await env.AI.websearch({
  gatewayId: "default",
  query: "What are some fun things to do in Salt Lake City as fall approaches?",
  provider: "exa",
  limit: 5,
});
const results = await response.json();
```

## What is not known

- List price for each provider and cost per request.
- Beta quotas or rate limits.
- General availability date and SLA terms.
- Details of the "bring your own provider API key" configuration and whether it bypasses AI Gateway billing.
- Geographic or language coverage per provider.
- Exact JSON response schema, including pagination and metadata fields.
- Whether additional providers are planned after launch.
