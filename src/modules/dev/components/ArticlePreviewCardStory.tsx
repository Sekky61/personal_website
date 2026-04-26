import { useState } from "react";
import { ArticlePreviewCard } from "../../../components/ArticlePreviewCard";
import { splitLines } from "../../../lib/split-lines";
import { StringField } from "../../forms/components/StringField";
import { StringListField } from "../../forms/components/StringListField";
import { defaultArticlePreview } from "../constants/default-article-preview";
import { StorySection } from "./StorySection";

export function ArticlePreviewCardStory() {
  const [title, setTitle] = useState(defaultArticlePreview.title);
  const [summary, setSummary] = useState(defaultArticlePreview.summary ?? "");
  const [releaseDate, setReleaseDate] = useState(
    defaultArticlePreview.releaseDate,
  );
  const [readingTime, setReadingTime] = useState(
    defaultArticlePreview.readingTime,
  );
  const [tagsValue, setTagsValue] = useState(
    (defaultArticlePreview.tags ?? []).join("\n"),
  );

  return (
    <StorySection
      title="Article preview card"
      description="Exercise the blog card with real-length titles, summaries, and frontmatter tags before you ship new content."
      controls={
        <>
          <StringField label="Title" value={title} onChange={setTitle} />
          <StringField label="Summary" value={summary} onChange={setSummary} />
          <StringField
            label="Release date"
            value={releaseDate}
            onChange={setReleaseDate}
          />
          <StringField
            label="Reading time"
            value={readingTime}
            onChange={setReadingTime}
          />
          <StringListField
            label="Tags"
            value={tagsValue}
            onChange={setTagsValue}
            helperText="One tag per line. The card shows the first three."
          />
        </>
      }
      preview={
        <div className="w-full max-w-4xl">
          <ArticlePreviewCard
            post={{
              ...defaultArticlePreview,
              title,
              summary,
              releaseDate,
              readingTime,
              tags: splitLines(tagsValue),
            }}
          />
        </div>
      }
    />
  );
}
