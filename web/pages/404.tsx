import Head from 'next/head'
import Link from 'next/link'

export default function FourOhFour() {
    return <>
        <Head>
            <title>404</title>
        </Head>
        <h1 className='text-5xl font-bold'>404 - Page Not Found</h1>
        <Link href="/">
            Go back home
        </Link>
    </>
}