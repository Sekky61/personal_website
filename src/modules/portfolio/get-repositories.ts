import { err, ok } from "neverthrow";
import { safeParse } from "zod";
import repositoriesRaw from "../../content/repositories.json?raw";
import { ReposJsonParser } from "./repo";

export function getRepositories() {
  const parseResult = safeParse(ReposJsonParser, repositoriesRaw);
  if (!parseResult.success) {
    return err(parseResult.error);
  }

  return ok(parseResult.data);
}
