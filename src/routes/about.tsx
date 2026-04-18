import { createFileRoute } from "@tanstack/react-router";
import { getAboutContent } from "../lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About me | Majer",
      },
    ],
  }),
  component: About,
});

function About() {
  const about = getAboutContent();
  const Content = about.Content;

  return (
    <>
      <h1 className="display-large mb-6">About me</h1>
      <Content />
    </>
  );
}
