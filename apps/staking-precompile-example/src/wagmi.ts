import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { Chain, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const stargazerChain: Chain = {
  id: 42069,
  name: 'Stargazer',
  network: 'stargazer',
  nativeCurrency: {
    decimals: 18,
    name: 'Stargazer',
    symbol: 'tbera',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:1317/eth/rpc'],
    },
    public: {
      http: ['http://localhost:1317/eth/rpc'],
    }
  }
};

const { provider, chains } = configureChains(
  [stargazerChain],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Stargzer Example App',
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains }
