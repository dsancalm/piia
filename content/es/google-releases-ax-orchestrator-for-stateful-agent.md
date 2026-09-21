---
title: "Google publica AX, un orquestador para agentes con estado que se suspenden y"
summary: "AX nace de la unión entre DeepMind y la infraestructura interna de Google. Su runtime, Agent Substrate, permite miles de millones de tareas concurrentes por clúster y cobra solo mientras el agente piensa o ejecuta código."
lang: es
story: google-releases-ax-orchestrator-for-stateful-agent
publishedAt: 2026-09-21T13:12:10.135Z
sourceUrl: "https://agentexecutor.io"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [google, agentes, orquestador, opensource]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
AX es un orquestador de agentes de código abierto que Google ha publicado bajo el nombre de AX. El proyecto nace de la convergencia entre la investigación en runtimes agenticos de Google DeepMind y la experiencia interna en aislamiento, reanudación y planificación a gran escala. Su objetivo es resolver la infraestructura que necesitan las cargas de trabajo agenticas: tareas con estado, de larga duración, que alternan ráfagas de computación intensa con esperas por respuestas de modelos, herramientas o aprobaciones humanas. Los orquestadores tradicionales, ya sean Kubernetes o sistemas de batch, no están diseñados para ese patrón.

El runtime subyacente se llama Agent Substrate. Está construido para alta densidad y ciclos de vida de actores con estado rápidos. AX expone cuatro primitivas declarativas en YAML. **Task** define una ejecución aislada en sandbox con límites de CPU y memoria. **Workspace** configura el entorno: repositorios Git, servidores MCP, skills o metas en lenguaje natural. **Gateway** establece políticas de red con lista de permitidos e inyección de credenciales. **Model** centraliza la configuración de modelos, parámetros y secretos.

Los agentes en AX son actores con estado que pueden suspenderse y reanudarse en menos de un segundo sin cold-start, haciendo checkpoint del estado durante las esperas. El multiplexado denso permite que docenas de tareas compartan recursos de workers, de modo que solo se paga cuando los agentes están pensando o ejecutando código activamente. La arquitectura escala hasta miles de millones de tareas concurrentes por clúster sin límites del orquestador.

AX incluye capacidades generativas: los workspaces pueden describirse en lenguaje natural y el sistema usa un agente en el primer arranque para instalar toolchains y verificar dependencias. Soporta agentes de codificación interactiva, servidores de agentes de larga duración, notebooks Jupyter, testing de navegadores headless y runtimes de herramientas personalizados. Está orientado tanto a investigación (recopilación de trayectorias, bucles de RL, evaluación a escala) como a desarrolladores (ergonomía, iteración rápida).

El flujo de trabajo se gestiona desde la CLI `ax`. Un ejemplo completo muestra la creación de un workspace con el repositorio de Go, una tarea que compila la toolchain desde el código fuente, y la manipulación del ciclo de vida con comandos de suspensión, reanudación y acceso por SSH al sandbox:

```yaml
$ cat task.yaml
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
NAME   ATESPACE   PHASE   ACTOR   WORKER-IP   AGE
test   default    Running test    10.20.3.67  5s

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

Otro fragmento muestra la declaración de un entorno Python mediante una meta en lenguaje natural:

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

## Qué no se sabe

No se conoce la licencia concreta (Apache 2.0, MIT u otra), la fecha de lanzamiento inicial ni la versión actual. Tampoco están publicados los requisitos de infraestructura para ejecutar Agent Substrate (Kubernetes, bare metal, VMs, cloud gestionado), el modelo de seguridad del sandbox (gVisor, Kata Containers, Firecracker, namespaces Linux), ni el soporte para GPU y aceleradores. Falta información sobre compatibilidad con proveedores de modelos específicos (OpenAI, Anthropic, Vertex AI, locales vía Ollama/vLLM), disponibilidad de SDKs en Go, Python o TypeScript, integración con Prometheus, OpenTelemetry o sistemas de logging, y métricas de overhead de memoria y CPU por tarea suspendida. La etiqueta `v1alpha1` sugiere fase alpha, pero no hay confirmación oficial de madurez, roadmap público, gobernanza o proceso de contribución externa.
