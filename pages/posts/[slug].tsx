import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import { usePreviewSubscription, urlFor } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage,
    categories[]->{
      _id,
      title
    },
    "slug": slug.current
  }
`

export default function Post({ data, preview }: any) {
    const router = useRouter()

    const { data: post } = usePreviewSubscription(postQuery, {
        params: { slug: data.post?.slug },
        initialData: data.post,
        enabled: preview && data.post?.slug,
    })

    if (!router.isFallback && !data.post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    const { title, mainImage, body } = post

    return (
        <article>
            <h2>{title}</h2>
            <figure>
                <img src={urlFor(mainImage).url()} />
            </figure>
            <PortableText value={body} />
        </article>
    )
}

export async function getStaticProps({ params, preview = false }: any) {
    const post = await getClient(preview).fetch(postQuery, {
        slug: params.slug,
    })

    return {
        props: {
            preview,
            data: { post },
        },
    }
}

export async function getStaticPaths() {
    const paths = await getClient().fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: true,
    }
}