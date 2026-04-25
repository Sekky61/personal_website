import { createFileRoute } from '@tanstack/react-router'
import { ArticlePreviewCard } from '../components/ArticlePreviewCard'
import { Catchphrase } from '../components/Catchphrase'
import { getLatestArticles } from '../lib/content'
import { APP_DATA } from '../lib/metadata/app-data'
import { pageTitle } from '../lib/metadata/page-title'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: pageTitle(null),
      },
      {
        name: 'description',
        content: APP_DATA.appDescription,
      },
    ],
  }),
  loader: () => getLatestArticles(2),
  component: HomePage,
})

function HomePage() {
  const posts = Route.useLoaderData()

  return (
    <>
      <div className="mb-12 flex flex-col-reverse items-stretch justify-stretch md:flex-row">
        <div>
          <div className="primary-container rounded-b-xl p-4 text-5xl font-semibold text-nowrap md:rounded-xl md:rounded-r-none">
            Hi, I&apos;m Michal.
          </div>
          <Catchphrase />
        </div>
        <div className="primary-container flex w-full items-center justify-center rounded-t-3xl p-4 md:rounded-3xl md:rounded-tl-none">
          <img
            src="/img/myFace.png"
            width={500}
            height={500}
            className="rounded-lg"
            alt="Michal Majer portrait"
          />
        </div>
      </div>

      <section className="latest-posts">
        <h2 className="display-medium mb-5 font-semibold">Latest posts</h2>
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <ArticlePreviewCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
