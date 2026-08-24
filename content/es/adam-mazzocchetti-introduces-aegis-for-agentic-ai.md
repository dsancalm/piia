---
title: "Aegis controla la ejecución de la IA agéntica mediante propuestas"
summary: "Adam Mazzocchetti presenta un modelo que trata las salidas de los modelos de lenguaje como sugerencias. El sistema utiliza una capa de decisión y un mecanismo de quórum para validar acciones antes de que se ejecuten las herramientas."
lang: es
story: adam-mazzocchetti-introduces-aegis-for-agentic-ai
publishedAt: 2026-08-19T07:33:56.258Z
sourceUrl: "https://arxiv.org/abs/2608.16891"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [ia, seguridad, gobernanza, tecnología]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Adam Mazzocchetti presentó Aegis, un sistema de gobernanza en tiempo de ejecución para controlar la IA agéntica. Este modelo trata las salidas del modelo de lenguaje como propuestas de acción en lugar de comandos directos. Aegis interviene mediante una capa de decisión de confianza antes de que se ejecute cualquier herramienta.

El proceso evalúa estas propuestas frente a un estado de política activo. El sistema resuelve la procedencia en el servidor y aplica un modelo de fallo cerrado cuando detecta incertidumbre. Para evitar decisiones unilaterales, Aegis utiliza un mecanismo de autorización basado en quórum llamado Senate-style settlement.

Este enfoque implementa un límite de ejecución que separa las propuestas del modelo de la ejecución real de las herramientas. Un programador puede desplegar agentes con una capa de seguridad que actúa como intermediario. Si el agente propone una acción que no encaja con las políticas o cuya procedencia es dudosa, el sistema bloquea la ejecución.

En las pruebas realizadas con 42 tareas y 5 familias de ejecuciones, el sistema mostró resultados específicos sobre su capacidad de filtrado. El estudio analizó 6,300 filas de datos. 79 correspondían a fugas de ruta comparadoras arriesgadas y 2,100 filas fueron gobernadas por Aegis. De las 1,832 filas que Aegis intentó gobernar, 1,019 se resolvieron mediante el mecanismo Senate. No se gobernaron 0 aplicaciones de herramientas simuladas ni 0 completaciones de efectos secundarios arriesgados.

## Por qué te afecta

La autonomía de los agentes de IA introduce riesgos operativos si el modelo decide ejecutar acciones con efectos secundarios no deseados. Aegis permite que el programador establezca un control de límites operativo al separar la generación de la intención de la ejecución de la acción. Esto reduce la superficie de error porque trata la salida del modelo como una sugerencia que requiere validación externa.

Lo que no se sabe:
No se conoce la seguridad general de los agentes autónomos ni el impacto de Aegis fuera del corpus de sandbox evaluado.
