"use client";
import { cn } from "@common/utils/cn";

type Props = {
  code: string;
  className?: string;
};

export const CopyButton = ({ code, className }: Props) => {
  const copyClicked = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button
      type="button"
      className={cn(
        "checkmark-button w-[40px] h-[40px] p-[6px] rounded-full hover:tertiary-container",
        className,
      )}
      onClick={copyClicked}
    >
      <span className="material-symbols-outlined">content_copy</span>
    </button>
  );
};
