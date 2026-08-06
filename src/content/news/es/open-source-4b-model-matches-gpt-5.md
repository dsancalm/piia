---
title: "Un modelo abierto de 4B iguala a GPT-5.6 Sol en recuperación agéntica por 100 veces"
summary: "Neon ha publicado un post en el que detalla cómo un modelo de 4B parámetros, post-entrenado con su sistema Castform, alcanza la precisión de GPT-5.6 Sol en tareas de recuperación agéntica."
lang: es
story: open-source-4b-model-matches-gpt-5
publishedAt: 2026-08-06T09:24:18.602Z
sourceUrl: "https://neon.com/blog/how-castform-neon-beats-frontier-models-on-price-and-efficiency"
sourceName: "Hacker News (portada)"
priority: flash
tags: [neon, castform, recuperacion, modelos]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Neon ha publicado un post en el que describe cómo un modelo abierto de 4B parámetros, post-entrenado con su sistema Castform, iguala la precisión de GPT-5.6 Sol en tareas de recuperación agéntica, con un costo 100 veces menor. La cifra no es teórica: una solicitud típica de búsqueda multi-turno con gpt-5.6-sol tarda más de 10 segundos y cuesta unos $0.03 de extremo a extremo. El modelo pequeño hace el mismo trabajo por una centésima parte.

La pieza central es Castform, que convierte un corpus existente en tareas de entrenamiento y gestiona el bucle de RL para enseñar a un modelo abierto a usar esos datos. El pipeline se ejecuta contra Neon vía Lakebase Search en cuatro etapas: almacenamiento del corpus, generación de datos sintéticos, entrenamiento RL e inferencia de producción. El código del bucle de entrenamiento es directo:

```python
def run_tool(tool, tool_args):
    """Single tool: hybrid search over Lakebase."""
    if tool == "search":
        query = tool_args["query"]
        bm25 = neon.lakebase_text(query, k)
        vector = neon.lakebase_vector(query, k)
        return rrf_merge(bm25, vector, k)

def reward(trace, ground_truth):
    """Grade a trace against the ground-truth answer."""
    answer = parse_trace(trace)
    retrieval = ...  # did it retrieve the right source
    citation = ...   # did it cite the right chunk
    correctness = ...  # did it land on the right answer
    return retrieval + citation + correctness
```

El contexto histórico que da Neon explica por qué esto importa. Hacia 2022, la industria apostaba por la búsqueda por embeddings; pgvector era la extensión más descargada de su base de datos. Hacia 2025, los agentes ganaron tracción y la recuperación pasó de ser un disparo único a un proceso agéntico: el modelo llama repetidamente a Lakebase Search hasta tener suficiente contexto para responder. Ahí es donde los modelos pequeños fallaban y donde Castform interviene.

Dos detalles de infraestructura hacen el entrenamiento viable. Neon branching da a cada rollout un estado de base de datos aislado, y las consultas de time-travel reconstruyen el estado exacto que encontró un agente durante el entrenamiento. Eso permite inspeccionar por qué un rollout falló sin adivinar.

## Lo que no se sabe

La fuente no especifica el costo exacto por solicitud del modelo de 4B, solo dice que es 100 veces menor. Tampoco detalla el tamaño del corpus de entrenamiento, el número de rollouts paralelos, el tiempo total de entrenamiento ni las métricas de precisión concretas que se usaron para comparar la recuperación con GPT-5.6 Sol.
