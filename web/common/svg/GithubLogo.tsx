import clsx from "clsx";

// props to allow fill and size
type GithubLogoProps = {
  className?: string;
};

export const GithubLogo = ({ className }: GithubLogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <title>GitHub</title>
      <path d="M12 0a12 12 0 0 0-3.8 23.39c.6.1.8-.26.8-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.09-.72.09-.72 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.94 0-1.3.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1-.33 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.56 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17a4.63 4.63 0 0 1 1.24 3.22c0 4.61-2.81 5.63-5.48 5.92.43.38.82 1.1.82 2.23v3.29c0 .32.2.7.8.58A12 12 0 0 0 12 0z" />
    </svg>
  );
};
