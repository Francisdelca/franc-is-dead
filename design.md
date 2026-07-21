# Design System / franc.is.dead Portfolio

La construcción, compactación, mutaciones y reglas de uso del logo se documentan en [`LOGO-MANUAL.md`](./LOGO-MANUAL.md).

## Esencia

El sitio debe funcionar como portfolio, no como presentacion de marca. La identidad aparece con mucha precision: abre la experiencia, marca el cierre y luego deja que los proyectos ocupen el centro.

La atmosfera viene del moodboard: baja luz, archivo editorial, arquitectura, imagen analogica/digital, silencios amplios y contraste fuerte. El resultado debe sentirse personal, sobrio y un poco cinematografico, sin caer en una landing explicativa.

## Firma

La firma completa parte de `franc.is.dead` con tres puntos debajo.

Al ocultar todas las letras, solo queda esta forma de 5 puntos:

```text
. .
. . .
```

Reglas:

- Usar la firma completa solo en el inicio.
- Al hacer scroll, las letras se desvanecen y quedan unicamente los 5 puntos.
- No usar puntos como patron decorativo, textura, bullets o recurso repetido.
- La unica repeticion permitida es en el footer, esquina inferior derecha, como cierre.
- Mantener siempre 2 puntos arriba y 3 abajo.

## Color

Paleta principal:

- Ink: `#151518`
- Bone: `#F5F5F2`
- Steel: `#41434D`
- Blood: `#5A0611`
- Cyanotype: `#1E6384`
- Wood: `#B98B4B`

Uso:

- Ink domina fondos y crea atmosfera.
- Bone domina texto, botones primarios y secciones de lectura.
- Steel, Blood, Cyanotype y Wood funcionan como acentos para previews, imagenes y estados.
- Evitar que la paleta se vuelva monotona o demasiado decorativa.

## Tipografia

Familia base: Avenir / Avenir Next / Helvetica Neue / Arial.

Uso:

- Titulares grandes, limpios y sin tracking negativo.
- Texto secundario pequeno, aireado y con lectura editorial.
- Evitar exceso de pesos. La jerarquia debe venir de escala, espacio y contraste.

## Layout

La portada funciona como un unico escenario fijado al viewport. Hero, Perfil, Proyectos, Expertise y Contacto no se apilan visualmente: ocupan las mismas coordenadas y se reemplazan como estados de una sola diapositiva.

Dentro de ese escenario, el sitio se organiza como archivo de proyectos:

- Hero con firma animada, statement breve y proyecto destacado.
- Lista de proyectos como elemento principal de exploracion.
- Seccion de enfoque para explicar como se estructura el trabajo.
- Contacto o contenido pendiente al cierre.

Principios:

- Mucho espacio negativo.
- Mantener el escenario en `top: 0` durante todo el recorrido; liberar el scroll natural solo despues de Contacto.
- Ningun borde de seccion debe cruzar el viewport. Los cambios de contexto suceden mediante aperturas, iris, escala y desplazamientos internos.
- Bordes finos y reticula visible solo cuando ayuda.
- No usar cards dentro de cards.
- No llenar la interfaz de explicaciones sobre la marca.
- Cada proyecto debe poder leerse rapido: titulo, rol, categoria, ano y preview.

## Movimiento

Animaciones con Lenis + GSAP/ScrollTrigger:

- Entrada lenta de letras y puntos de la firma.
- Scroll en hero: letras desaparecen, puntos permanecen.
- Lenis controla la inercia global y mantiene ScrollTrigger sincronizado.
- Un unico timeline fijado controla los cinco estados; el documento avanza, pero el encuadre permanece inmovil.
- El contenido de cada escena sale en parallax antes de dar paso a la siguiente.
- Tres profundidades sostienen la ilusion espacial: fondo lento, capa atmosferica intermedia y contenido en primer plano.
- Perfil abre el fondo desde el centro y revela primero el shine azul.
- Proyectos nace desde un punto blanco central que se expande hasta cubrir el viewport.
- Expertise sube como una capa y Contacto se abre desde un iris contextual.
- El nuevo contenido entra después de que su fondo ya estableció el cambio de contexto.
- Hover de proyectos con preview contenida.
- Parallax contenido en fondos, shines, texto e imagen destacada.

Movimiento deseado:

- Editorial, preciso, con baja friccion.
- No exagerar elasticidad, rebotes o loops ornamentales.
- La animacion debe ayudar a leer el portfolio, no competir con los proyectos.

## Imagenes

Las imagenes deben tener presencia real. No usar fondos genericos si hay material del proyecto.

Tratamiento sugerido:

- Contraste alto.
- Saturacion contenida.
- Recortes intencionales.
- Piezas grandes para proyectos principales.
- Capturas limpias para interfaces.

## Contenido de proyectos

Plantilla minima por proyecto:

- Nombre
- Ano
- Rol
- Categoria
- Cliente o contexto
- Problema / intencion
- Proceso breve
- Resultado
- Imagen principal
- Galeria o enlace

El tono del copy debe ser breve, visual y concreto. Mas archivo que pitch.
