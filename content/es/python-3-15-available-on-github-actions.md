---
title: "Python 3.15 ya disponible en GitHub Actions sin compilar"
summary: "El repositorio oficial actions/python-versions ya incluye la etiqueta 3.15, que resuelve a 3.15.0. Basta añadir \"3.15\" a la matriz del workflow para que setup-python@v5 instale el binario oficial, cachee la herramienta y ponga python y pip en el PATH."
lang: es
story: python-3-15-available-on-github-actions
publishedAt: 2026-10-11T13:15:33.237Z
sourceUrl: "https://simonwillison.net/2026/Oct/10/python-actions/"
sourceName: "Simon Willison"
priority: urgent
tags: [github, python, ci, actions]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Python 3.15.0 ya está en el repositorio `actions/python-versions` de GitHub. Eso significa que puedes escribir `3.15` en la matriz de tu workflow y los jobs se ejecutarán contra la versión final del intérprete sin tener que compilarlo tú ni usar imágenes Docker a medida.

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.11", "3.12", "3.13", "3.15"]
    steps:
      - uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
      - run: python -m pytest
```

Simon Willison esperaba el movimiento desde hacía un par de días. Configuró a ChatGPT para clonar el repositorio y hacer `git pull` cada hora hasta que apareciera la etiqueta estable.

```bash
Clone https://github.com/actions/python-versions and git pull once an hour until they add the stable 3.15 - then tell me about it
```

El identificador `3.15` resuelve a `3.15.0` y se comporta igual que el resto de versiones del catálogo: instala el binario oficial, pone `python` y `pip` en el `PATH` y cachea la herramienta entre ejecuciones.

## Qué no se sabe

- Fecha exacta del lanzamiento oficial de Python 3.15.0.
- Qué novedades trae la versión (excepciones con notas, `pyproject.toml` estándar u otras).
- Desde cuándo exactamente está disponible en `actions/python-versions`.
- Si ya hay versiones alpha, beta o RC en el mismo repositorio.
