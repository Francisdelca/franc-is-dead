# Manual del logo `franc.is.dead`

## 1. Nombre canónico

La marca se escribe siempre `franc.is.dead`, en minúsculas y con los dos puntos incluidos. Los puntos forman parte del nombre; no son separadores opcionales.

## 2. Construcción de la firma

La firma completa se construye con dos líneas tipográficas alineadas siempre a la izquierda:

```text
franc.is.dead
franc.is.is.
```

En la segunda línea, `franc`, `is` e `is` conservan su ancho pero se ocultan con `opacity: 0`. Solo se ven sus tres puntos:

```text
franc.is.dead
     .  .  .
```

No se deben insertar espacios manuales, tabulaciones ni coordenadas copiadas a ojo. Las mismas palabras de la primera línea son el sistema de medida de la segunda; así los puntos permanecen alineados aunque cambie el tamaño del logo.

## 3. Isotipo compacto

El isotipo aparece al ocultar todas las palabras de la firma:

```text
.  .
.  .  .
```

Reglas de compactación:

- Los dos bloques `franc` se desplazan hacia fuera y colapsan su ancho. Esto elimina el espacio vacío inicial y mantiene el isotipo alineado a la izquierda.
- `dead` también colapsa porque no determina ninguna distancia entre puntos.
- Los bloques `is` quedan invisibles, pero conservan su ancho. Son los espaciadores que definen el ritmo horizontal.
- Los cinco puntos visibles son los mismos de la firma completa; no se sustituyen por un SVG distinto durante la transición.

## 4. Alineación y área de seguridad

- Alineación principal: izquierda.
- El origen visual del logo y del isotipo es el primer punto visible.
- Área de seguridad mínima: el ancho de un bloque `is` alrededor de la marca.
- No centrar la firma dentro de su propio contenedor para compensar ópticamente.
- No añadir margen izquierdo al modo compacto.

## 5. Estados y mutaciones

Las mutaciones se usan como orientación contextual. Deben acompañar la sección, no ilustrarla de forma literal ni competir con el contenido.

### Firma / inicio

```text
.  .
.  .  .
```

Es el estado compacto por defecto después de la introducción.

### Perfil / `this.is.me`

```text
.  .
.  .
.
```

La firma se reordena como una `F`: Francis del Castillo. El gesto parte de una rotación de −90° y termina con una corrección de posición para conservar el origen izquierdo.

### Proyectos / orden

```text
.  .  .  .  .
```

Los cinco puntos forman una línea: selección, secuencia y orden de lectura.

### Expertise / integración

```text
   .
.  .  .
   .
```

El cruce representa la intersección entre desarrollo, diseño, producto e integraciones.

### Contacto / convergencia

```text
.     .
   .
.     .
```

Los puntos convergen alrededor de un centro: conversación y encuentro.

No se crean variantes nuevas sin una función clara dentro de la navegación o del relato.

## 6. Movimiento

Secuencia principal:

1. Al cargar, la firma completa aparece por fragmentos y siempre termina legible como `franc.is.dead` con sus tres puntos inferiores.
2. Después de los primeros 90 px de scroll, `franc` y `dead` salen y colapsan; los `is` se desvanecen sin perder su medida.
3. El contenedor reduce su ancho desde el lado derecho. El primer punto nunca se desplaza del origen izquierdo.
4. Al cambiar de sección, solo se mueven los cinco puntos. La transformación usa una curva suave y precisa, sin rebote.

Parámetros de referencia:

- Duración de compactación: 420–720 ms.
- Duración de mutación: 760 ms.
- Curva: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Con `prefers-reduced-motion: reduce`, la transición es inmediata y el estado final conserva toda la información.

## 7. Uso editorial

- La firma completa vive en el header al inicio y puede aparecer una vez en una portada o cierre.
- El isotipo puede mutar en el header para orientar la sección actual.
- Frases con `is` —por ejemplo `this.is.me`— se usan con moderación y solo cuando también funcionan como etiqueta de sección.
- Los puntos no se usan como textura, confeti, patrón de fondo, viñetas genéricas ni decoración repetida.
- Los iconos funcionales siguen usando su propio sistema; el isotipo no los reemplaza.

## 8. Color y contraste

Versiones principales:

- Bone `#F5F5F2` sobre Ink `#151518`.
- Ink `#151518` sobre Bone `#F5F5F2`.

Se permiten los colores de acento del portfolio solo cuando el contraste sigue siendo suficiente. No se aplican degradados dentro del logo.

## 9. Accesibilidad

- El enlace del header se anuncia como `Inicio franc.is.dead`.
- La firma mantiene `aria-label="franc.is.dead"` aunque visualmente esté compacta.
- Las mutaciones son complementarias: nunca contienen por sí solas información necesaria para navegar.
- La versión de cinco puntos usada como elemento ambiental debe ocultarse del árbol accesible o tener una etiqueta contextual clara.

## 10. Implementación de referencia

- Componente tipográfico: `src/components/shared/BrandLogo.astro`.
- Variantes ambientales: `src/components/shared/MorphingDots.astro`.
- Transformaciones y medidas: `src/styles/global.css`.
- Cambio de estado por scroll: `src/scripts/animations.ts`.

La implementación tipográfica es la fuente de verdad. Los SVG exportados se consideran recursos secundarios y deben regenerarse si cambia la construcción principal.
