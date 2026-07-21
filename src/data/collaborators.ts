export type ConsentStatus = "requested" | "approved" | "declined";

export interface Collaborator {
  id: string;
  name: string;
  consent: ConsentStatus;
  profiles: Array<{
    label: "Portafolio" | "LinkedIn" | "Sitio web";
    url: string;
  }>;
}

/**
 * Los perfiles solo se muestran cuando `consent` es `approved`.
 * Esto permite preparar los créditos sin publicar datos antes de recibir permiso.
 */
export const collaborators: Collaborator[] = [
  {
    id: "walter",
    name: "Walter Vivar Sanchez",
    consent: "approved",
    profiles: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/waltervivars/",
      },
    ],
  },
  {
    id: "diana",
    name: "Diana Manrique Ticliahuanca",
    consent: "approved",
    profiles: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/dianamanriquet/",
      },
    ],
  },
];

export const collaboratorsById = new Map(
  collaborators.map((collaborator) => [collaborator.id, collaborator]),
);

interface ProjectCredit {
  collaboratorId: string;
  role: string;
  contribution: string;
}

export function resolveCollaborators(credits: ProjectCredit[]) {
  return credits.map((credit) => {
    const collaborator = collaboratorsById.get(credit.collaboratorId);

    if (!collaborator) {
      throw new Error(`Colaborador no encontrado: ${credit.collaboratorId}`);
    }

    return { ...credit, collaborator };
  });
}
