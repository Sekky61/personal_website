import { ElevatedCard } from "../../../components/Card";

export function ProfessionalWork() {
  return (
    <section aria-labelledby="professional-work">
      <h2 id="professional-work" className="display-small mb-4">
        Professional work
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ElevatedCard className="h-full p-4">
          <article aria-labelledby="eos">
            <h3 id="eos" className="headline-small m-0 mb-2">
              EOS
            </h3>
            <p className="label-large mb-4">Frontend development</p>
            <p>
              I work as a frontend developer at{" "}
              <a
                href="https://www.eos.cz/"
                target="_blank"
                rel="noreferrer noopener"
              >
                EOS Digital s.r.o.
              </a>
            </p>
            <p>
              EOS is a platform for managing sports clubs and other
              organizations, with tools for membership, payments and
              communication, alongside a mobile app and club websites.
            </p>
          </article>
        </ElevatedCard>
        <ElevatedCard className="h-full p-4">
          <article aria-labelledby="pm-ckait">
            <h3 id="pm-ckait" className="headline-small m-0 mb-2">
              PM ČKAIT
            </h3>
            <p className="label-large mb-4">
              Automation and insurance administration
            </p>
            <p>
              I work on automations and an internal system for arranging and
              renewing supplementary insurance for{" "}
              <a
                href="https://www.pmckait.cz/"
                target="_blank"
                rel="noreferrer noopener"
              >
                PM ČKAIT, s.r.o.
              </a>
              , ČKAIT&apos;s insurance brokerage subsidiary.
            </p>
            <p>
              <a
                href="https://zpravy.ckait.cz/vydani/2026-01/aktualizacni-dodatek-k-ramcove-pojistne-smlouve-ckait-otevira-nove-moznosti/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Read about the system in Zprávy a informace ČKAIT
              </a>{" "}
              (in Czech, February 2026).
            </p>
          </article>
        </ElevatedCard>
      </div>
    </section>
  );
}
