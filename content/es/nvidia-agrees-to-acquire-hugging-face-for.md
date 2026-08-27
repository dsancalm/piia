---
title: "Nvidia compra Hugging Face por 13.000 millones de dólares"
summary: "La adquisición une al fabricante de GPUs con el centro del ecosistema open source de IA. El Hub y la biblioteca transformers permanecen abiertos, pero la documentación, los contenedores y los benchmarks pueden alinearse con CUDA, dificultando alternativas como AMD, Intel o..."
lang: es
story: nvidia-agrees-to-acquire-hugging-face-for
publishedAt: 2026-08-27T17:48:24.376Z
sourceUrl: "https://www.businessinsider.com/nvidia-in-talks-to-buy-hugging-face-13-billion-dollars-2026-8"
sourceName: "Hacker News (portada)"
priority: flash
tags: [nvidia, hugging-face, ia, open-source]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Nvidia ha acordado la compra de Hugging Face por 13.000 millones de dólares, según informa *The Information* y recoge *TechCrunch*. La operación sitúa al fabricante de GPUs al frente del repositorio y la biblioteca que concentran la mayor parte de la actividad open-source en modelos de lenguaje y visión. Hugging Face gestiona el Hub donde se alojan más de un millón de modelos, datasets y spaces, y mantiene *transformers*, la biblioteca de facto para cargar, fine-tunear y servir esos artefactos en Python.

El precio equivale a unas 100 veces los ingresos recurrentes anuales que se estimaban para la startup a cierre de 2023. La cifra refleja el valor estratégico del grafo de dependencias que Hugging Face ha tejido: cualquier pipeline de inferencia o entrenamiento pasa casi obligatoriamente por su *tokenizer*, su *AutoModel* o su CLI `huggingface-cli`. Hasta ahora, la empresa había mantenido una neutralidad de fachada frente a proveedores de nube y silicio; sus *hardware partners* incluían a AWS, Azure, GCP, Graphcore, Intel y la propia Nvidia. La integración vertical rompe ese equilibrio.

Para quien despliega modelos hoy, el cambio más inmediato puede aparecer en las imágenes Docker oficiales y en los *example scripts* que acompañan cada release. Nvidia ya optimiza sus contenedores NGC para Hopper y Blackwell; si esos contenedores pasan a ser el camino por defecto en la documentación de Hugging Face, la fricción para ejecutar lo mismo en AMD (ROCm), Intel (Gaudi) o Apple Silicon aumenta. No hace falta un bloqueo explícito: basta con que los *benchmarks* publicados en el Hub midan solo H100 o que los *quantization backends* recomendados sean `bitsandbytes` con CUDA y no `quanto` o `AWQ` multiplataforma.

La biblioteca `transformers` acepta *pull requests* de la comunidad, pero la gobernanza la marca el equipo *core*, que ahora responderá a una matriz de incentivos distinta. Los *model cards* y las licencias de los pesos (Apache 2.0, MIT, licencias *RAIL* varias) no cambian por decreto, pero la visibilidad que el Hub da a cada modelo sí puede sesgarse: *featured models*, *leaderboards* y *spaces* promocionados son palancas de descubrimiento que Nvidia controlará.

Lo que no se sabe:
- Fecha de cierre y condiciones regulatorias (EE. UU., UE, Reino Unido, China).
- Si Clem Delangue y el equipo directivo permanecen con *earnouts* o cláusulas de no competencia.
- Detalles de retención de empleados clave (mantenedores de `transformers`, `datasets`, `peft`, `trl`).
- Futuro de las alianzas con AWS (Trainium/Inferentia), Azure (Maia), Google (TPU) y proveedores de nube soberana.
- Si el Hub seguirá sirviendo binarios *multi-arch* o priorizará contenedores firmados solo para CUDA.
