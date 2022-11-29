import type { ReactElement, ReactNode } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import Layout from '@components/Layout'
import Head from 'next/head'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// This way, Per-page layouts are achieved
function getDefaultLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <Layout>
        {page}
      </Layout>
    </>
  )
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  // Either page has special layout defined, or use the default one
  let getLayout = Component.getLayout || getDefaultLayout;
  return getLayout(<Component {...pageProps} />)
}
