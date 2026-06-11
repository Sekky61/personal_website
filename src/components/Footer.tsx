import { APP_DATA } from "../lib/metadata/app-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 py-4">
      <div className="small-container px-4">
        <div>
          {APP_DATA.authorName}{" "}
          <span className="opacity-50" aria-hidden>
            ·
          </span>{" "}
          {year}
        </div>
        <div className="text-sm">
          <span>Got feedback? Visit&nbsp;</span>
          <a
            target="_blank"
            href={APP_DATA.feedbackUrl}
            rel="noreferrer noopener"
            className="link"
          >
            issues on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
