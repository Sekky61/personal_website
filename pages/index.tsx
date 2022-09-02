import type { NextPage } from 'next'
import { ReactElement } from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import { NextPageWithLayout } from './_app'

const Home: NextPage = () => {
  return (
    <div>
      <h1 className='text-3xl' > bar</h1>
    </div>
  )
}

export default Home
