import {
  siAstro,
  siCapacitor,
  siCloudflare,
  siDocker,
  siFirebase,
  siGooglecloud,
  siGraphql,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNuxt,
  siPostgresql,
  siPython,
  siReact,
  siGatsby,
  siSupabase,
  siVuedotjs,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";

export const technologyIds = [
  "astro",
  "wordpress",
  "laravel",
  "nuxt",
  "vue",
  "capacitor",
  "nextjs",
  "supabase",
  "firebase",
  "aws",
  "cloudflare",
  "gcp",
  "graphql",
  "postgresql",
  "mysql",
  "docker",
  "react",
  "gatsby",
  "python",
] as const;

export type TechnologyId = (typeof technologyIds)[number];

interface Technology {
  label: string;
  icon?: SimpleIcon;
  monogram?: string;
}

export const technologies: Record<TechnologyId, Technology> = {
  astro: { label: "Astro", icon: siAstro },
  wordpress: { label: "WordPress", icon: siWordpress },
  laravel: { label: "Laravel", icon: siLaravel },
  nuxt: { label: "Nuxt", icon: siNuxt },
  vue: { label: "Vue.js", icon: siVuedotjs },
  capacitor: { label: "Capacitor", icon: siCapacitor },
  nextjs: { label: "Next.js", icon: siNextdotjs },
  supabase: { label: "Supabase", icon: siSupabase },
  firebase: { label: "Firebase", icon: siFirebase },
  // Simple Icons no distribuye actualmente la marca de AWS.
  aws: { label: "AWS", monogram: "AWS" },
  cloudflare: { label: "Cloudflare", icon: siCloudflare },
  gcp: { label: "Google Cloud", icon: siGooglecloud },
  graphql: { label: "GraphQL", icon: siGraphql },
  postgresql: { label: "PostgreSQL", icon: siPostgresql },
  mysql: { label: "MySQL", icon: siMysql },
  docker: { label: "Docker", icon: siDocker },
  react: { label: "React", icon: siReact },
  gatsby: { label: "Gatsby", icon: siGatsby },
  python: { label: "Python", icon: siPython },
};
