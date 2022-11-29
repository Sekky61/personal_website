declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SANITY_PROJECT_ID: string;
            DEV_DATASET?: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }