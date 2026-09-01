---
title: "SciJEPA preentrena modelos científicos prediciendo secciones sin usar citas"
summary: "El método aprende a representar papers enteros prediciendo el método desde el título y el abstract, y la conclusión desde el método. Funciona, pero un baseline contrastivo con los mismos pares de secciones lo supera; la brecha se reduce añadiendo SIGReg, una regularización..."
lang: es
story: scijepa-trains-scientific-embeddings-without-citation-graphs
publishedAt: 2026-09-01T12:40:23.461Z
sourceUrl: "https://arxiv.org/abs/2608.28625"
sourceName: "arXiv cs.CL"
priority: routine
tags: [nlp, ciencia, embeddings, regularizacion]
generatedBy: dots-studio/dots-3-note-preview:free
---
SciJEPA propone un preentrenamiento predictivo que no necesita citas. El modelo aprende a representar un paper científico prediciendo unas secciones a partir de otras dentro del mismo documento: el título y el abstract predicen la sección de método, y el método predice la conclusión. Esta asimetría refleja la estructura lógica de la escritura científica y evita la dependencia de grafos de citación, que son ruidosos, incompletos o inexistentes en dominios nuevos.

El artículo evalúa el enfoque en cuatro benchmarks estándar: RELISH, predicción de citas de alta influencia, SciDocs y predicción de citas genérica. El resultado principal es que el entrenamiento predictivo puro funciona, pero queda por debajo de un baseline contrastivo entrenado con exactamente los mismos pares de secciones. La brecha se cierra en gran medida al añadir Sliced Isotropic Gaussian Regularization (SIGReg), una regularización que fuerza la geometría del espacio latente hacia una gaussiana isotrópica rebanada. El efecto no es uniforme: una regularización moderada mejora el ranking fino, mientras que una regularización fuerte puede debilitar la alineación local entre secciones vecinas. Los autores también observan que distintas ramas del codificador acaban especializadas en distintos regímenes de recuperación.

Lo que no se sabe: arquitectura exacta del codificador (BERT, SciBERT, Longformer, tamaño), dimensión de los embeddings, hiperparámetros de SIGReg (sigma, peso de pérdida, número de slices), corpus de preentrenamiento y su tamaño, detalles del baseline contrastivo (temperatura, negativos, loss), métricas numéricas por tarea, coste computacional, disponibilidad de código y pesos, ablations sobre el orden de predicción, ni generalización a dominios no científicos u otros idiomas.
