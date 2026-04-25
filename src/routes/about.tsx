import { createFileRoute } from "@tanstack/react-router";
import { getAboutContent } from "../lib/content";
import { pageTitle } from "../lib/metadata/page-title";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: pageTitle("About me"),
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
