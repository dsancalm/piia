---
title: "Prime Agent, el harness de codificación auto-mejorable, ya es código abierto"
summary: "Prime Intellect ha liberado Prime Agent, un harness que permite a los agentes de IA gestionar su propio contexto, memoria y subagentes de forma programática."
lang: es
story: prime-agent-turns-the-coding-agent-itself
publishedAt: 2026-08-06T09:28:25.921Z
sourceUrl: "https://www.primeintellect.ai/blog/prime-agent"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [código-abierto, agentes, ia]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Prime Agent, el harness de codificación auto-mejorable de Prime Intellect, ya está disponible como código abierto. El proyecto plantea una forma distinta de construir agentes de IA para tareas de largo horizonte: en lugar de prompts fijos y subagentes estáticos, el propio agente gestiona su contexto, su memoria y sus subagentes de forma programática.

La pieza central es la abstracción Recursive Language Model (RLM). Trata el contexto como una variable y la delegación de subagentes como llamadas a funciones dentro de un REPL. El agente no lanza procesos independientes: crea instancias de sí mismo. Esa recursión es lo que le permite dividir un problema grande en subtareas que heredan el estado de la sesión.

El segundo pilar es el Continual Harness. Permite al agente hacer CRUD sobre su propio estado: prompts, skills, memoria y subagentes. Todo lo que aprende en una sesión puede persistir y reutilizarse. La historia completa se guarda como archivos JSONL append-only en disco, y el agente usa un kernel IPython persistente como única herramienta.

La instalación es directa:

```bash
curl -fsSL https://app.primeintellect.ai/prime-agent/install.sh | sh
```

La delegación funciona con una llamada `await rlm(...)`, que devuelve un handle al admitir la subtarea, no al terminarla. Los resultados llegan como mensajes `agent_message`. Ese diseño permite lanzar varias subtareas en paralelo y seguir trabajando mientras los hijos responden. El ejemplo de la documentación lo muestra con dos expertos, uno para autenticación y otro para la capa HTTP:

```python
# Parallel fan-out — rlm() returns at task admission with a child handle,
# never the child's answer; results arrive as agent_message replies.
auth = await rlm(
    "Summarize the authentication flow in auth/. Reply to me when done.",
    name="auth-expert"
)
api = await rlm(
    "Summarize the updated HTTP API layer in src/. Reply to me when done.",
    name="http-expert"
)
# ... continue independent work; each child replies via
# agent_message.send(..., receiver_role="parent") when finished ...

# Steer or extend a child mid-flight by role + name
await agent_message.send(
    "Also cover middleware error handling.",
    receiver_role="child",
    receiver_name=api.name,
)
```

Los subagentes sobreviven a la compactación del contexto. Cuando el contexto alcanza un umbral, o cuando el propio agente llama a `compact.run()` en el REPL, la sesión se compacta. Pero los hijos retenidos se pueden recuperar desde disco y seguir recibiendo instrucciones:

```python
# Spawn a named child; the handle returns at admission.
handle = await rlm(
    "Find what's wrong in this auth-flow. Reply to me with your findings.",
    name="auth-reviewer"
)
# ... the child's findings arrive as a parent-role reply, not a return value ...

# Later (survives compaction and kernel restarts): recover the retained child.
children = await rlm.list_subagents()
auth_child = next(c for c in children if c.session_name == "auth-reviewer")

# Send a follow-up turn into the same retained child session.
await agent_message.send(
    "Follow up: identify the main edge cases and any likely bugs.",
    receiver_role="child",
    receiver_name=auth_child.session_name,
    mode="follow_up",
)
```

Hay límites pensados. La comunicación multi-agente se restringe a la "familia nuclear": padre, hermano o procesos hijo. Y un subagente inactivo durante 30 minutos se elimina de la memoria, aunque se recarga desde disco cuando alguien le vuelve a hablar. Todo corre sobre un daemon en segundo plano que gestiona las sesiones a través de un socket local.

## Lo que no se sabe

La documentación no especifica el umbral exacto de contexto que dispara la compactación automática, ni ofrece datos comparativos de rendimiento frente a otros harnesses. Tampoco se indica qué modelos concretos son compatibles o recomendados, ni los requisitos de hardware o sistema operativo. La licencia exacta del open-source tampoco se detalla en la fuente.
