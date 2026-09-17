---
title: "Datasette 1.0a40 añade tareas en segundo plano y migra a httpx2"
summary: "La alpha incluye la corrección de seguridad de la 0.65.5 y cierra errores de la triada previa a la 1.0 estable. La novedad principal es `add_background_task()` para plugins, que ejecuta trabajo pesado sin bloquear el hilo HTTP, y el cliente interno pasa a ser..."
lang: es
story: datasette-1-0a40-adds-background-tasks-and
publishedAt: 2026-09-17T12:09:23.537Z
sourceUrl: "https://simonwillison.net/2026/Sep/16/datasette/"
sourceName: "Simon Willison"
priority: routine
tags: [datasette, python, plugins, testing]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Datasette 1.0a40 se publicó el 16 de septiembre de 2026. La versión incorpora la misma corrección de seguridad que la 0.65.5 y cierra un buen número de errores detectados durante la triada de issues preparatoria para la futura 1.0 estable.

La novedad principal para quien escribe plugins es `datasette.add_background_task()`. El método permite encolar trabajo pesado , exportaciones, transformaciones, llamadas a APIs externas, sin retener el hilo que atiende la petición HTTP. El autor de la contribución es Alex Garcia.

La migración a `httpx2` sustituye al cliente HTTP interno. El cambio habilita `datasette.client.get()` y el resto de la superficie de `httpx` para tests y automatización, con la API y el rendimiento de la versión 2 de la librería.

## Tareas en segundo plano

Un plugin registra la función que quiere ejecutar y la pasa al nuevo método:

```python
async def mi_tarea_larga(datasette, parametro):
    # trabajo costoso aquí
    pass

await datasette.add_background_task(mi_tarea_larga, "valor")
```

La llamada devuelve inmediatamente. Datasette gestiona la ejecución en un executor separado y expone utilidades para consultar el estado o cancelar la tarea.

## Cliente interno sobre httpx2

El objeto `datasette.client` es ahora una instancia de `httpx.AsyncClient`. Esto significa que cualquier test que simule peticiones contra la aplicación puede usar la API completa de `httpx` , timeouts, autenticación, streaming, eventos, sin capas intermedias.

```python
response = await datasette.client.get("/data.json")
assert response.status_code == 200
```

## Qué no se sabe

- Detalles concretos de la corrección de seguridad heredada de la 0.65.5.
- Lista exhaustiva de los bugs corregidos en esta alpha.
- Qué otras características de `httpx2` se aprovechan más allá del cliente de pruebas.
- Fecha estimada para la 1.0 estable.
- Posibles *breaking changes* en la API pública respecto a alphas anteriores.
