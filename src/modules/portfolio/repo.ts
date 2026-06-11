export type Repo = {
  name: string;
  link: string;
  description: string;
  technologies: string[];
  img: string | null;
  githubData: {
    name: string;
    description: string | null;
    updated_at: string;
    language: string;
  };
};
