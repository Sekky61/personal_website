import { RepositoryCard } from "@modules/portfolio";
import { useState } from "react";
import { splitLines } from "../../../lib/split-lines";
import { StringField } from "../../forms/components/StringField";
import { StringListField } from "../../forms/components/StringListField";
import { defaultRepo } from "../constants/default-repo";
import { StorySection } from "./StorySection";

export function RepoCardStory() {
  const [name, setName] = useState(defaultRepo.name);
  const [description, setDescription] = useState(defaultRepo.description);
  const [link, setLink] = useState(defaultRepo.link);
  const [technologiesValue, setTechnologiesValue] = useState(
    defaultRepo.technologies.join("\n"),
  );

  return (
    <StorySection
      title="Repository card"
      description="Test project names, descriptions, and technology tags against the current portfolio card layout."
      controls={
        <>
          <StringField label="Name" value={name} onChange={setName} />
          <StringField
            label="Description"
            value={description}
            onChange={setDescription}
          />
          <StringField label="Link" value={link} onChange={setLink} />
          <StringListField
            label="Technologies"
            value={technologiesValue}
            onChange={setTechnologiesValue}
            helperText="One technology per line."
          />
        </>
      }
      preview={
        <div className="w-full max-w-sm">
          <RepositoryCard
            repo={{
              ...defaultRepo,
              name,
              description,
              link,
              technologies: splitLines(technologiesValue),
            }}
          />
        </div>
      }
    />
  );
}
