import type { Repo } from "../../../lib/content";

export const defaultRepo: Repo = {
  name: "Component Workshop",
  link: "https://example.com/component-workshop",
  description:
    "An internal sandbox for exercising portfolio cards, checking long descriptions, and tuning presentation details.",
  technologies: ["React", "TanStack Start", "Tailwind CSS"],
  img: null,
  githubData: {
    name: "component-workshop",
    description: "Internal component playground",
    updated_at: "2026-04-25T00:00:00.000Z",
    language: "TypeScript",
  },
};
