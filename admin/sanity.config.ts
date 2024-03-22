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
        codeInput({
            codeModes: [
                {
                    name: 'cpp',
                    // dynamic import the angular package, and initialize the plugin after it is loaded
                    // This way, the language is only when it is selected
                    loader: () => import('@codemirror/lang-cpp').then(({ cpp }) => cpp()),
                },
            ],
        }),
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
