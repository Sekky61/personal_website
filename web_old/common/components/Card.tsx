import { cn } from "@common/utils/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const ElevatedCard = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "surface-container-low elevation-1 shape-medium hover:elevation-2",
        className,
      )}
    >
      {children}
    </div>
  );
};
