import type { NextPage } from 'next'
import { ReactElement } from 'react'
import Header from '@components/Header'
import Layout from '@components/Layout'
import { NextPageWithLayout } from './_app'

const Home: NextPage = () => {
  return (
    <>
      <h1 className='heading-primary' >Welcome to my website!</h1>
    </>
  )
}

export default Home
