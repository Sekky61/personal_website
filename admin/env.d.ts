/// <reference types="vite/client" />

// Help: https://vitejs.dev/guide/env-and-mode.html
interface ImportMetaEnv {
    readonly SANITY_STUDIO_PROJECT_ID: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}