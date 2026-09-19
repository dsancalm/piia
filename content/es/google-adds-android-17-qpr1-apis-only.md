---
title: "Android 17 QPR1 estrena APIs sin publicar su código en AOSP"
summary: "GrapheneOS denuncia que Google rompe una práctica de más de una década: las nuevas interfaces del framework solo llegan a la build propietaria de Pixels y socios GMS, dejando a ROMs alternativas e investigadores sin acceso al código."
lang: es
story: google-adds-android-17-qpr1-apis-only
publishedAt: 2026-09-19T11:20:32.729Z
sourceUrl: "https://grapheneos.social/@GrapheneOS/117282080803799576"
sourceName: "Hacker News (portada)"
priority: flash
tags: [android, aosp, grapheneos, google]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
GrapheneOS ha publicado en Mastodon que Android 17 QPR1 es la primera versión desde la rama 3.x que incorpora nuevas APIs sin liberar su código en AOSP. El mensaje, alojado en grapheneos.social con el identificador 117282080803799576, aparece truncado en la vista pública, pero la afirmación central es clara: Google ha roto una práctica de más de una década.

Hasta ahora, cada API añadida al framework acababa en el repositorio abierto. Eso permitía a proyectos como GrapheneOS, LineageOS o CalyxOS auditar el código, portar parches de seguridad y mantener compatibilidad real con el ecosistema. Si las nuevas APIs de QPR1 solo existen en la build propietaria que reciben los Pixels y los socios GMS, el código abierto se convierte en una instantánea incompleta. Los desarrolladores de ROMs alternativas no pueden implementar esas interfaces, los investigadores no pueden analizarlas y las aplicaciones que las usen dejarán de funcionar fuera de los dispositivos bendecidos por Google.

El cambio coincide con la estrategia de los Quarterly Platform Releases: actualizaciones trimestrales que antes solo traían correcciones y ahora, al parecer, sirven para estrenar funcionalidades reservadas. No se sabe qué APIs concretas son, ni si afectan a servicios de Play, a hardware específico de los Tensor o a capacidades de IA on-device. Tampoco hay confirmación oficial de Google más allá de las notas de lanzamiento genéricas.

Para quien mantiene una ROM sin GMS, la consecuencia inmediata es que el objetivo se mueve sin avisar. Cada QPR puede introducir dependencias invisibles que rompen la compilación o el arranque en dispositivos no certificados. La única defensa es monitorizar los diffs de los binarios propietarios frente a las fuentes públicas, un trabajo que escala mal y que hasta ahora no era necesario en esta magnitud.

---

### Lo que no se sabe

- Qué APIs exactas se han añadido en QPR1 sin publicar en AOSP.
- Si la omisión afecta a todas las nuevas APIs del trimestre o solo a un subconjunto.
- Qué versión concreta de Android 3.x (Honeycomb) marca el precedente histórico.
- Si Google piensa liberar el código en una fecha posterior o la retención es permanente.
- Impacto real en la compilación de GrapheneOS y proyectos derivados en sus próximas builds.
