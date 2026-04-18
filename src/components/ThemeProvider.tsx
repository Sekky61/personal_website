import { ScriptOnce } from "@tanstack/react-router";

import { THEME_INIT_SCRIPT } from "#/lib/theme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScriptOnce>{THEME_INIT_SCRIPT}</ScriptOnce>
      {children}
    </>
  );
}
