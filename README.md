# Francis Del Castillo / franc.is.dead

Portafolio migrado a Astro desde una base HTML, CSS y JavaScript existente. La prioridad del proyecto es conservar la identidad visual de `franc.is.dead` y permitir publicar una primera versión funcional con proyectos resumidos, casos de estudio progresivos y contenido editable.

## Requisitos

- Node.js 22 o superior recomendado.
- npm.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Compilar

```bash
npm run build
```

## Previsualizar build

```bash
npm run preview
```

## Agregar un proyecto

1. Crea un archivo Markdown en `src/content/projects/`.
2. Usa como referencia cualquiera de los proyectos existentes.
3. Mantén `published: true` para que aparezca en el listado.
4. Usa `featured: true` si debe aparecer en inicio.
5. Usa `caseStudyReady: false` mientras el caso completo esté en preparación.

Los campos opcionales solo se muestran si tienen contenido.

## Completar un caso de estudio

Puedes ampliar el frontmatter del proyecto con:

- `context`
- `challenges`
- `solution`
- `results`
- `gallery`
- `externalUrl`
- `collaborationNote`
- `archiveNote`

No hace falta llenar todos los campos para publicar.

## Añadir imágenes

Convención recomendada:

```text
public/
  images/
    projects/
      ghs-wordpress/
      ghs-headless/
      puntoedu/
      yakupark/
      rc-travel/
      team-viajero/
```

Luego agrega la ruta en el proyecto:

```yaml
cover: /images/projects/ghs-wordpress/cover.webp
gallery:
  - /images/projects/ghs-wordpress/admin.webp
```

Usa `alt` descriptivos cuando crees componentes de galería más específicos.

## Cambiar datos personales

Edita `src/data/profile.ts`.

Los campos `email`, `linkedin` y `github` están vacíos a propósito para no inventar datos.

## Agregar el PDF del CV

Coloca el archivo en:

```text
public/francis-del-castillo-cv.pdf
```

Los botones de descarga ya apuntan a esa ruta.

## Publicar en Cloudflare Pages

Configuración sugerida:

- Framework preset: Astro.
- Build command: `npm run build`.
- Output directory: `dist`.
- Node.js: 22 o superior.
- Variables de entorno: ninguna requerida para esta versión estática.

No se usa CMS, backend, base de datos ni adaptador SSR.
