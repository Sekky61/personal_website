declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Overrides decision based on environment.
       */
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export type {};
