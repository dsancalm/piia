---
title: "Los agentes de código eligen proveedores según el repo, no el prompt"
summary: "Un estudio con 16.893 ejecuciones muestra que Codex busca en la web el 94% de las veces, Cursor el 66% y Claude Code solo el 30%. Un mismo pedido de email dio cuatro ganadores distintos según el lenguaje: Resend en TypeScript, SendGrid en Python, Postmark en Go y Azure en..."
lang: es
story: ai-coding-agents-disagree-on-tool-choices
publishedAt: 2026-09-04T11:42:07.881Z
sourceUrl: "https://armature.tech/blog/which-tools-coding-agents-install"
sourceName: "Hacker News (portada)"
priority: flash
tags: [agentes, codigo, proveedores, estudio]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un estudio analiza 16.893 ejecuciones de agentes de codificación , Claude Code, Codex y Cursor, sobre 75 repositorios sintéticos en 10 lenguajes. El objetivo era observar cómo estos modelos eligen herramientas en la práctica. De esas corridas, 5.292 sesiones en 51 codebases y 18 sectores superaron la validación de un juez automatizado (Gemini 3.7 Flash), que evaluó conversaciones y diffs. El diseño incluía cuatro perfiles de usuario, tres proveedores de sandbox efímeros y un orquestador simulado que pedía análisis y recomendaciones antes de implementar.

La fuente de información marca la primera gran divergencia. Codex recurre a búsqueda web en el 94% de las sesiones, a menudo con operadores como `site:auth0.com password reset MFA social connections`. Cursor lo hace en dos tercios de los casos. Claude Code confía en sus priors y solo busca en el 30% de las sesiones generales, aunque cuando lo hace navega tres veces más páginas que Codex; en sectores recientes como sandboxes, su tasa de búsqueda sube al 80%.

El contexto del repositorio decide más que el prompt. Un mismo pedido de proveedor de email en cuatro lenguajes produjo cuatro ganadores distintos: Resend en TypeScript, SendGrid en Python, Postmark en Go y Azure ACS en Java. Vercel gana el 100% de las veces en repos TypeScript con Next.js y nunca se recomienda en Python, donde domina Render. Claude Code construye soluciones in-house casi el doble que los otros dos (19% frente a 10%).

El consenso entre los tres agentes aparece solo en el 42% de las celdas evaluadas. En voice agents, por ejemplo, Claude Code elige Twilio, Codex opta por OpenAI Realtime API y Cursor por Vapi. Mercados muy concentrados muestran patrones claros: Stripe gana 9 de cada 10 veces (pierde en casos EU regulados frente a Paddle o Mollie), Neon captura el 66% en bases de datos, S3 el 45% en almacenamiento de archivos (Azure y GCP se reparten el 20% cada uno), Resend el 35,6% y Postmark el 27,4% en email.

Detalles de presentación en páginas de vendors cambian el resultado. Mailgun pierde frente a Postmark por "retención de 1 día" en el plan gratuito; Supabase cae cuando el agente busca solo base de datos y el pricing agrupa features BaaS innecesarias. En 388 sesiones apareció "overhead de gestión de plataforma" y en 195 se mencionaron costos; a menudo era por cómo se presentaba la información, no por un dato descalificante real.

Muchos nombres conocidos acumulan menciones sin victorias: PayPal 139 menciones y 0 victorias (Stripe ganó 124 de esas 139), Adyen 175 menciones y 3 victorias, LangChain 194 y 4, Netlify 152 y 6, Supabase 242 menciones como base de datos pero dominado por Neon.

Todos los traces son públicos para análisis independiente.

Lo que no se sabe: criterios exactos de validación del juez, distribución de las más de 10.000 sesiones descartadas, metodología de "unbiasing" del panel de repositorios, definición precisa de "celdas" en el 42% de consenso, desglose por sector de los 18 analizados, si los porcentajes de victoria son globales o por sector, código del orquestador y juez, y definición formal de "install rate" frente a "win rate".
