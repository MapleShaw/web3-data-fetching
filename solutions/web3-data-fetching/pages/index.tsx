import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import abi from '../lib/BAYC.abi.json'
import { BORED_APE_YATCH_CLUB_ADDRESS } from '../constants'
import { getFallbackProvider } from '../lib/ethers-config'

// Use custom provider
const provider = getFallbackProvider()

const contract = new ethers.Contract(
  BORED_APE_YATCH_CLUB_ADDRESS,
  abi,
  provider
)

export default function Home({ contractName, error }: { contractName: string, error?: string | null }) {
  const buttonStyle = {
    display: 'inline-block',
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    fontWeight: 500,
    marginTop: '0.75rem',
    textDecoration: 'none',
    transition: 'background-color 0.15s ease'
  };

  console.log(contractNames)
  
  return (
    <div className="container">
      <Head>
        <title>Web3 Data Fetching Test</title>
        <meta name="description" content="Test fetching data from smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Fetching Data from Smart Contracts</h1>
        
        {error && (
          <div className="error-box">
            <h3>Error</h3>
            <p>{error}</p>
            <p className="small-text">
              Note: This example uses public Ethereum nodes that may be subject to rate limiting. For production environments, it&apos;s recommended to use a paid API key.
            </p>
          </div>
        )}
        
        <section className="section">
          <h2>Introduction to Smart Contracts</h2>
          <p>
            Smart contracts contain information related to applications built on blockchain, which can run on the 
            <a href="https://ethereum.org/en/developers/docs/evm/" target="_blank" rel="noreferrer">
              Ethereum Virtual Machine (EVM)
            </a>.
            Some information can be exposed through 
            <a href="https://www.tutorialspoint.com/solidity/solidity_view_functions.htm" target="_blank" rel="noreferrer">
              view functions
            </a>
            which don&apos;t require 
            <a href="https://ethereum.org/en/developers/docs/gas/" target="_blank" rel="noreferrer">
              gas fees
            </a>
            to execute. Below we&apos;ll explore how to fetch this information in Next.js.
          </p>
        </section>

        <section className="section">
          <h2>Connecting to Smart Contracts</h2>
          <p>
            The first step in connecting to a smart contract is to establish a connection via 
            <a href="https://en.wikipedia.org/wiki/Remote_procedure_call" target="_blank" rel="noreferrer">
              RPC
            </a>
            using libraries like 
            <a href="https://docs.ethers.io/v5/" target="_blank" rel="noreferrer">
              Ethers.js
            </a>.
            There are also convenient libraries like 
            <a href="https://github.com/dethcrypto/TypeChain" target="_blank" rel="noreferrer">
              Typechain
            </a>
            to help with this process.
          </p>
          
          <p>
            The 
            <a href="https://www.quicknode.com/guides/solidity/what-is-an-abi" target="_blank" rel="noreferrer">
              ABI
            </a>
            contains information about available functions and can be 
            <a href="https://cryptomarketpool.com/how-to-get-a-smart-contracts-abi-for-use-in-python-web3-py/" target="_blank" rel="noreferrer">
              obtained through Etherscan
            </a>.
            We&apos;ll use the popular Bored Ape Yacht Club NFT contract.
          </p>

          <pre className="code-block">
            <code>{`import abi from '../lib/BAYC.abi.json'

const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'

const contract = new ethers.Contract(contractAddress, abi)
`}</code>
          </pre>
        </section>

        <section className="section">
          <h2>Fetching Data</h2>
          <p>
            Now you can use the contract instance to pre-render contract information in <code>getStaticProps</code> or <code>getServerSideProps</code>,
            or use <a href="https://swr.vercel.app/" target="_blank" rel="noreferrer">SWR</a> on the client side,
            which might be better for actively used contracts with high traffic.
          </p>

          <pre className="code-block">
            <code>{`// Server-side
export async function getStaticProps() {
  const contractName = await contract.name()

  return {
    revalidate: 3600,
    props: {
      contractName,
    },
  }
}

// Using SWR
const { data } = useSWR('name', () => contract.name())
`}</code>
          </pre>

          <p>That&apos;s it! If we use the <code>contractName</code> property, its value should be:</p>
          <pre className="code-block">
            <code>{contractName}</code>
          </pre>
        </section>

        <div className="card">
          <h2>More Tests</h2>
          <div>
            <Link href="/test-contracts" style={buttonStyle}>
              View more Ethereum contract examples →
            </Link>
          </div>
          <p className="small-text">
            You can test fetching information from different smart contracts on this page
          </p>
        </div>
      </main>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        main {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #333;
        }
        .section {
          margin-bottom: 2rem;
        }
        h2 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          color: #444;
        }
        p {
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        a {
          color: #0070f3;
          text-decoration: none;
          margin: 0 0.25rem;
        }
        a:hover {
          text-decoration: underline;
        }
        .error-box {
          background-color: #fff5f5;
          border: 1px solid #feb2b2;
          padding: 1rem;
          border-radius: 0.25rem;
          color: #c53030;
          margin-bottom: 1.5rem;
        }
        .error-box h3 {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .small-text {
          font-size: 0.875rem;
          color: #666;
        }
        .code-block {
          background-color: #f7fafc;
          padding: 1rem;
          border-radius: 0.25rem;
          overflow-x: auto;
          border: 1px solid #e2e8f0;
          margin: 1rem 0;
        }
        code {
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, monospace;
          font-size: 0.9rem;
        }
        .card {
          background-color: #f7fafc;
          padding: 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const contractName = await contract.name();
    
    return {
      props: {
        contractName,
        error: null,
      },
    };
  } catch (error: any) {
    console.error('Error fetching contract data:', error);
    
    // Check error type and return more specific error message
    let errorMessage = 'Error connecting to Ethereum network, please try again later';
    
    // Check if it's a quota exceeded error
    if (error.error && error.error.toString().includes('quota')) {
      errorMessage = 'API quota exceeded, please try again later or use another Ethereum RPC provider';
    }
    
    return {
      props: {
        contractName: '',
        error: errorMessage,
      },
    };
  }
}
