---
title: "OpenAI Python SDK switches default HTTP layer to HTTPX2"
summary: "The SDK now installs HTTPX2 instead of HTTPX, using the OS trust store for TLS by default. This breaks verification in minimal containers or behind corporate proxies unless you set SSL_CERT_FILE or pass a custom SSLContext."
lang: en
story: openai-python-sdk-switches-default-http-layer
publishedAt: 2026-08-28T18:58:18.917Z
sourceUrl: "https://github.com/openai/openai-python/blob/main/httpx2.md"
sourceName: "Hacker News (portada)"
priority: flash
tags: [openai, python, http, tls]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The OpenAI Python SDK has switched its default HTTP layer from `httpx` to `httpx2`. The new package installs automatically with `pip install openai`; the legacy `httpx` package is no longer a dependency. If you rely on the SDK's default client, your API calls, response models, streaming, authentication, retries, and numeric timeouts continue to work unchanged. The breaking changes live in the transport details.

The most immediate impact is TLS verification. HTTPX2 uses the operating system trust store by default instead of the `certifi` CA bundle. The SDK no longer installs `certifi`. This breaks certificate verification in minimal container images that lack system CAs, behind corporate TLS proxies, or in deployments that relied on a custom `certifi` bundle. You can restore a specific bundle with environment variables:

```bash
export SSL_CERT_FILE=/path/to/ca-bundle.pem
export SSL_CERT_DIR=/path/to/ca-directory
```

These are honored when `trust_env=True`, which is the default. For explicit control inside code, pass an `ssl.SSLContext` via the `verify` parameter on `DefaultHttpx2Client` or `DefaultAsyncHttpx2Client`.

If you provide a custom HTTP client, you must now use HTTPX2 types: `httpx2.Client`, `httpx2.AsyncClient`, `httpx2.Timeout`, `httpx2.URL`, `httpx2.Limits`, `httpx2.HTTPTransport`, and so on. The SDK supplies `DefaultHttpx2Client` and `DefaultAsyncHttpx2Client` helpers that preserve the recommended defaults for timeouts, connection pooling, and redirects. The old helper names `DefaultHttpxClient` and `DefaultAsyncHttpxClient` still function but construct HTTPX2 clients; prefer the suffixed names. Module-level configuration follows the same pattern:

```python
import openai
openai.http_client = openai.DefaultHttpx2Client()
```

Authentication handlers and event hooks now receive `httpx2.Request` and `httpx2.Response` objects. Update any custom auth classes and type annotations accordingly. Parsed response models from the SDK are unchanged. When using a native HTTPX2 client, `response.http_response` is an `httpx2.Response` and `response.http_request` is an `httpx2.Request`. For raw responses, use `cast_to=httpx2.Response`. Streaming wrappers also expose HTTPX2 objects.

Application code should catch SDK exceptions such as `openai.APITimeoutError` and `openai.APIConnectionError`. With a native HTTPX2 client, the underlying transport cause is an HTTPX2 exception.

The `aiohttp` extra installs a native HTTPX2 transport; it does not install legacy `httpx` or the external `httpx-aiohttp` adapter. Install it with `pip install 'openai[aiohttp]'` and use `DefaultAioHttpClient()`, which returns an `httpx2.AsyncClient`.

Test mocks must intercept HTTPX2 requests and return HTTPX2 responses, for example with `httpx2.MockTransport`. If your suite uses RESPX, upgrade to a version compatible with HTTPX2 or fork it; a version that only patches legacy `httpx` cannot intercept the SDK's default client.

A temporary escape hatch exists: install legacy `httpx` explicitly and inject a `httpx.Client` or `httpx.AsyncClient`. Static type checkers (mypy, Pyright) will fail; you need `cast(Any, ...)` or type ignores. Legacy clients preserve the `httpx` request, response, and exception families. For raw responses with a legacy client, use `cast_to=cast(Any, httpx.Response)`. Passing `cast_to=httpx2.Response` does not convert a legacy response. Legacy support is runtime-only, provided as a migration aid, and may be discontinued. If you must retain an existing `httpx-aiohttp` integration, install it explicitly and inject its legacy client.

What is not known
- Minimum SDK version that includes this change.
- Exact HTTPX2 version pinned as a dependency.
- Release date or version milestone where HTTPX2 becomes mandatory.
- Supported Python versions.
- Whether the public SDK API surface changed beyond the HTTP layer.
- Comparative performance (latency, throughput, memory) between legacy `httpx` and HTTPX2 in the SDK.
- Exhaustive list of behavioral differences between the OS trust store and `certifi` for specific certificates.
- Whether `trust_env=True` is configurable or forced to `True` in the default client.
- Which RESPX versions are compatible with HTTPX2.
- Estimated timeline for discontinuing legacy `httpx` support.
- Whether an automated codemod exists to rewrite `httpx` imports to `httpx2`.
