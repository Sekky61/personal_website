import { APP_DATA } from "../lib/metadata/app-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 px-4 py-4">
      <div className="small-container flex flex-col gap-2">
        <div>
          {APP_DATA.authorName}, {year}
        </div>
        <div className="flex flex-wrap gap-1">
          <span>Got feedback? Visit</span>
          <a
            target="_blank"
            href={APP_DATA.feedbackUrl}
            rel="noreferrer noopener"
            className="link"
          >
            issues on GitHub
          </a>
          <span>while the migration is in progress.</span>
        </div>
      </div>
    </footer>
  );
}
