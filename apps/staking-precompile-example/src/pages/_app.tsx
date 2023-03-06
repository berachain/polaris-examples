import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { chains, client } from '../wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme';

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <NextHead>
          <title>Polaris Example Dapp</title>
        </NextHead>
        <ChakraProvider theme={theme}>
          {mounted && <Component {...pageProps} />}
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
