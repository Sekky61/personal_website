import type { ReactNode } from "react";

// Pill component, used for tags
export function Pill({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg font-semibold label-medium px-2.5 py-1 primary-container">
      {children}
    </div>
  );
}

// Pills component,
export function Pills({ texts }: { texts: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {texts.map((text: string) => {
        return <Pill key={text}>{text}</Pill>;
      })}
    </div>
  );
}
