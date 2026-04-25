import { createFileRoute } from "@tanstack/react-router";
import { DevPage } from "../modules/dev/components/DevPage";
import { pageTitle } from "../lib/metadata/page-title";

export const Route = createFileRoute("/dev")({
  head: () => ({
    meta: [
      {
        title: pageTitle("Nothing to see here"),
      },
      {
        name: "robots",
        content: "noindex",
      },
    ],
  }),
  component: DevRoute,
});

function DevRoute() {
  return <DevPage />;
}
