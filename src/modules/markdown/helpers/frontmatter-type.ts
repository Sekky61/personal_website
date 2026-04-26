import { type } from "arktype";
import { toDateString } from "./to-date-string";

const releaseDateType = type(["string | Date", "=>", toDateString]).to(
  "string",
);

export const frontmatterType = type({
  "title?": "string",
  "published?": "boolean",
  "releaseDate?": releaseDateType,
  "summary?": "string",
  "titleImage?": "string",
  "tags?": "string[]",
}).onUndeclaredKey("delete");
