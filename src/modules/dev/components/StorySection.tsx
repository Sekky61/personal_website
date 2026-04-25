import type { ReactNode } from "react";
import { ElevatedCard } from "../../../components/Card";

type StorySectionProps = {
  title: string;
  description: string;
  controls: ReactNode;
  preview: ReactNode;
};

export function StorySection({
  title,
  description,
  controls,
  preview,
}: StorySectionProps) {
  return (
    <section className="grid items-start gap-4 lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] xl:grid-cols-[minmax(360px,420px)_minmax(0,1fr)]">
      <ElevatedCard className="surface-container p-5 lg:sticky lg:top-24">
        <h2 className="headline-small mb-2">{title}</h2>
        <p className="body-medium mb-5 text-on-surface-variant">
          {description}
        </p>
        <div className="flex flex-col gap-4">{controls}</div>
      </ElevatedCard>

      <ElevatedCard className="surface-container-low p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="title-medium m-0">Preview</h3>
          <span className="label-medium rounded-full border border-outline/50 px-3 py-1 text-on-surface-variant">
            Live
          </span>
        </div>
        <div className="grid min-h-64 place-items-start">{preview}</div>
      </ElevatedCard>
    </section>
  );
}
