import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <body className='dark:bg-dark text-slate-800 dark:text-white'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}