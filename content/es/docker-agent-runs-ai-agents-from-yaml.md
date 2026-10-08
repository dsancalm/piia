---
title: "Docker lanza un plugin CLI para ejecutar agentes de IA definidos en YAML"
summary: "Docker Agent permite crear flujos de trabajo con múltiples agentes que se delegan tareas, usan herramientas MCP y se distribuyen como imágenes OCI. Requiere Docker Desktop 4.63 y una clave de API cloud o modelos locales vía Docker Model Runner."
lang: es
story: docker-agent-runs-ai-agents-from-yaml
publishedAt: 2026-10-08T13:56:36.905Z
sourceUrl: "https://github.com/docker/docker-agent"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [docker, ia, cli, automatizacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Docker ha publicado Docker Agent, un plugin CLI que permite definir y ejecutar agentes de inteligencia artificial mediante archivos YAML declarativos. El proyecto aparece en la portada de Hacker News y se presenta como una alternativa open-source a entornos propietarios como Code Interpreter o Devin, con el objetivo de llevar la automatización con agentes a flujos de CI/CD reproducibles.

El plugin requiere Docker Desktop 4.63 o superior, donde viene preinstalado, aunque también se puede instalar vía Homebrew (`brew install docker-agent`) o colocando el binario en `~/.docker/cli-plugins/docker-agent`. Para funcionar necesita al menos una clave de API de un proveedor cloud (OpenAI, Anthropic, Google, AWS Bedrock, Mistral, xAI) o Docker Model Runner para modelos locales.

La configuración se escribe en YAML. El fragmento publicado muestra la estructura básica:

```yaml
agents:
  root:
    model: openai/gpt-5-mini
    description: A helpful AI assistant
    instruction: |
      You are a knowledgeable assistant that helps users with various tasks.
      Be helpful, accurate, and concise in your responses.
    toolsets:
      - type: mcp
        ref: docker:duckduckgo
```

El agente se ejecuta con `docker agent run agent.yaml`. El sistema soporta arquitectura multi-agente con delegación automática de tareas entre agentes especializados. Incluye herramientas integradas (`think`, `todo`, `memory`) y permite conectar cualquier servidor MCP, ya sea local, remoto o empaquetado como imagen Docker. Para recuperación de información incorpora RAG con BM25, embeddings, búsqueda híbrida y reranking.

Los agentes se empaquetan y comparten mediante registros OCI estándar (`docker push` / `docker pull`), lo que permite versionarlos y distribuirlos como cualquier otra imagen. El propio Docker Agent se construye usando `docker-agent` (dogfooding) con el archivo `golang_developer.yaml`.

Incluye telemetría anónima de uso y mantiene un canal comunitario en Docker Community Slack (#docker-agent).

## Qué no se sabe

- Licencia del proyecto.
- Fecha de lanzamiento o versión actual.
- Detalles exactos de la telemetría y cómo desactivarla.
- Rendimiento, latencia o benchmarks frente a otros frameworks de agentes.
- Soporte para modelos locales más allá de Docker Model Runner (Ollama, llama.cpp).
- Esquema completo de configuración YAML.
- Política de seguridad y aislamiento al ejecutar herramientas MCP arbitrarias.
- Costes estimados de uso con APIs cloud.
- Estado de madurez (alpha, beta, estable).
- Compatibilidad con Windows, Linux y macOS sin Docker Desktop.
