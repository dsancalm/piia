---
title: "Entrenar un LLM de 0,4 B parámetros solo con Rust costó 164 dólares y reveló fallos"
summary: "El experimento de Arif Adito muestra que el ecosistema Rust aún no aguanta un pretraining completo: ocho defectos en Candle y Burn pasaron desapercibidos en la curva de pérdida y solo los detectó un test de flujo de gradientes."
lang: es
story: rust-training-run-logs-silent-framework-bugs
publishedAt: 2026-09-23T12:00:33.415Z
sourceUrl: "https://arxiv.org/abs/2609.25008"
sourceName: "arXiv cs.CL"
priority: flash
tags: [rust, llm, entrenamiento, candle]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Entrenar un modelo de lenguaje de 0,4 B parámetros solo con Rust costó 164 dólares en una H100 alquilada y 54,6 horas de cómputo. El autor, Arif Adito, publicó el informe en arXiv el 27 de julio de 2026. No hubo Python ni PyTorch en la ruta de entrenamiento; el objetivo era comprobar si el ecosistema Rust aguanta un pretraining completo. La respuesta corta: aún no.

El modelo, orientado al bengalí, alcanza una verosimilitud negativa por token de 0,93 frente a 12,60 de un gemelo aleatorio. En tareas de razonamiento común en inglés queda al azar, algo esperado dado el corpus de 2 000 millones de tokens sesgado hacia el bengalí. Lo relevante no es la calidad final, sino la taxonomía de fallos silenciosos que aparecieron en los dos frameworks probados: Candle y Burn.

En Candle se documentan cinco defectos. El más traicionero: *fused kernels* que devuelven gradientes nulos sin avisar. La curva de pérdida baja con normalidad, pero los parámetros no aprenden. En Burn hay tres defectos. El paso backward ronda el 3 % del rendimiento teórico de la GPU y una ruta de fusión de kernels provoca *segfault* a escala de miles de millones de parámetros. Ninguno de los ocho fallos saltó en una inspección visual de la loss.

La herramienta que los desenmascaró es un *gradient-flow arbiter*: un test que ejecuta un forward/backward y exige que **cada** parámetro entrenable reciba un gradiente finito y no nulo.

```rust
fn assert_gradient_flow(model: &mut Model, batch: &Batch) {
    let loss = model.forward(batch);
    loss.backward();
    for p in model.trainable_params() {
        let grad = p.grad().expect("gradiente ausente");
        assert!(grad.is_finite().all(), "gradiente no finito");
        assert!(grad.abs().sum() > 0.0, "gradiente nulo");
    }
}
```

Ese chequeo, barato y determinista, pilló seis fallos que habrían pasado desapercibidos en cualquier *dashboard* de métricas.

Otro hallazgo práctico: la tokenización ingenua a nivel de byte colapsa el bengalí a 1,4 caracteres por token frente a 3,9 del inglés, invirtiendo el balance del corpus sin que nadie se dé cuenta. Ajustando el vocabulario se sube a 4,1 caracteres por token y se recupera la proporción deseada.

Tras el experimento, el autor movió el entrenamiento a PyTorch y reservó Rust para servir el modelo en dispositivo. La conclusión es nítida: Rust hoy no compite para entrenar LLMs, pero sí puede ser una buena plataforma de *serving*.

---

### Lo que no se sabe

- Arquitectura exacta del modelo ni hiperparámetros concretos (learning rate, batch size, etc.).
- Versiones precisas de Candle y Burn utilizadas.
- Detalles de configuración de la H100 alquilada (memoria, utilización real).
- Composición completa del dataset más allá de “pesado en bengalí, ~2 B tokens”.
- Implementación interna del *gradient-flow arbiter* más allá de la descripción funcional.
- Comparativas de rendimiento frente a otros frameworks o lenguajes aparte del paso a PyTorch.
- Planes futuros del autor o recomendaciones para el desarrollo de frameworks ML en Rust.
