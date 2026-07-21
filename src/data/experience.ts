import cvData from "./cv.json";

export type ExperienceType = "employment" | "independent";

export interface Experience {
  id: "ludik" | "independent";
  type: ExperienceType;
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  summary: string;
  responsibilities: string[];
}

export const experience = cvData.experience as Experience[];
