import { createFileRoute } from '@tanstack/react-router'
import { DeferredContent } from '../components/DeferredContent'
import { getAboutContent } from '../lib/content'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      {
        title: 'About me | Majer',
      },
    ],
  }),
  loader: () => getAboutContent(),
  component: About,
})

function About() {
  const about = Route.useLoaderData()

  return (
    <>
      <h1 className="display-large mb-6">About me</h1>
      <DeferredContent
        title="About content copied"
        description="The original MDX source is already in web2. Rendering is intentionally deferred to the next iteration, so this page exposes the copied source directly for now."
        source={about.source}
        defaultOpen
      />
    </>
  )
}
