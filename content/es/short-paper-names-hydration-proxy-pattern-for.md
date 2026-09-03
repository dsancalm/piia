---
title: "Un paper nombra el patrón que separa el estado del chat del motor de inferencia"
summary: "El trabajo presentado en SAO 2026 bautiza como Hydration Proxy al componente que hidrata peticiones con historial y deshidrata respuestas para guardar la sesión."
lang: es
story: short-paper-names-hydration-proxy-pattern-for
publishedAt: 2026-09-03T12:12:17.070Z
sourceUrl: "https://arxiv.org/abs/2609.01834"
sourceName: "arXiv cs.AI"
priority: routine
tags: [arquitectura, llm, patrones, caché]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El artículo que se presentó en el taller SAO de la conferencia ACM CAIS 2026 formaliza un patrón que muchos equipos ya están reinventando a mano: separar la persistencia de la conversación del motor de inferencia. Joseph Axisa lo llama Hydration Proxy y lo describe en tres páginas con una única tabla. No hay código adjunto, ni benchmarks, ni repositorio público. Lo que hay es una arquitectura de referencia para el problema que aparece en cuanto escalas un chat empresarial: el proveedor del modelo no guarda estado, tú necesitas auditoría, cumplimiento y control de costes, y el KV caching del proveedor choca con tu necesidad de gestionar el contexto.

El patrón sitúa un componente intermedio entre la aplicación y la API del LLM. Ese proxy hidrata la petición con el historial relevante antes de enviarla y deshidrata la respuesta para actualizar el almacén de sesión. La aplicación deja de ser responsable de armar el contexto; el proxy decide qué fragmentos recuperar, cómo ordenarlos y cuándo podar. El almacén puede ser Redis, Postgres, un log inmutable o lo que dicte la política de retención. El proveedor del modelo sigue viendo peticiones stateless.

El artículo introduce además el mandato de estabilización de contexto. La tensión es clara: el KV caching del proveedor premia prefijos idénticos, pero tu lógica de negocio puede exigir reordenar, filtrar o inyectar hechos nuevos en cada turno. El mandato establece reglas para que el proxy reescriba el contexto de forma determinista, de modo que el prefijo que llega al modelo sea estable entre peticiones equivalentes y el cache acierte sin renunciar a la soberanía del estado.

No se sabe cómo se implementa el proxy en producción: qué latencia añade, cómo gestiona fallos parciales, si hay un SDK o sidecar listo para usar, ni cómo se comparan sus métricas frente a soluciones caseras basadas en LangChain, LlamaIndex o historiales respaldados en Redis. Tampoco hay análisis de seguridad sobre inyección de prompt a través del historial hidratado ni estimación de coste por conversación a escala. El paper nombra el patrón y el mandato; la ingeniería queda por hacer.
