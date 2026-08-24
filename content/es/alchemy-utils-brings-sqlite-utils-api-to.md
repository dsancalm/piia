---
title: "Simon Willison publica alchemy-utils, una réplica de sqlite-utils para SQLAlchemy"
summary: "La biblioteca alchemy-utils, en alfa, replica la API de sqlite-utils sobre SQLAlchemy y funciona con PostgreSQL, SQLite y DuckDB. Willison la desarrolló con Codex y documentó el proceso, que incluye TDD y optimizaciones que redujeron una inserción de casi una hora a 35..."
lang: es
story: alchemy-utils-brings-sqlite-utils-api-to
publishedAt: 2026-08-13T08:12:11.310Z
sourceUrl: "https://simonwillison.net/2026/Aug/12/alchemy-utils/"
sourceName: "Simon Willison"
priority: routine
tags: [python, sqlalchemy, bases-de-datos, ia]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Simon Willison publicó ayer alfa 0.1a0 de alchemy-utils, una biblioteca Python y utilidad CLI que replica la API de sqlite-utils pero sobre SQLAlchemy, de forma que funciona con varios motores de bases de datos. El proyecto nació como un "proyecto de ducha" y se desarrolló con Codex y GPT-5.6 Sol Ultra como asistentes.

La pieza central del anuncio es el proceso de desarrollo, documentado como una lista de instrucciones que Willison le dio a Codex:

```
Do a research spike to see what it would take to build a library with the same core API as SQLite-utils - in particular the insert and upsert and insert_all and upsert_all and create and update methods, and the table introspection stuff - but backed by SQLalchemy so it works for multiple database engines
Test against PostgreSQL and SQLite and duckdb
Use ~/dev/sqlite-utils for reference
Create a git repo for this and commit and early and often - use uv init to start the project - use red/green TDD and pytest, see ~/dev/django-sql-dashboard for one idea as to how the PostgreSQL tests could work
```

El flujo es reproducible: empezar con `uv init`, usar TDD con pytest, y tener el código de sqlite-utils como referencia local. La biblioteca se probó contra PostgreSQL, SQLite y DuckDB, lo que cubre los tres motores con los que se anunció.

Como demostración de uso, Willison ejecutó una consulta sobre su propia base de datos PostgreSQL con la CLI:

```
uvx --with 'alchemy-utils[postgresql]' alchemy-utils rows 'postgresql+psycopg://simon@localhost:5432/simonwillisonblog' redirects_redirect
```

La salida es JSON, igual que en sqlite-utils. El rendimiento también se tocó: insertar el CSV de árboles de San Francisco en DuckDB pasó de casi una hora a unos 35 segundos tras optimizar el código con Codex.

Si usas sqlite-utils, la promesa es que puedes moverte a PostgreSQL o DuckDB sin cambiar la API. Pero es una alfa, así que conviene leer el código antes de confiarle datos.

## Lo que no se sabe

La fuente no especifica qué métodos concretos de la API de sqlite-utils están implementados, más allá de la lista que aparece en la instrucción a Codex. Tampoco se sabe si la biblioteca soporta otros motores además de los tres probados, ni cuántos commits o versiones tiene el repositorio. No hay documentación oficial más allá de los ejemplos del anuncio.
