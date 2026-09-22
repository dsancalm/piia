---
title: "Linear recorta a la mitad el tiempo de test en CI tras reescribir su pipeline"
summary: "El auge de código generado por IA cuadruplicó los tests y colapsó la integración continua. Migrar a runners externos, compilar con tsgo, usar Oxlint y paralelizar shards redujo la espera por PR de 6 a 5 minutos y el tiempo de runner por test un 50 %."
lang: es
story: linear-cuts-ci-wait-time-while-test
publishedAt: 2026-09-22T12:04:14.121Z
sourceUrl: "https://linear.app/now/ci-bottleneck-reworked"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ci, typescript, github-actions, optimizacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El código generado con asistencia de IA ha disparado el volumen de cambios en Linear. Desde enero, las suites de test se han casi cuadruplicado y la canalización de integración continua se convirtió en el cuello de botella real: tardaba más en devolver feedback que en escribir el código. El equipo reescribió su CI sobre GitHub Actions y runners de terceros, y los resultados son medibles: el tiempo de espera por PR bajó de más de seis minutos a poco más de cinco, mientras que el tiempo de runner por test se redujo a la mitad.

## Runners más rápidos y herramienta nativa

Mover las cargas de GitHub Actions a runners externos con CPU, almacenamiento y caché más potentes aceleró los trabajos un 34 % de media. El paso de `tsc` cayó un 52 %. El cambio a `tsgo`, el compilador nativo de TypeScript, recortó la mediana semanal del chequeo de tipos un 73 %, sacando a la comprobación de tipos del camino crítico.

Reescribir las reglas ESLint personalizadas para que usen análisis estático de AST en lugar de información de tipos de TypeScript redujo el lint de la API un 68 % y el del repositorio completo un 55 %. Eso permitió migrar a Oxlint.

## Detección de cambios y checkout robusto

Limitar la profundidad de `fetch` y eliminar checkouts innecesarios comprimió la puerta de detección de cambios más lenta de 94 s a 20 s (mediana de 26 s a 8 s, p90 de 31 s a 12 s). Sustituir `actions/checkout` por una acción compuesta propia que reintenta con *backoff*, fija `GIT_HTTP_LOW_SPEED_LIMIT` y `GIT_HTTP_LOW_SPEED_TIME` y usa un espejo git persistente en caché eliminó los cuelgues por inestabilidad de red entre los runners externos y GitHub.

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 1
    # resto de parámetros originales
```

Mover la escritura del marcador de caché fuera del camino crítico ahorra 42 segundos en cada entrada de la cola de merge para la API.

## Imagen base, instalación y base de datos

Preinstalar el cliente de Postgres y cabeceras nativas en una imagen base de CI, restringir `pnpm install` solo al paquete de la API (de 44, 73 s a 16, 18 s) y prescindir del caché de `node_modules` (restaurar tardaba ~28 s frente a ~7,5 s de la instalación filtrada) redujo el tiempo de preparación por shard un 44 % (de 110, 140 s a 67, 73 s).

Hacer que los contenedores de la API carguen un *snapshot* de esquema generado en lugar de repetir todo el historial de migraciones recortó la preparación de la base de datos de ~12 s a 1, 2 s por contenedor.

## Consolidación y paralelismo

Agrupar siete chequeos cortos e independientes en dos trabajos que ejecutan tareas en paralelo ahorra unos 87 000 minutos de runner al mes, el 11,8 % del uso total de CI en junio. Con costes fijos por shard más bajos, Linear paralelizó la suite de tests de la API de forma más agresiva.

---

### Lo que no se sabe

- Coste absoluto en dólares antes y después de las optimizaciones.
- Número exacto de PRs diarios o semanales para dimensionar el impacto del tiempo de espera.
- Tipos de instancia o proveedor cloud de los runners de terceros.
- Estabilidad real de `tsgo` en producción.
- Paridad de reglas y posibles huecos de cobertura tras migrar a Oxlint.
- Cómo se generan y mantienen sincronizados los *snapshots* de esquema con las migraciones.
- Desglose de los 87 000 minutos ahorrados por tipo de trabajo.
- Minutos totales de runner al mes tras todos los cambios.
- Efecto en la tasa de *flakiness* tras el paralelismo agresivo.
- Si estas optimizaciones se trasladan igual a las partes del código que no son TypeScript.
