import { profile } from "./profile";

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Casos de estudio", href: "/projects/" },
  { label: "Experiencia", href: "/experience/" },
  { label: "Sobre mí", href: "/about/" },
  { label: "Contacto", href: "/contact/" },
  { label: "Descargar CV", href: profile.cvUrl, download: true },
];
