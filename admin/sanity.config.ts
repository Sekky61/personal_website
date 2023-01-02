import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk';
import schemas from './schemas/schema';
import { codeInput } from "@sanity/code-input";
import { visionTool } from '@sanity/vision';

const common = {
    projectId: "3q20z5w8",
    plugins: [
        deskTool(),
        codeInput(),
        visionTool()
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
