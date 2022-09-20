import Link from 'next/link'

export default function FourOhFour() {
    return <>
        <h1 className='text-5xl font-bold'>404 - Page Not Found</h1>
        <Link href="/">
            <a>
                Go back home
            </a>
        </Link>
    </>
}