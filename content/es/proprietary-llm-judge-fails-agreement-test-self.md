---
title: "Un juez automático falla más que una moneda al aire y Qwen3.6-27B lo iguala a Opus"
summary: "Gpt-4o-mini solo alcanza kappa 0.04 frente a anotadores humanos en un test con desacuerdos deliberados; sube a 0.42 en muestreo aleatorio, pero rechaza el 77 % de SQL válidos por un fallo bautizado GRADE-HALLUCINATION."
lang: es
story: proprietary-llm-judge-fails-agreement-test-self
publishedAt: 2026-09-28T14:20:04.735Z
sourceUrl: "https://arxiv.org/abs/2609.30290"
sourceName: "arXiv cs.CL"
priority: routine
tags: [text-to-sql, evaluacion, modelos-abiertos, coste]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Tu pipeline de Text-to-SQL en producción confía en un juez automático para decidir si una consulta generada es correcta. Si ese juez es gpt-4o-mini y no has medido su concordancia con humanos, tu evaluación vale menos que una moneda al aire.

El artículo audita ese fallo real. En un conjunto enriquecido con desacuerdos deliberados, gpt-4o-mini alcanza un kappa de Cohen de 0.04 frente al estándar de oro anotado por dos autores. En un muestreo aleatorio uniforme sube a 0.42, pero sigue siendo bajo. El problema principal tiene nombre: GRADE-HALLUCINATION. Ese mecanismo hace que el modelo sobre-marque el 77.1 % de los casos que los humanos etiquetan como FAITHFUL. En la práctica, el juez rechaza SQLs válidos y rompe la señal de entrenamiento o el filtro de calidad que tengas aguas abajo.

La solución no está en un modelo propietario más caro. Qwen3.6-27B auto-hospedado llega a kappa 0.72, prácticamente igual que Claude Opus 4.7 (0.71). La comparación directa entre ambos tiene solo 96 ejemplos, así que la diferencia no es significativa, pero el coste sí lo es: Qwen cuesta aproximadamente 1/300 por llamada respecto a la alternativa cerrada.

Ensamblar no arregla las cosas gratis. Emparejar un juez débil con uno fuerte degrada la concordancia. Lo que sí funciona es routear a tres jueces fuertes con regla de unanimidad: kappa 0.79 y 89.7 % de auto-cobertura, es decir, casi el 90 % de los casos se resuelven sin intervención humana.

La misma receta de auditoría, aplicada fuera de dominio sobre BIRD-financial, marca el 25.5 % de los SQLs gold expertos como problemas candidatos de gold-SQL bajo su protocolo de anotación. Eso sugiere que el método detecta ruido en los propios benchmarks de referencia.

Código y pre-registro están disponibles en el repositorio enlazado.

## Lo que no se sabe

- Detalles técnicos exactos del mecanismo GRADE-HALLUCINATION: el abstract lo nombra pero no lo describe.
- Arquitectura completa del pipeline de Text-to-SQL en producción (etapas previas al juez).
- Definición precisa del protocolo de anotación y criterios FAITHFUL/UNFAITHFUL.
- Configuración de hiperparámetros de los modelos (temperatura, top-p, max tokens, system prompts).
- Latencia y throughput de Qwen3.6-27B auto-hospedado frente a APIs propietarias en su infraestructura.
- Por qué el ensamblado juez débil + fuerte degrada la concordancia (hipótesis no explicitada en el abstract).
- Detalles del "unanimity routing" con tres jueces fuertes (lógica de decisión, empates).
- Naturaleza exacta de los "candidate gold-SQL issues" detectados en BIRD-financial (tipos de error).
- Fecha de corte de datos de entrenamiento de los modelos evaluados.
- Si hay evaluación de robustez ante inyección de prompt o ataques adversariales.
