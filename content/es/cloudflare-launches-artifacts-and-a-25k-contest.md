---
title: "Cloudflare lanza concurso para crear la próxima plataforma Git sobre Artifacts"
summary: "La open beta de Artifacts ya permite a clientes de Workers Paid crear repositorios programáticos con jurisdicción de datos y suscripciones a eventos. El reto reparte 25.000 dólares en créditos y viaje a San Francisco para los ganadores, con entrega hasta el 14 de octubre de..."
lang: es
story: cloudflare-launches-artifacts-and-a-25k-contest
publishedAt: 2026-10-04T12:45:22.626Z
sourceUrl: "https://blog.cloudflare.com/next-git-platform-on-cloudflare/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [cloudflare, artifacts, git, concurso]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare ha abierto la convocatoria para construir la próxima plataforma Git sobre su infraestructura serverless. El reto se apoya en Artifacts, un sistema de archivos versionado que habla Git de forma nativa y escala a millones de repositorios, ahora en open beta para clientes del plan Workers Paid. La propuesta no es un hosting Git tradicional: Artifacts permite crear y hacer fork de repositorios programáticamente, almacenar código y contexto de agentes, y ejecutar operaciones Git nativas desde Workers. La facturación del servicio arranca el 15 de octubre de 2026, basada en operaciones de repositorio y datos almacenados.

## Lo que permite Artifacts hoy

La beta incluye despliegue de repositorios Artifacts a Workers mediante Workers Builds, con entornos de producción y previews. Los bindings de Artifacts en Workers dan acceso a la gestión de repositorios y tokens. Hay suscripciones a eventos de repositorio (push, fork, clone y otros), jurisdicción de datos (EE. UU. o UE) al crear namespaces, y métricas en el dashboard y por API.

El código de ejemplo muestra el patrón que Cloudflare quiere fomentar: un agente recibe una tarea, hace fork del repositorio en una rama efímera, lee instrucciones de un archivo `AGENTS.md` y devuelve el token y la URL remota para que el agente trabaje.

```javascript
using project = await env.ARTIFACTS.get("my-project");
const { defaultBranch } = await project.info();
const workspace = await project.fork(`task-${crypto.randomUUID()}`);
using repo = await env.ARTIFACTS.get(workspace.name);
const instructions = await repo.readFile({
  ref: defaultBranch,
  path: "AGENTS.md",
});
const agentTask = {
  remote: workspace.remote,
  token: workspace.token,
  instructions: instructions ? await instructions.text() : null,
};
```

Otro fragmento ilustra cómo reaccionar a un push encolando un workflow de revisión:

```javascript
export default {
  async queue(batch, env) {
    for (const message of batch.messages) {
      const event = message.body;
      if (event.type !== "cf.artifacts.repo.pushed") continue;
      await env.REVIEW_WORKFLOW.create({
        params: {
          namespace: event.source.namespace,
          repo: event.source.repoName,
          ref: event.payload.ref,
          commit: event.payload.after,
        },
      });
    }
  },
};
```

La creación de namespaces con jurisdicción de datos se hace por API:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/artifacts/namespaces" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{"namespace":"my-eu-namespace","jurisdiction":"eu"}'
```

## Condiciones de la competición

El plazo de envío termina el 14 de octubre de 2026. Se exige un vídeo de 5 a 10 minutos, código fuente bajo licencia permisiva (MIT, Apache o BSD) e instrucciones de ejecución. Los tres mejores proyectos llevan hasta dos miembros cada uno a Cloudflare Connect en San Francisco; el primero recibe 25.000 dólares en créditos Cloudflare e invitación a la cena VIP del lunes.

## Lo que no se sabe

- Criterios exactos de evaluación y ponderación (creatividad, completitud, demo, código, etc.).
- Detalles de precios concretos de Artifacts (coste por operación, por GB almacenado, gratuito incluido).
- Límites técnicos de Artifacts (máx. repos por namespace, tamaño máx. repo, rate limits de API, latencia).
- Si la competición permite participar en solo o exige equipo, y restricciones geográficas/legales.
- Formato exacto de los eventos de Artifacts (campos completos del payload) más allá del ejemplo `cf.artifacts.repo.pushed`.
- Disponibilidad de Artifacts en planes Workers Free o Enterprise y cuotas asociadas.
- Cómo se gestiona la propiedad intelectual del código enviado (más allá de la licencia permisiva).
