---
target: la web de PIIA (portada)
total_score: 32
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-08-06T10-03-43Z
slug: src-pages-index-astro
---
Method: dual-agent (A: revisión de diseño aislada · B: detector + evidencia de navegador aislada)

## Design Health Score

| # | Heurística | Puntuación | Issue clave |
|---|-----------|-------|-----------|
| 1 | Visibilidad del estado | 3 | Sin `aria-current` ni estado visual de página activa en el nav |
| 2 | Sistema ↔ mundo real | 4 | Metáfora de imprenta coherente; lenguaje directo y honesto |
| 3 | Control y libertad | 3 | Pager y vuelta a portada; sin ancla al archivo ni retorno al punto |
| 4 | Consistencia y estándares | 2 | El rosa significa tres cosas distintas en la misma pantalla |
| 5 | Prevención de errores | 3 | Enlaces externos sin señal de salida |
| 6 | Reconocimiento > recuerdo | 3 | Sin `:visited`: el lector diario debe recordar qué leyó |
| 7 | Flexibilidad y eficiencia | 3 | RSS, pager y copiar; faltan salto al archivo y leído/no leído |
| 8 | Estética y minimalismo | 4 | Cero ruido; cada elemento tiene función |
| 9 | Recuperación de errores | 4 | 404 ejemplar con sello "Retirado" y tres salidas |
| 10 | Ayuda y documentación | 3 | "Qué es esto" honesto; no explica los códigos de color al lector |
| **Total** | | **32/40** | **Bueno (base sólida, zonas débiles concretas)** |

## Veredicto de especificidad

**LLM (A):** mundo "fanzine fotocopiado" construido con sistema propio (marcos SVG de trazo irregular, pliegues, sellos inclinados, subrayadores con semántica, procedencia como objeto de diseño). No lo podría usar otro blog: específico de verdad. Único ingrediente de catálogo: Permanent Marker, fuente quemada que castiga la legibilidad a tamaños pequeños.

**Detector (B):** CLI estático limpio (0 hallazgos). En navegador, 11 grupos en portada: `tight-leading` en titulares (line-height 0.98 en cartel, 1.05 en rail; umbral 1.3) y `low-contrast` medido 3.7:1 en sellos "Importante" (`#4a4438` sobre `#ff6bae`). Falsos positivos: `gray-on-color` en sello amarillo (pasa contraste) y `tight-leading` del wordmark de una línea. La inyección en artículo y 404 no se completó: la extensión de Chrome se desconectó a mitad de pase.

**Convergencia:** el detector confirma con números la queja del usuario ("las letras son difíciles de leer"): interlineados por debajo de umbral en todos los titulares y una fuente display usada de 0.85rem a 4.4rem. A lo vio como P2; el usuario lo eleva a causa de rediseño.

## Impresión general

Sistema coherente y honesto con puntuación alta en identidad, pero la ejecución tipográfica castiga la lectura: rotulador en todos los niveles jerárquicos, interlineados de cartel, sellos con contraste insuficiente. El usuario rechaza el mundo visual completo: rediseño, no pulido.

## Qué funciona (conservar en el rediseño)

1. Honestidad como arquitectura: disclosure de máquina antes del texto, colofón, 404 "Retirado" con historial del repo, procedencia elevada a objeto.
2. Accesibilidad con criterio: skip link, focus ring medido, `prefers-reduced-motion` completo, targets del nav ≥44px, `lang` correcto, TZ fija, hreflang completo.
3. Esqueleto de composición: número del día + rail índice + archivo por fechas; sticky del cartel y marginalia de procedencia; view transitions portada→artículo.

## Issues prioritarios

1. **[P1] Legibilidad del display.** Permanent Marker en todo titular con line-height 0.98–1.05 (detector) y a tamaños de leyenda (0.85rem sellos, 1.05rem pager). Queja directa del usuario. Fix: mundo tipográfico nuevo con display legible y cuerpo de lectura larga. Comando: rediseño (typeset queda subsumido).
2. **[P1] Rosa polisémico + contraste.** `--hl-pink` = procedencia, sello "Importante" (3.7:1 medido) y hover de 404. Fix: un solo acento con roles claros y contraste ≥4.5:1. Comando: rediseño (colorize subsumido).
3. **[P1] Sin `:visited`.** Producto de lectura diaria sin distinción leído/no leído. Fix: `:visited` en titulares de rail y archivo. CSS puro.
4. **[P2] Targets táctiles.** Botón Copiar ~20px, enlaces del archivo ~30px. Fix: áreas ≥44px reutilizando el truco del nav.
5. **[P2] Archivo como pared.** ~10 titulares planos por día, crece sin límite (guidelines: paginar o `content-visibility: auto`). Fix: agrupación y densidad tabular en el rediseño.

## Guidelines web (C, hallazgos a integrar)

- Fuente del cuerpo sin `rel="preload"` (FOUT) — Base.astro:48.
- Titulares generados por máquina sin `overflow-wrap: break-word` fuera de `.prose` (Dispatch:52, Piece:70).
- Animaciones de `background-size` repintan cada frame (FrontPage:245, Dispatch:92, Piece:387): pasar a `transform: scaleX()` en pseudo-elemento.
- `text-wrap: balance` ausente en h2/h3 globales; hora del archivo sin `<time>`; apóstrofo recto en 404; `img { height: auto }` ausente.

## Personas

- **Alex (lector diario):** no distingue lo ya leído (sin `:visited`); sin ancla para saltar el cartel ya visto; el pager sí le encadena el día.
- **Sam (baja visión / teclado):** marker a 0.85rem es la peor combinación tamaño×forma del sitio; `time` del rail solo verbaliza hora; lo estructural (skip, focus, aria-live) está bien.
- **Casey (móvil una mano):** el tap al botón Copiar de ~20px acaba dentro del `<pre>` y desplaza el scroll en vez de copiar; targets del archivo ~30px.

## Observaciones menores

Subrayado hover multilínea pintado por fragmentos; `rel="nofollow"` en fuentes choca con "la procedencia es parte del contenido"; sin indicador de enlace externo; columna derecha vacía en artículos cortos >72rem; "No se pudo copiar" revierte sin alternativa; sello de 404 duplica estilos de `Stamp.astro`.

## Preguntas provocadoras

1. ¿Qué presupuesto de caracteres tiene el titular del cartel pactado con el redactor automático?
2. ¿Necesita el producto un estado explícito "hoy todavía no hay tirada" cuando falla el cron de la mañana?
3. Para un producto cuyo riesgo central es publicar errores sin revisión, ¿el encanto visual refuerza la confianza o compra tolerancia al error?
