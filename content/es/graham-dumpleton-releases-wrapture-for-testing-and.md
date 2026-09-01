---
title: "Graham Dumpleton lanza wrapture para testear y trazar sin tocar el código"
summary: "El autor de wrapt publica una librería que usa monkeypatching estructurado para stubear respuestas en tests e instrumentar código en producción con OpenTelemetry, todo mediante una API declarativa y configuración externa."
lang: es
story: graham-dumpleton-releases-wrapture-for-testing-and
publishedAt: 2026-09-01T12:10:33.574Z
sourceUrl: "https://simonwillison.net/2026/Aug/31/introducing-wrapture/"
sourceName: "Simon Willison"
priority: urgent
tags: [python, testing, observabilidad, monkeypatching]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Graham Dumpleton, autor de *wrapt* y del agente de Python de New Relic, ha publicado *wrapture*, una librería que lleva el monkeypatching estructurado de *wrapt* al terreno del testing y el tracing simultáneos. La idea central: envolver cualquier función o método , propio o ajeno, para interceptar llamadas, modificar valores de retorno o volcar trazas completas sin tocar una línea del código observado.

El proyecto tiene apenas unas semanas de vida (a 31 de agosto de 2026) y Dumpleton señala que cada línea, incluida la documentación, fue generada por un asistente de IA bajo su dirección, no mediante *vibe coding*.

## Testing sin *unittest.mock*

*wrapture* propone una API declarativa que sustituye a *unittest.mock* en casos donde el objetivo es fijar respuestas o transformar resultados reales.

```python
def test_stub_with_wrapture():
    with wrapture.binding(Gateway, "charge").on_call.returns({"id": "stub", "amount": 0}):
        assert OrderService().place(500)["id"] == "stub"
```

El contexto `with` garantiza que el parche se aplique y se retire automáticamente. Si necesitas conservar el comportamiento original y solo mutar el resultado, usa `transforms_result`:

```python
def test_pinned_result_with_wrapture():
    charge = wrapture.binding(Gateway, "charge")
    charge.on_call.transforms_result(lambda r: {**r, "id": "ch_TEST"})
    with charge:
        assert OrderService().place(500) == {"id": "ch_TEST", "amount": 500}
```

Ambos patrones evitan el boilerplate de `patch.object` y `side_effect`, y funcionan sobre clases de terceros sin herencia ni inyección de dependencias.

## Tracing configurable con OpenTelemetry

La misma mecánica de *binding* sirve para instrumentar en producción. La configuración se expresa en bloques tipo INI/TOML que definen qué observar, qué capturar y dónde enviar los datos:

```
capture = " summary " [[ observe ]] target = " domain:Calculator " name = [ "outer" , "inner" ] [[ sink ]] type = " jsonlines " path = " trace.jsonl "
```

El ejemplo anterior instruye a *wrapture* para trazar los métodos `outer` e `inner` de la clase `Calculator` dentro del dominio `domain`, emitiendo líneas JSONL a `trace.jsonl`. El motor soporta exportadores OpenTelemetry, por lo que la misma configuración puede redirigir trazas a Jaeger, Zipkin o un colector OTel sin cambiar el código de la aplicación.

## Lo que no se sabe

- Versión actual del paquete y fecha exacta de lanzamiento inicial.
- Licencia bajo la que se distribuye *wrapture*.
- Requisitos mínimos de versión de Python.
- Ubicación del repositorio (GitHub, GitLab, etc.) y su URL.
- Cobertura de pruebas y estado de CI/CD.
- Overhead real del tracing en producción.
- Compatibilidad con *pytest*, *unittest* u otras librerías de mocking.
- API pública completa más allá de los ejemplos mostrados.
- Gestión de configuración mediante variables de entorno o diccionarios en memoria.
- Soporte para *async/await* y *contextvars*.
