import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk';
import schemas from './schemas/schema';
import { codeInput } from "@sanity/code-input";
import { visionTool } from '@sanity/vision';

export default defineConfig([
    {
        name: "prod_config",
        title: "Production dataset",
        projectId: "3q20z5w8",
        dataset: "production",
        basePath: "/prod",
        plugins: [
            deskTool(),
            codeInput(),
            visionTool()
        ],
        schema: {
            types: schemas,
        },
    },
    {
        name: "dev_config",
        title: "Development dataset",
        projectId: "3q20z5w8",
        dataset: "development",
        basePath: "/dev",
        plugins: [
            deskTool(),
            codeInput(),
            visionTool()
        ],
        schema: {
            types: schemas,
        },
    }
]);
