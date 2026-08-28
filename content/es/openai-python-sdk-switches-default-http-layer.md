---
title: "El SDK de Python de OpenAI cambia a HTTPX2 y rompe TLS en contenedores mínimos"
summary: "El SDK deja de instalar certifi y usa el almacén de certificados del sistema. Contenedores distroless, proxies corporativos y bundles personalizados fallan al validar certificados. Se arregla con SSL_CERT_FILE o SSL_CERT_DIR, o pasando un SSLContext al cliente."
lang: es
story: openai-python-sdk-switches-default-http-layer
publishedAt: 2026-08-28T18:58:18.916Z
sourceUrl: "https://github.com/openai/openai-python/blob/main/httpx2.md"
sourceName: "Hacker News (portada)"
priority: flash
tags: [openai, python, tls, httpx2]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El SDK de Python de OpenAI ha cambiado su motor HTTP interno de `httpx` a `httpx2`. El paquete `httpx` ya no se instala como dependencia; ahora viene `httpx2` incluido en `openai`. Si usas el cliente por defecto, las llamadas a la API, el streaming, la autenticación, los reintentos y los timeouts numéricos siguen funcionando igual:

```python
from openai import OpenAI

client = OpenAI(timeout=30.0)
response = client.responses.create(model="gpt-5.5", input="Hello")
```

El cambio crítico está en la verificación TLS. HTTPX2 usa el almacén de certificados del sistema operativo en lugar del bundle `certifi` que traía la versión anterior. El SDK ya no instala `certifi`. Esto rompe la validación de certificados en contenedores mínimos (tipo `distroless` o `scratch`) que no llevan CAs del sistema, en entornos con proxies TLS corporativos o en despliegues que dependían de un bundle `certifi` personalizado.

Para arreglarlo sin tocar código, define las variables de entorno que HTTPX2 respeta cuando `trust_env=True` (valor por defecto):

```bash
export SSL_CERT_FILE=/path/to/ca-bundle.pem
export SSL_CERT_DIR=/path/to/ca-directory
```

Si necesitas control explícito en un cliente personalizado, pasa un `ssl.SSLContext` mediante el parámetro `verify` de `DefaultHttpx2Client` o `DefaultAsyncHttpx2Client`. El transporte `aiohttp` del SDK (`pip install 'openai[aiohttp]'`) usa los mismos ajustes TLS.

## Clientes personalizados y helpers

Si inyectas tu propio cliente HTTP, debes usar tipos de HTTPX2: `httpx2.Client`, `httpx2.AsyncClient`, `httpx2.Timeout`, `httpx2.URL`, `httpx2.Limits`, `httpx2.HTTPTransport`. El SDK expone `DefaultHttpx2Client` y `DefaultAsyncHttpx2Client` para preservar los valores recomendados de timeout, pool de conexiones y redirecciones. Los nombres antiguos `DefaultHttpxClient` y `DefaultAsyncHttpxClient` siguen funcionando pero construyen clientes HTTPX2; se prefieren los sufijos `2`.

La configuración a nivel de módulo sigue la misma regla:

```python
import openai
openai.http_client = openai.DefaultHttpx2Client()
```

## Autenticación, hooks y respuestas raw

Los handlers de autenticación y los event hooks reciben ahora `httpx2.Request` y `httpx2.Response`. Hay que actualizar clases auth personalizadas y anotaciones de tipo. Los modelos de respuesta parseados del SDK no cambian.

Al usar un cliente HTTPX2 nativo, `response.http_response` es `httpx2.Response` y `response.http_request` es `httpx2.Request`. Para respuestas sin parsear:

```python
response = client.responses.create(
    model="gpt-5.5",
    input="Hello",
    cast_to=httpx2.Response
)
```

Los wrappers de streaming también exponen objetos de respuesta HTTPX2.

## Excepciones y type-checking

El código de aplicación debe capturar excepciones del SDK: `openai.APITimeoutError`, `openai.APIConnectionError`, etc. Con un cliente HTTPX2 nativo, la causa de transporte subyacente (`__cause__`) es una excepción de HTTPX2.

Estas garantías de tipos solo aplican a clientes HTTPX2 nativos. Si inyectas un cliente legacy `httpx`, obtienes `httpx.Request`, `httpx.Response` y excepciones de transporte de `httpx`.

## Tests y mocks

Los mocks deben interceptar requests HTTPX2 y devolver responses HTTPX2. Ejemplo con `httpx2.MockTransport`:

```python
import httpx2
from openai import OpenAI

transport = httpx2.MockTransport(lambda request: httpx2.Response(200, json={"ok": True}))
client = OpenAI(http_client=httpx2.Client(transport=transport))
```

Si la suite usa RESPX, hay que actualizar a una versión compatible con HTTPX2 o hacer fork; una versión que solo patchee `httpx` legacy no intercepta el cliente por defecto del SDK.

## Escape hatch legacy (temporal)

Se puede instalar `httpx` legacy explícitamente e inyectar un cliente legacy (`httpx.Client` o `httpx.AsyncClient`). Esto funciona en runtime pero falla el type-checking estático (mypy, Pyright); requiere `cast(Any, ...)` o `type: ignore`. Para respuestas raw con cliente legacy:

```python
cast_to=cast(Any, httpx.Response)
```

Pasar `cast_to=httpx2.Response` no convierte una response legacy en HTTPX2. El soporte legacy es solo runtime, se provee como ayuda de migración y puede discontinuarse. Si se debe retener una integración `httpx-aiohttp` existente, hay que instalarla explícitamente e inyectar su cliente legacy.

## Lo que no se sabe

- Versión mínima del SDK de OpenAI que incluye este cambio.
- Versión exacta de HTTPX2 que se instala como dependencia.
- Fecha de lanzamiento o hito de versión donde HTTPX2 se vuelve obligatorio.
- Detalles de compatibilidad hacia atrás: qué versiones de Python son soportadas.
- Si hay cambios en la superficie de la API pública del SDK más allá de la capa HTTP.
- Rendimiento comparativo (latencia, throughput, memoria) entre HTTPX legacy y HTTPX2 en el SDK.
- Lista exhaustiva de diferencias de comportamiento entre el trust store del SO y `certifi` que puedan afectar a certificados específicos.
- Si `trust_env=True` es configurable o forzado a True en el cliente por defecto.
- Qué versiones de RESPX son compatibles con HTTPX2.
- Cronograma estimado para la discontinuación del soporte legacy HTTPX.
- Si hay migración automática de código (codemod) disponible para reemplazar imports de `httpx` por `httpx2`.
