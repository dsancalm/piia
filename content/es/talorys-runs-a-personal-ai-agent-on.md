---
title: "Talorys despliega un asistente IA personal en Cloudflare gratis y sin servidores"
summary: "Un único comando instala Worker privado, frontend en Pages y Durable Object con SQLite. Usa Workers AI con GLM-4.7-flash, funciona offline si se agota la cuota y permite backups, actualizaciones y diagnóstico sin salir del plan gratuito."
lang: es
story: talorys-runs-a-personal-ai-agent-on
publishedAt: 2026-10-11T13:14:23.148Z
sourceUrl: "https://github.com/rociiu/talorys"
sourceName: "Hacker News (portada)"
priority: flash
tags: [cloudflare, ia, durable-objects, workers]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Talorys es un asistente de IA personal que se despliega con un solo comando dentro de tu cuenta de Cloudflare y funciona íntegramente en el plan gratuito. No hay servidores que gestionar, ni bases de datos externas, ni cuentas en plataformas de terceros. El instalador (`npx create-talorys@latest`) verifica Node.js 22+, inicia sesión vía OAuth, pide una contraseña de propietario (hasheada con PBKDF2-SHA256 y guardada como secreto), genera nombres de recursos únicos y despliega tanto el Worker privado como el frontend en Pages. Al terminar, imprime la URL `*.pages.dev` donde ya está operativo.

La arquitectura es deliberadamente simple: el navegador habla con una Pages Function (`/api`) que usa un *service binding* hacia un Worker privado (Hono) sin URL pública (`workers_dev: false`, `preview_urls: false`). Ese Worker instancia un único Durable Object llamado `personal-agent` que contiene toda la lógica (`TalorysAgent`), el almacenamiento SQLite (conversaciones, memorias, tareas, notas, proyectos, automatizaciones, sesiones, ajustes, uso) y las alarmas para recordatorios y rutinas. Workers AI provee el modelo `@cf/zai-org/glm-4.7-flash` para chat en streaming (SSE de extremo a extremo) y *tool calling*. La autenticación y autorización ocurren en el Worker, no en el frontend.

```text
Browser ──HTTPS──▶ Cloudflare Pages (React app + /api Pages Function)
│ service binding (no public URL)
▼
Private Worker (Hono router)
│ getAgentByName("personal-agent")
▼
TalorysAgent — Cloudflare Agents SDK Durable Object
├─ SQLite: conversations, memories, tasks, notes, projects,
│ automations, sessions, settings, usage
├─ Workers AI: @cf/zai-org/glm-4.7-flash (streaming + tool calling)
└─ Alarms: reminders and recurring schedules
```

Todo cabe en el tier gratuito: Pages (frontend + Functions), Workers (API privada), Durable Objects con SQLite (datos y alarmas) y Workers AI. No se tocan R2, D1, KV, Vectorize, AI Search, Workflows ni servicios de pago. Si se agota la cuota diaria de Neurons, el chat avisa y reanuda al reinicio diario; tareas, notas, memorias y recordatorios siguen funcionando sin IA. En Settings > AI hay guardrails configurables: máximos de tokens de salida y contexto, llamadas a herramientas, pasos de razonamiento, peticiones IA/día y ejecuciones programadas/día. Los recordatorios simples y los digestos nunca consumen IA.

El proyecto incluye desarrollo local completo (`npm run dev` levanta Worker en 8787, proxy Pages en 8787 y Vite en 5173 con proveedor IA mock determinista y estado en `.wrangler/state`), backup/importación transaccional (`talorys-backup.json` sin credenciales), actualizaciones in-place (`npx create-talorys@latest update` con migraciones append-only automáticas), reset de contraseña (`reset-password` rota secreto y cierra sesiones) y comandos `status` y `doctor` para diagnóstico. La instalación es reentrante: re-ejecutar el instalador reanuda sin duplicar recursos ni volver a pedir contraseña. También admite modo no interactivo con variables de entorno (`TALORYS_OWNER_PASSWORD`, `--yes`, `--account-id`) y token API con permisos acotados (Workers Scripts Edit, Pages Edit, Workers AI Read, Account Settings Read, User Details Read opcional).

## Lo que no se sabe

- Cuota exacta diaria de Neurons en el plan gratuito actual de Cloudflare Workers AI.
- Límites numéricos concretos de peticiones/día, uso de Durable Objects y almacenamiento SQLite en plan gratuito.
- Tiempo típico de propagación de health checks para nuevos sitios `*.pages.dev`.
- Detalles de la política de privacidad y términos de Workers AI de Cloudflare.
- Esquema exacto de las migraciones append-only de la base de datos.
- Rendimiento y latencia típica del chat end-to-end con streaming SSE.
- Capacidad máxima de memorias, tareas, notas, proyectos y automatizaciones antes de degradación.
- Soporte para modelos de IA distintos a `@cf/zai-org/glm-4.7-flash`.
- Procedimiento de migración de datos entre cuentas de Cloudflare.
- Compatibilidad con Cloudflare Access / Zero Trust para exponer el agente de forma privada.
