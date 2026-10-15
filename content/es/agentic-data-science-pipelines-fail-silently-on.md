---
title: "Los agentes de data science fallan en silencio y la accuracy no lo detecta"
summary: "Un estudio revela que casi todos los pipelines agente contienen fallos metodológicos como data leakage o validación cruzada inapropiada que inflan las métricas sin errores de ejecución."
lang: es
story: agentic-data-science-pipelines-fail-silently-on
publishedAt: 2026-10-15T11:55:21.803Z
sourceUrl: "https://arxiv.org/abs/2610.14115"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [data-science, agentes, evaluacion, data-leakage]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El paper analiza por qué los agentes de data science fallan en silencio: el código se ejecuta sin errores pero devuelve resultados inválidos. Los autores construyeron una taxonomía de fallos a partir de 220 tareas y la probaron con una suite de seis casos controlados. La conclusión central es que la precisión predictiva no basta para juzgar un pipeline agente. El data leakage, por ejemplo, infla el rendimiento artificialmente y correlaciona positivamente con métricas de accuracy. Eso significa que un modelo que parece excelente probablemente esté aprendiendo de información que no estará disponible en producción.

La evaluación comparó pipelines agente con soluciones humanas en competiciones de Kaggle. Los agentes mostraron fallos sistemáticos: validación cruzada inapropiada, features construidas con información futura y métricas que no reflejan el problema real. Casi todas las soluciones agente contienen al menos un modo de fallo, independientemente del modelo subyacente o del framework de orquestación. Además, los agentes carecen de la creatividad y el conocimiento de dominio que sí muestran los data scientists humanos en competiciones reales.

La suite de tests que proponen es reutilizable y extensible, diseñada para detectar seis fallos específicos de forma controlada. El abstract menciona data leakage y validación inapropiada como ejemplos, pero no detalla cuáles son todos. La evaluación cualitativa se hizo en competiciones de Kaggle sin especificar cuáles. Tampoco se dice qué frameworks o modelos de agentic DS se evaluaron, ni el porcentaje exacto de pipelines con fallos. La correlación entre leakage y rendimiento se confirma pero no se cuantifica. La suite de tests no se describe técnicamente en el abstract: no se sabe dónde está disponible, cómo se implementa ni qué métricas usa.

Lo que queda claro es que evaluar agentes de data science solo con accuracy es insuficiente. Fallos metodológicos como el data leakage se camuflan como éxito. Sin tests específicos que los detecten, estás validando pipelines que fallarán en producción. El paper argumenta que el análisis principiado de modos de fallo debe ser parte integral de cualquier evaluación de agentic DS. Hasta que no se conozcan los seis fallos exactos, los frameworks evaluados, las competiciones usadas, el porcentaje de fallos, la magnitud de la correlación y los detalles técnicos de la suite, la comunidad no puede replicar ni extender este trabajo.
