import repositoriesRaw from "../content/repositories.json?raw";
import type { Repo } from "./repo";

export function getRepositories() {
  const repositories = JSON.parse(repositoriesRaw) as Repo[];

  return repositories;
}
