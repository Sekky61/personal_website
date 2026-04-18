const SHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
const sha_text = SHA ? `commit ${SHA.slice(0, 7)}` : "local build";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 py-4 px-4">
      <div className="small-container flex-col">
        <div>Michal Majer, {year}</div>
        <div className="flex gap-1">
          <span>Got feedback? Visit</span>
          <a
            target="_blank"
            href="https://github.com/Sekky61/personal_website/issues"
            rel="noreferrer noopener"
            className="link"
          >
            issues on Github
          </a>
          <span className="text-transparent">{sha_text}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
