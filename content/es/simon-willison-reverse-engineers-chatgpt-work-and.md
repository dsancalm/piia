---
title: "OpenAI lanza ChatGPT Work con dos versiones y modelos exclusivos para tareas con"
summary: "Work Cloud corre en la nube y Work Local en tu máquina; ambos exigen plan de 20 dólares. Ofrecen modelos GPT-5.6 Sol, Luna y Terra con seis niveles de razonamiento, ejecución de código con internet abierto y navegador headless que rellena formularios y ejecuta JavaScript."
lang: es
story: simon-willison-reverse-engineers-chatgpt-work-and
publishedAt: 2026-08-31T14:33:54.532Z
sourceUrl: "https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [openai, chatgpt, ia, productividad]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenAI lanzó ChatGPT Work el 9 de julio de 2026 y desde entonces ha ido añadiendo capacidades a un ritmo que deja atrás a la documentación oficial. El producto no es uno, sino dos: Work Cloud, que corre en los servidores de OpenAI y se abre desde chatgpt.com, la app móvil o la app de escritorio, y Work Local, que vive en la app de escritorio (antes Codex) y tiene acceso directo a tus archivos y a la terminal de tu máquina. Ambos requieren una suscripción de al menos 20 dólares al mes; el plan Go de 8 dólares queda fuera.

La interfaz pone Work como una pestaña paralela a Chat. OpenAI dice: usa Chat para responder, explicar, hacer lluvia de ideas o borradores cortos; usa Work para tareas con un entregable claro: briefs, decks, análisis, actualizaciones recurrentes, flujos de trabajo, archivos que se pueden revisar. La diferencia práctica está en el equipamiento. Work permite elegir entre GPT-5.6 Sol, Luna y Terra, cada uno con seis niveles de razonamiento (Light, Medium, High, Extra High, Max, Ultra), más GPT-5.5 con cuatro niveles. Chat ofrece una carta distinta: 5.6 Instant, Medium, High, Extra High y Pro (los dos últimos solo para planes de 100 dólares al mes; el plan de 20 se queda en High). No se sabe si los modelos de Chat son Sol, Luna o Terra; la suposición razonable es que son Sol. El modo Ultra, según la experiencia con Codex, delega de forma más agresiva a sub-agentes.

Las sesiones de Work consumen la cuota de Codex; Chat tiene su propia cuota separada. Eso explica por qué la disponibilidad de modelos no coincide.

El entorno de ejecución de código de Work Cloud tiene acceso a Internet sin las restricciones de proxy que bloquean a Chat. Puede instalar paquetes, clonar repos de GitHub, llamar APIs y navegar webs. Claude añadió acceso a Internet restringido a una lista corta de dominios en septiembre de 2025; Work por defecto parece abierto a todos los dominios y permite configurar una allowlist.

La herramienta de navegador lanza Chrome headless, carga páginas, rellena formularios, toma capturas y ejecuta JavaScript en el DOM. El usuario puede ingresar contraseñas y 2FA en la ventana del navegador sin que las credenciales pasen al modelo.

```javascript
await tab.playwright.evaluate(() => {
  return Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"), heading => ({
    level: heading.tagName.toLowerCase(),
    text: heading.innerText.trim().replace(/\s+/g, " "),
    id: heading.id || null
  }));
});
```

Ese fragmento es un ejemplo real de lo que el modelo puede ejecutar dentro del navegador headless: extraer todos los encabezados de una página y devolverlos estructurados.

Cada sesión de Work tiene su carpeta scratch persistente bajo `/workspace/scratch` (por ejemplo `/workspace/scratch/e00a0a017944`). En el momento del artículo había 171 carpetas activas. Los edits en una sesión se ven al instante en las otras, pero no comparten espacio de procesos ni localhost.

ChatGPT Sites permite construir y desplegar sitios web completos en Cloudflare Workers con HTML, JavaScript, lógica server-side, estado sobre Cloudflare D1 y R2. Por defecto son privados; en planes de equipo se pueden hacer públicos y compartir.

Work permite lanzar sub-agentes en paralelo (Sol, Luna, Terra); Chat no. Las automatizaciones programadas corren en ambos, pero en Work se combinan con el resto de herramientas exclusivas: por ejemplo, actualizar un Site cada hora o ejecutar una búsqueda diaria a las 8 de la mañana para comprobar si Waymo ha anunciado fecha de lanzamiento en Half Moon Bay.

```text
run a search to see if Waymo have announced a launch date for Half Moon Bay every day at 8am
```

La superficie de ataque preocupa: Work junta datos privados, exposición a contenido no confiable y capacidad de exfiltrar información. No hay detalles públicos de defensas contra inyección de prompt; se espera un mecanismo de auto-revisión similar al de Codex.

La crítica central de Simon Willison: OpenAI explica Work por su propósito, no por lo que hace realmente. Oculta el system prompt y las descripciones de las herramientas. Si la documentación incluyera el system prompt exacto y la lista de herramientas, no habría hecho falta este análisis.

---

### Lo que no se sabe

- Si los modelos de Chat (5.6 Instant, Medium, High, Extra High, Pro) corresponden a Sol, Luna o Terra; el autor asume Sol sin confirmación oficial.
- El system prompt exacto y la lista completa de herramientas (tool descriptions) que usa Work Cloud.
- Mecanismos concretos de defensa contra inyección de prompt en Work; si es el mismo auto-review de Codex o hay capas adicionales.
- Límites exactos de la cuota de Codex que consumen las sesiones de Work frente a la cuota separada de Chat.
- Si la lista de dominios permitidos por defecto en el entorno de código es realmente abierta a todos o hay una allowlist oculta.
- Si los sub-agentes en Work tienen las mismas capacidades (navegador, código, filesystem) que el agente principal.
- Precio y límites de ChatGPT Sites (ancho de banda, almacenamiento D1/R2, dominios personalizados, SSL).
- Si las automatizaciones programadas en Chat tienen exactamente la misma funcionalidad que en Work o hay diferencias sutiles.
- Qué ocurre con los datos del filesystem persistente al cancelar la suscripción o tras inactividad prolongada.
- Si Work Local (app de escritorio) comparte la misma arquitectura de modelos, cuotas y herramientas que Work Cloud.
