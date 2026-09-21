---
title: "Google releases AX orchestrator for stateful agent workloads"
summary: "AX runs on Agent Substrate to suspend and resume agent sandboxes in under a second, avoiding idle costs and cold starts. Workspaces and tasks are defined in YAML, with SSH access to live sandboxes for debugging."
lang: en
story: google-releases-ax-orchestrator-for-stateful-agent
publishedAt: 2026-09-21T13:12:10.136Z
sourceUrl: "https://agentexecutor.io"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [orchestration, agents, google, infrastructure]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
AX is an open-source agentic orchestrator from Google that runs on Agent Substrate, a runtime built for high-density, stateful actor lifecycles. The system targets the infrastructure gap that appears when agents alternate between heavy computation and long waits for model responses, tool calls, or human approval. Traditional orchestrators such as Kubernetes or batch schedulers treat these workloads as either always-running pods or ephemeral jobs, forcing you to pay for idle time or suffer cold starts on every resume. AX solves this with sub-second suspend and resume, dense multiplexing of dozens of tasks onto shared workers, and a declarative YAML surface that describes workspaces, network policies, model configuration, and task goals.

The control plane exposes four primitives. A **Workspace** defines the environment: Git repositories, MCP servers, skills, or a natural-language goal that an agent translates into a verified toolchain on first boot. A **Task** is an isolated sandbox execution with explicit CPU and memory limits. A **Gateway** enforces network allow-lists and injects credentials. A **Model** centralizes model parameters and secrets so tasks reference a logical name instead of scattering API keys.

The CLI workflow makes the loop concrete. You apply a workspace and a task, watch the actor transition from Pending to Running on a worker IP, then SSH into the live sandbox to run commands, build code, or create files. Suspend checkpoints state. Resume restores it in under a second. The file you created before suspend is still there after resume. Delete tears the task down.

```yaml
apiVersion: ax.io/v1alpha1
kind: Workspace
metadata:
  name: golang
spec:
  git:
    - repo: https://github.com/golang/go.git
      branch: "my-fix"
---
apiVersion: ax.io/v1alpha1
kind: Task
metadata:
  name: test
spec:
  workspaces:
    - name: golang
  goal: "Ensure that Go tool chain is available and is built from source"
  debug: true
```

```bash
$ ax apply -f task.yaml
workspace.ax.io/golang created
task.ax.io/test created
$ ax watch task test
Watching task default/test...
[10:42:01] Phase: Pending Actor: test WorkerIP:
[10:42:05] Phase: Running Actor: test WorkerIP: 10.20.3.67
Task reached terminal phase "Running".
$ ax get tasks
NAME ATESPACE PHASE ACTOR WORKER-IP AGE
test default Running test 10.20.3.67 5s
$ ax ssh test -- ls /workspace
go
$ ax ssh test -- cd /workspace/go && go build ./...
$ ax ssh test -- ps -o pid,cmd
PID CMD
1 /usr/local/bin/ax-task-runner
12 go build ./...
$ ax ssh test -- touch notes.txt
$ ax suspend task test
task.ax.io/test suspended
$ ax resume task test
task.ax.io/test resumed
$ ax ssh test -- ls notes.txt
notes.txt
$ ax suspend task test
task.ax.io/test suspended
$ ax delete task test
task.ax.io/test deleted
```

A second example shows a workspace described only by a natural-language goal:

```yaml
apiVersion: ax.io/v1alpha1
kind: Task
metadata:
  name: data-analysis
spec:
  workspaces:
    - name: python-env
      goal: "Set up a Python 3 development environment"
```

AX originated from the convergence of agentic runtime research at Google DeepMind and Google's production experience with isolation, resumption, and large-scale scheduling. The project targets both researchers collecting trajectories for RL loops and developers who want fast iteration without managing infrastructure.

What is not known: the exact open-source license, initial release date and current version, infrastructure requirements for Agent Substrate (Kubernetes, bare metal, VMs, managed cloud), production readiness versus alpha/beta status, per-task resource overhead while suspended, supported model providers (OpenAI, Anthropic, Vertex AI, local via Ollama/vLLM), GPU and accelerator support in sandboxes, sandbox security model (gVisor, Kata Containers, Firecracker, Linux namespaces), SDK availability beyond the CLI (Go, Python, TypeScript), observability integrations (Prometheus, OpenTelemetry, logging), API stability guarantees given the v1alpha1 version, community governance and external contribution process, and public roadmap with milestones.
