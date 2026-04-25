import { useState } from "react";
import { Pill, Pills } from "../../../components/Pill";
import { splitLines } from "../../../lib/split-lines";
import { StringField } from "../../forms/components/StringField";
import { StringListField } from "../../forms/components/StringListField";
import { StorySection } from "./StorySection";

export function PillsStory() {
  const [singleLabel, setSingleLabel] = useState("Ship it");
  const [listValue, setListValue] = useState("React\nTypeScript\nPlayground");

  return (
    <StorySection
      title="Pills"
      description="Check how short labels and grouped tags wrap, truncate, and balance on the current theme."
      controls={
        <>
          <StringField
            label="Single pill"
            value={singleLabel}
            onChange={setSingleLabel}
          />
          <StringListField
            label="Pill list"
            value={listValue}
            onChange={setListValue}
            helperText="One pill label per line."
          />
        </>
      }
      preview={
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="label-medium text-on-surface-variant">Single</span>
            <Pill>{singleLabel || " "}</Pill>
          </div>
          <div className="flex flex-col gap-3">
            <span className="label-medium text-on-surface-variant">Group</span>
            <Pills texts={splitLines(listValue)} />
          </div>
        </div>
      }
    />
  );
}
