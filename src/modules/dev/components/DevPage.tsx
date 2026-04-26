import { ArticlePreviewCardStory } from "./ArticlePreviewCardStory";
import { PillsStory } from "./PillsStory";
import { RepoCardStory } from "./RepoCardStory";

export function DevPage() {
  return (
    <div className="relative left-1/2 flex w-screen max-w-[min(100vw-1.5rem,1520px)] -translate-x-1/2 flex-col gap-8 px-3 md:max-w-[min(100vw-3rem,1520px)] md:px-6 xl:px-8">
      <section className="surface-container-low shape-large overflow-hidden border border-outline/30">
        <div className="from-primary-container via-surface-container to-tertiary-container flex flex-col gap-4 bg-linear-to-br px-6 py-8 md:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-large rounded-full border border-outline/40 bg-background/70 px-3 py-1">
              maintenance hatch
            </span>
            <span className="label-large text-on-surface-variant">
              if you found this by accident, no you did not
            </span>
          </div>
          <div className="max-w-3xl">
            <h1 className="display-medium mb-3">
              Nothing interesting lives here
            </h1>
            <p className="headline-small m-0 text-on-surface-variant">
              Just a quiet place to poke at cards, stretch some copy, and make
              sure the furniture still fits through the doorway.
            </p>
          </div>
        </div>
      </section>

      <PillsStory />
      <ArticlePreviewCardStory />
      <RepoCardStory />
    </div>
  );
}
