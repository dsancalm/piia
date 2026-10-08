---
title: "Docker Agent runs AI agents from YAML instead of code"
summary: "The CLI plugin ships with Docker Desktop 4.63 and supports OpenAI-compatible providers plus local inference. Agents can delegate to sub-agents, use MCP tools, and are shared as OCI artifacts."
lang: en
story: docker-agent-runs-ai-agents-from-yaml
publishedAt: 2026-10-08T13:56:36.906Z
sourceUrl: "https://github.com/docker/docker-agent"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [docker, ai, cli, yaml]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Docker Agent is a CLI plugin that lets you define and run AI agents through declarative YAML files instead of orchestration code. The plugin ships preinstalled with Docker Desktop 4.63 and can also be installed via Homebrew or a manual binary. Once installed, you point it at a YAML manifest that describes the model, instructions, and toolsets, then execute the agent with a single command.

The configuration supports any provider that exposes an OpenAI-compatible endpoint: OpenAI, Anthropic, Gemini, AWS Bedrock, Mistral, xAI, and Docker Model Runner for local inference. A minimal agent definition looks like this:

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

Running it is straightforward:

```bash
export OPENAI_API_KEY=sk-...
docker agent run agent.yaml
```

The architecture allows multi-agent delegation. A root agent can spawn specialized sub-agents, each with its own model, tools, and context window. Built-in toolsets cover thinking, todo tracking, and persistent memory. Any MCP server , local, remote, or containerized , can be attached as a toolset. Retrieval-augmented generation is built in with BM25, embeddings, hybrid search, and reranking options.

Agents are packaged and distributed as OCI artifacts. You push an agent to a registry with `docker push` and colleagues pull it with `docker pull`, the same way you share images. The project dogfoods itself: the Docker Agent binary is built using an agent defined in `golang_developer.yaml`.

Telemetry is enabled by default and sends anonymous usage data. A community channel exists on Docker Community Slack in #docker-agent.

## What is not known

The license has not been published. The current version number and release date are absent from the documentation. Telemetry details , exact fields collected and the opt-out mechanism , are not documented. No benchmarks compare latency or token efficiency against frameworks like LangGraph or AutoGen. Support for local runtimes beyond Docker Model Runner (Ollama, llama.cpp) is unconfirmed. The full YAML schema is not published; only fragments appear in examples. Security isolation guarantees when executing arbitrary MCP tools are unspecified. Cloud API cost estimates for typical workloads are not provided. The maturity label (alpha, beta, stable) is not stated. Compatibility with Linux or Windows without Docker Desktop has not been verified.
