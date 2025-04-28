import { ethers } from 'ethers'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import abi from '../lib/BAYC.abi.json'
import { 
  BORED_APE_YATCH_CLUB_ADDRESS,
  CRYPTO_PUNKS_ADDRESS,
  AZUKI_ADDRESS,
  DOODLES_ADDRESS,
  MOONBIRDS_ADDRESS,
  USDT_ADDRESS,
  USDC_ADDRESS,
  UNISWAP_V2_ROUTER_ADDRESS
} from '../constants'
import { getFallbackProvider } from '../lib/ethers-config'

// Contract address mapping
const contractAddresses = {
  'Bored Ape Yacht Club': BORED_APE_YATCH_CLUB_ADDRESS,
  'CryptoPunks': CRYPTO_PUNKS_ADDRESS,
  'Azuki': AZUKI_ADDRESS,
  'Doodles': DOODLES_ADDRESS,
  'Moonbirds': MOONBIRDS_ADDRESS,
  'USDT': USDT_ADDRESS,
  'USDC': USDC_ADDRESS,
  'Uniswap V2 Router': UNISWAP_V2_ROUTER_ADDRESS
}

// Contract interface
interface ContractInfo {
  name: string | null;
  address: string;
  symbol?: string | null;
  totalSupply?: string | null;
  error?: string | null;
  label?: string;
}

export default function TestContracts({ contractInfos, error }: { 
  contractInfos: ContractInfo[], 
  error?: string | null 
}) {
  const backLinkStyle = {
    display: 'inline-block',
    color: '#0070f3',
    backgroundColor: '#f0f7ff',
    border: '1px solid #cce3fe',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.15s ease'
  };
  
  return (
    <div className="container">
      <Head>
        <title>Test Ethereum Contracts</title>
        <meta name="description" content="Test different Ethereum smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Test Different Ethereum Contracts</h1>
        
        <div className="nav-link">
          <Link href="/" style={backLinkStyle}>
            ← Back to Home
          </Link>
        </div>
        
        {error ? (
          <div className="error-box">
            <h3>Error</h3>
            <p>{error}</p>
            <p className="small-text">
              Note: This example uses public Ethereum nodes that may be subject to rate limiting. For production environments, it&apos;s recommended to use a paid API key.
            </p>
          </div>
        ) : (
          <div className="grid">
            {contractInfos.map((info, index) => (
              <div key={index} className="card">
                <h2>{info.label}</h2>
                <div className="address">
                  Address: {info.address}
                </div>
                
                {info.error ? (
                  <div className="error">{info.error}</div>
                ) : (
                  <div className="info">
                    <div className="info-row">
                      <span className="label">Name:</span> 
                      <span>{info.name || 'Unknown'}</span>
                    </div>
                    
                    {info.symbol && (
                      <div className="info-row">
                        <span className="label">Symbol:</span> 
                        <span>{info.symbol}</span>
                      </div>
                    )}
                    
                    {info.totalSupply && (
                      <div className="info-row">
                        <span className="label">Total Supply:</span> 
                        <span>{info.totalSupply}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="note">
          <h3>Note</h3>
          <p>
            Different types of contracts implement different interfaces, and some contracts may not implement all queried methods (such as name, symbol, or totalSupply).
            This is why some information may be displayed as &quot;Unknown&quot;.
          </p>
          <p>
            CryptoPunks is an early NFT project that doesn&apos;t conform to modern ERC-721 standards, so many standard methods are not available on that contract.
          </p>
        </div>
      </main>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #333;
        }
        .nav-link {
          margin-bottom: 2rem;
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
        .loading {
          text-align: center;
          padding: 3rem 0;
          font-size: 1.25rem;
          color: #666;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .card {
          background-color: #fff;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          padding: 1.5rem;
          transition: border-color 0.15s ease;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        .card:hover {
          border-color: #0070f3;
        }
        .card h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2d3748;
        }
        .address {
          font-size: 0.875rem;
          color: #718096;
          margin-bottom: 1rem;
          word-break: break-all;
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .info-row {
          display: flex;
        }
        .label {
          font-weight: 500;
          width: 7rem;
          flex-shrink: 0;
        }
        .error {
          color: #e53e3e;
          margin-top: 0.5rem;
        }
        .note {
          background-color: #fffaf0;
          border: 1px solid #fbd38d;
          padding: 1.25rem;
          border-radius: 0.5rem;
          margin-top: 2rem;
        }
        .note h3 {
          font-weight: bold;
          margin-bottom: 0.75rem;
          color: #744210;
        }
        .note p {
          line-height: 1.6;
          color: #744210;
          margin-bottom: 0.75rem;
        }
        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  try {
    // Use custom provider
    const provider = getFallbackProvider();
    const contractInfos: ContractInfo[] = [];

    // Fetch all contract information sequentially (avoid too many parallel requests causing API limits)
    for (const [label, address] of Object.entries(contractAddresses)) {
      try {
        const contract = new ethers.Contract(address, abi, provider);
        
        let contractInfo: ContractInfo = {
          name: null,
          address,
          label
        };

        try {
          contractInfo.name = await contract.name();
        } catch (e) {
          // name function not available
        }

        try {
          contractInfo.symbol = await contract.symbol();
        } catch (e) {
          // symbol function not available
        }

        try {
          const totalSupply = await contract.totalSupply();
          contractInfo.totalSupply = totalSupply.toString();
        } catch (e) {
          // totalSupply function not available
        }

        contractInfos.push(contractInfo);
      } catch (e) {
        contractInfos.push({
          name: null,
          address,
          label,
          error: 'Failed to load contract data'
        });
      }
    }

    return {
      props: {
        contractInfos,
        error: null
      }
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
        contractInfos: [],
        error: errorMessage
      }
    };
  }
} 