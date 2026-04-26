<!-- intent-skills:start -->
# Skill mappings - when working in these areas, load the linked skill file into context.
skills:
  - task: "working on TanStack Start app setup, the root document shell, or router bootstrapping"
    load: "node_modules/@tanstack/start-client-core/skills/start-core/SKILL.md"
  - task: "working on file-based routes under src/routes, route tree behavior, or navigation"
    load: "node_modules/@tanstack/router-core/skills/router-core/SKILL.md"
  - task: "working on route loaders, preloading, pending states, or SSR query integration"
    load: "node_modules/@tanstack/router-core/skills/router-core/data-loading/SKILL.md"
  - task: "working on React DB collections, live queries, or the chat demo data flow"
    load: "node_modules/@tanstack/react-db/skills/react-db/SKILL.md"
  - task: "working on app or Vite devtools setup"
    load: "node_modules/@tanstack/devtools/skills/devtools-app-setup/SKILL.md"
<!-- intent-skills:end -->

# Module conventions

- Do not create `index.ts` files for local modules.
- When creating a module such as `src/modules/markdown`, split it into focused files instead of aggregating logic in one file. Use module subdirectories like `helpers/`, `constants/`, `components/`
- Keep one function or one constant per file.
