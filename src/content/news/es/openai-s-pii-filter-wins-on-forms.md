---
title: "El filtro de PII de OpenAI falla con prosa y escrituras no latinas"
summary: "Un informe independiente ha evaluado el detector de privacidad de OpenAI en 42 benchmarks y 22 idiomas. Rinde bien en datos estructurados, pero su F1 cae a 0.04 en árabe y a 0.40 en nombres de persona, lo que obliga a medirlo con datos propios antes de usarlo en producción."
lang: es
story: openai-s-pii-filter-wins-on-forms
publishedAt: 2026-08-05T09:25:02.627Z
sourceUrl: "https://arxiv.org/abs/2608.02616"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [privacidad, openai, evaluacion, pii]
generatedBy: deepseek/deepseek-v4-flash-0731
---
El equipo que ha evaluado el filtro de privacidad de OpenAI (OPF) ha publicado en arXiv un informe independiente con resultados que conviene leer antes de usar ese detector de PII en producción. El detector bidireccional de 1.5B parámetros se ha sometido a 42 benchmarks sintéticos que cubren 22 idiomas y 5 dominios. El rendimiento varía tanto que no se puede hablar de un filtro fiable sin matices.

## Resultados según el tipo de PII

En datos estructurados, OPF rinde bien. Logra F1=0.855 en el benchmark AI4Privacy y lidera en PII sintética estructurada con 0.71 de media. En soporte al cliente alcanza 0.60. Los campos regulares son su punto fuerte: email con 0.78 y teléfono con 0.76.

El problema aparece con la PII culturalmente variable. Nombres de persona bajan a 0.40 y direcciones a 0.49. En prosa narrativa el desplome es brusco: F1 entre 0.04 y 0.57 en benchmarks NER. Las escrituras no latinas son el peor escenario, con árabe en 0.04 y cirílico en 0.03.

## Comparación con alternativas

Frente a Presidio (0.431 y 0.273) y XLM-RoBERTa (0.269 y 0.111) en benchmarks anotados con PII, OPF gana. Pero XLM-RoBERTa supera a OPF en los 13 idiomas índicos y no latinos evaluados en NER multilingüe. GPT-4o lidera en PII médica, legal y financiera, con 0.643 de media en SPY y 0.527 en Gretel. OPF se queda en 0.464 en SPY medical.

Hay además un sesgo hacia recall en soporte al cliente y en PII médica y legal: la precisión va de 0.31 a 0.54 mientras el recall alcanza entre 0.70 y 0.85. Eso significa que el filtro deja pasar ruido, y su precisión global varía entre 0.31 y 0.86 según el dominio.

La conclusión práctica es que OPF no es un filtro universal. Si tu pipeline maneja prosa, escrituras no latinas o campos con mucha variación cultural, necesitas medir su rendimiento con tus propios datos antes de confiar en él. Un F1 alto en un benchmark estructurado no garantiza nada en otro dominio.

## Lo que no se sabe

El artículo no especifica qué 22 idiomas concretos se evaluaron, ni qué dominios exactos componen los 5 analizados. Tampoco indica qué versión de OPF se probó ni su fecha de despliegue. No se explica cómo se construyeron los 42 benchmarks sintéticos, ni se menciona el coste computacional de ejecutar OPF en la evaluación. Por último, no queda claro si OPF se usó solo en zero-shot en todos los benchmarks o si hubo algún ajuste.
