import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk';
import schemas from './schemas/schema';
import { codeInput } from "@sanity/code-input";
import { visionTool } from '@sanity/vision';
import { latexInput } from "sanity-plugin-latex-input";
import { table } from "@sanity/table";
import { tags } from 'sanity-plugin-tags';

const common = {
    projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
    plugins: [
        deskTool(),
        codeInput(),
        visionTool(),
        latexInput(),
        table(),
        tags()
    ],
    schema: {
        types: schemas,
    },
};

export default defineConfig([
    {
        name: "prod_config",
        title: "Production dataset",
        dataset: "production",
        basePath: "/prod",
        ...common,
    },
    {
        name: "dev_config",
        title: "Development dataset",
        dataset: "development",
        basePath: "/dev",
        ...common,
    }
]);
