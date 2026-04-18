import { feedbackUrl } from '../lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-10 px-4 py-4">
      <div className="small-container flex flex-col gap-2">
        <div>Michal Majer, {year}</div>
        <div className="flex flex-wrap gap-1">
          <span>Got feedback? Visit</span>
          <a
            target="_blank"
            href={feedbackUrl}
            rel="noreferrer noopener"
            className="link"
          >
            issues on GitHub
          </a>
          <span>while the migration is in progress.</span>
        </div>
      </div>
    </footer>
  )
}
