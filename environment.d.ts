declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SANITY_GRAPHQL_URL: string;
            NEXT_PUBLIC_SANITY_PROJECT_ID: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
        }
    }
}