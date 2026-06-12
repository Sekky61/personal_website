import * as z from "zod";

const RepoGithubDataSchema = z.object({
  name: z.string().nonempty(),
  link: z.string().nonempty(),
  updated_at: z.string().nonempty(),
  language: z.string().nonempty(),
});

export const RepoSchema = z.object({
  name: z.string().nonempty(),
  link: z.string().nonempty(),
  description: z.string().nonempty().max(200, {
    error: "Description should be short. It is displayed in a card.",
  }),
  technologies: z.array(z.string().nonempty()),
  img: z.union([z.string(), z.null()]),
  githubData: RepoGithubDataSchema,
});

export type Repo = z.infer<typeof RepoSchema>;
