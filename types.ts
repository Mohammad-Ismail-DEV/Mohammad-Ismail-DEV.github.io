export interface Project {
  title: string;
  stack: string;
  description: string;
  details?: string[];
  links?: Link[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  location: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export interface Link {
  label: string;
  url: string;
}
