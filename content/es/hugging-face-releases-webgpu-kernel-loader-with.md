---
title: "Hugging Face lanza 207 kernels WebGPU que baten a ONNX Runtime en el navegador"
summary: "La librería @huggingface/kernels permite ejecutar operaciones optimizadas directamente desde el Hub. En pruebas con una Apple M4, la media geométrica de speedup frente a ONNX Runtime WebGPU es de 2,57x, con picos superiores a 10.000x en casos de Einsum complejos."
lang: es
story: hugging-face-releases-webgpu-kernel-loader-with
publishedAt: 2026-09-02T12:12:15.406Z
sourceUrl: "https://huggingface.co/blog/webgpu-kernels"
sourceName: "Hugging Face"
priority: urgent
tags: [webgpu, huggingface, kernels, onnx]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Hugging Face ha publicado `@huggingface/kernels`, una librería mínima para cargar y ejecutar kernels WebGPU optimizados directamente desde el Hub. La colección inicial agrupa 207 kernels. Cada uno es un repositorio independiente bajo la organización `webgpu-kernels` con su propio contrato de versión, pruebas de corrección, benchmarks y plantillas de shader WGSL parametrizadas con Jinja. La licencia es Apache-2.0.

El paquete se instala con `npm install @huggingface/kernels@preview` y requiere un navegador con soporte WebGPU, comprobable mediante `"gpu" in navigator`. La API expone `getKernel(repoID, {version})`, que devuelve una función invocable con tensores tipados. El loader deriva la forma y el tipo de salida del manifiesto y asigna el buffer de salida automáticamente.

Cada repositorio de kernel incluye cinco archivos clave:
- `manifest.json` define el contrato de la operación (entradas, salidas, atributos, tipos soportados).
- `metadata.json` identifica el kernel con digest y procedencia.
- `test.json` contiene casos de corrección.
- `bench.json` define casos de benchmark y ajuste.
- Los archivos `*.wgsl.jinja` albergan las implementaciones WGSL parametrizadas.

La versión del contrato (`version: 1`) es independiente del opset ONNX o la revisión del modelo, lo que permite una API JavaScript estable mientras evolucionan las implementaciones internas.

## Selección de variante en tiempo de ejecución

Un mismo kernel puede contener varias implementaciones para diferentes patrones de forma y el runtime elige la adecuada sin cambiar la API. El kernel `Add`, por ejemplo, incluye variantes para formas idénticas, broadcasting vectorizado, procesamiento escalar y broadcasting general. En el ejemplo de bias-add, el segundo input con forma `[3]` se hace broadcast sobre el primero `[2,3]` produciendo una salida `[2,3]`.

```javascript
import { getKernel } from "@huggingface/kernels";

const add = await getKernel("webgpu-kernels/add", { version: 1 });
const a = new Float32Array([1,2,3,4,5,6]); // shape [2,3]
const b = new Float32Array([10,20,30]);    // shape [3]
const out = await add(a, b);               // out shape [2,3]
```

## Rendimiento frente a ONNX Runtime WebGPU

Las comparativas se han ejecutado en una Apple M4 GPU con ONNX Runtime Web 1.30.0-dev.20260826-b1f76d586a. De 1.756 casos totales, 809 son directamente comparables. La media geométrica de speedup es 2.57x y la mediana 1.90x, con 629 victorias, 176 derrotas y 4 empates para los kernels de Hugging Face.

Desglose por operación (tiempos solo trabajo GPU, sin carga, compilación ni transferencias):

| Operación | Speedup | Casos | Tiempo HF | Tiempo ORT |
|-----------|---------|-------|-----------|------------|
| Add | 3.52x | 5 | 0.064 ms | 0.227 ms |
| MatMul | 1.14x | 29 | 0.115 ms | 0.131 ms |
| Softmax | 2.11x | 12 | 0.114 ms | 0.240 ms |
| LayerNormalization | 2.22x | 6 | 0.061 ms | 0.135 ms |

Casos extremos: un Einsum bilineal difícil (`i,ij,j` con tamaño 4096) supera 10.000x de speedup (0.136 ms frente a 1.396 ms); un CumSum fila a fila `[256,4096]` alcanza 301x (0.016 ms frente a 4.784 ms).

## Fleet: benchmarking y evidencia en el navegador

Fleet es una suite que ejecuta y puntúa los kernels en el hardware del usuario. Con consentimiento, aporta evidencia privada de rendimiento y corrección, lo que permite validar implementaciones en dispositivos reales y no solo en CI. Cada kernel card documenta semántica, entradas, salidas, atributos, tipos de datos, archivos fuente y un ejemplo listo para ejecutar con `@huggingface/kernels`.

## Qué no se sabe

- Qué navegadores y sistemas operativos específicos soportan WebGPU actualmente con las características requeridas.
- Detalles exactos del flujo de consentimiento y privacidad en Fleet.
- Cuándo saldrá de preview `@huggingface/kernels` y cuál será la versión estable.
- Qué operaciones de las 207 tienen mayor impacto real en modelos completos (LLMs, diffusion).
- Cómo se gestionan las dependencias entre kernels en pipelines completos.
- Qué overhead introduce la carga dinámica de kernels desde el Hub en producción.
- Si hay planes de soporte para WebGPU en Node.js o entornos server-side.
