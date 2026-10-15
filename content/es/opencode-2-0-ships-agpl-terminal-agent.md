---
title: "OpenCode 2.0 lanza su API de cliente y se publica bajo licencia AGPL-3.0"
summary: "El agente de terminal escrito en Go permite usar cualquier LLM y gestiona archivos, Git y tests sin depender de un solo proveedor. La versión 2.0 introduce un modelo de servicios en `@opencode/client` que cambia cómo se crean sesiones y se envían prompts, aunque el anuncio..."
lang: es
story: opencode-2-0-ships-agpl-terminal-agent
publishedAt: 2026-10-15T11:52:48.483Z
sourceUrl: "https://anoma.ly/notes/opencode-2-0/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [opencode, agente, terminal, go]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenCode 2.0 se publica bajo licencia AGPL-3.0 como agente de código que se ejecuta en la terminal y permite usar cualquier LLM a través de su API. El programa gestiona archivos, operaciones de Git, ejecución de tests y shells, y se presenta como alternativa a Cursor o Claude Code sin atadura a un proveedor único. La arquitectura está escrita en Go y diseñada para ser extensible.

El cambio más relevante para quien integre o construya sobre OpenCode es la nueva API de cliente. El paquete `@opencode/client` introduce un modelo basado en servicios que reemplaza la forma anterior de inicializar la conexión y manejar sesiones. El flujo típico ahora requiere obtener un *endpoint* del servicio local, crear el cliente con la URL base y las cabeceras correspondientes, abrir una sesión vinculada al directorio de trabajo actual y enviar *prompts* referenciando el identificador de esa sesión.

```typescript
import { OpenCode } from "@opencode/client"
import { Service } from "@opencode/client/service"

const endpoint = await Service.ensure()
const client = OpenCode.make({
  baseUrl: endpoint.url,
  headers: Service.headers(endpoint),
})

const session = await client.session.create({
  location: { directory: process.cwd() },
})

await client.session.prompt({
  sessionID: session.id,
  text: "Review the current changes",
})
```

El ecosistema se completa con `@opencode/codemode` y `@opencode/sdk`, aunque la documentación pública no detalla aún sus interfaces ni el alcance exacto de las "múltiples nuevas características, mejoras de rendimiento y correcciones de errores" mencionadas en el anuncio.

## Qué no se sabe

- Cuántos millones de usuarios diarios respaldan la cifra citada.
- Qué características concretas se han añadido más allá de la nueva API de cliente.
- Métricas de rendimiento o *benchmarks* comparativos.
- Lista de errores corregidos.
- Cómo se evalúa la "adaptabilidad a las necesidades de los agentes" que se menciona como objetivo de diseño.
