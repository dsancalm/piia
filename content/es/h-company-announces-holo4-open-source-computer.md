---
title: "Hugging Face lanza Holo4, framework abierto para agentes que controlan el ordenador"
summary: "El proyecto de H Company aísla la ejecución, aporta benchmarks reproducibles y una interfaz unificada de ratón, teclado y pantalla. Permite probar modelos locales sin APIs cerradas ni claves externas."
lang: es
story: h-company-announces-holo4-open-source-computer
publishedAt: 2026-09-28T14:17:03.279Z
sourceUrl: "https://huggingface.co/blog/Hcompany/holo4"
sourceName: "Hugging Face"
priority: urgent
tags: [automatizacion, agentes, open-source, huggingface]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Hugging Face ha publicado en su blog la presentación de Holo4, un framework de código abierto para construir agentes que operan un ordenador completo: mueven el ratón, teclean, leen la pantalla y encadenan acciones en el escritorio o en el navegador. El proyecto nace en H Company y se entrega con licencias permisivas para que cualquiera pueda auditarlo, extenderlo o integrarlo en sus propios flujos de automatización sin depender de APIs propietarias ni de modelos cerrados que cobran por cada llamada.

La propuesta cubre la pila completa: un entorno de ejecución que aísla las acciones del agente, un conjunto de benchmarks estandarizados para medir el éxito en tareas reales (rellenar formularios, extraer datos de interfaces legacy, navegar flujos de varios pasos) y scripts de evaluación reproducibles. Eso permite comparar modelos base, estrategias de planificación y técnicas de grounding visual sobre la misma métrica, algo que hasta ahora obligaba a montar bancos de prueba caseros.

Para quien programa, el valor inmediato está en el repositorio: contiene la definición de la interfaz de observación-acción, los wrappers para entornos de escritorio (X11/Wayland) y navegador (CDP/Playwright), y ejemplos de bucles de razonamiento que combinan modelo de lenguaje y modelo visión-lenguaje. El código se clona y ejecuta sin claves de API externas; los pesos recomendados se descargan de Hugging Face Hub con `transformers` estándar.

```bash
git clone https://github.com/HCompany/Holo4
cd Holo4
pip install -e .
python -m holov4.eval --benchmark desktop_basic --model huggingface/Holo4-7B
```

El framework expone una clase `Computer` unificada que abstrae ratón, teclado y captura de pantalla; el agente recibe una observación JSON con la imagen codificada en base64 y el árbol de accesibilidad, y devuelve una acción tipada (`click`, `type`, `scroll`, `wait`, `done`). Esa interfaz facilita cambiar el modelo subyacente o insertar políticas de seguridad (listas blancas de coordenadas, timeouts, confirmaciones humanas) sin reescribir el bucle principal.

## Lo que no se sabe

- Qué modelos base se han usado para los checkpoints publicados y si hay versiones cuantizadas listas para GPU de 24 GB.
- Resultados numéricos en los benchmarks anunciados (tasa de éxito, pasos por tarea, latencia media).
- Hoja de ruta para soporte de Wayland nativo, multi-monitor o entornos Windows/Mac.
- Si hay planes de publicar un dataset de trayectorias anotadas para fine-tuning.
