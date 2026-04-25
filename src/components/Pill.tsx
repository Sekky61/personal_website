import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "#/lib/utils";

export type IconProps = {
  children: ReactNode;
  Icon?: LucideIcon | null | undefined;
} & Omit<ComponentPropsWithoutRef<"span">, "children">;

/**
 * The icon has a bit of extra size, it eats into the y-margins and into the left margin to be optically more pleasant
 */
export function Pill({ children, Icon, className, ...rest }: IconProps) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center text-trim gap-1 primary-container whitespace-nowrap label-medium rounded-lg px-2.5 py-1 font-semibold",
        className,
      )}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className="size-[1.2em] -m-[0.1em] -ml-0.5 shrink-0 text-current"
          strokeWidth={2.2}
        />
      )}
      <span className="truncate">{children}</span>
    </span>
  );
}

export function Pills({ texts }: { texts: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {texts.map((text) => (
        <Pill key={text}>{text}</Pill>
      ))}
    </div>
  );
}
