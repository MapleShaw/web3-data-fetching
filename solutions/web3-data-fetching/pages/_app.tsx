import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Web3 Data Fetching</title>
        <meta name="description" content="Learn how to fetch data from smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
