import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'

import { chains, client } from '../wagmi'

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <NextHead>
          <title>Stargazer Example Dapp</title>
        </NextHead>
        {mounted && <Component {...pageProps} />}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
