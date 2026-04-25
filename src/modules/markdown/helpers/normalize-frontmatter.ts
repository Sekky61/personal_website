import type { MarkdownFrontmatter } from "../types";
import { asBoolean } from "./as-boolean";
import { asDateString } from "./as-date-string";
import { asString } from "./as-string";

export function normalizeFrontmatter(
  data: Record<string, unknown>,
): MarkdownFrontmatter {
  const title = asString(data.title);
  const published = asBoolean(data.published);
  const releaseDate = asDateString(data.releaseDate);
  const summary = asString(data.summary);
  const titleImage = asString(data.titleImage);

  return {
    ...(title === undefined ? {} : { title }),
    ...(published === undefined ? {} : { published }),
    ...(releaseDate === undefined ? {} : { releaseDate }),
    ...(summary === undefined ? {} : { summary }),
    ...(titleImage === undefined ? {} : { titleImage }),
  };
}
