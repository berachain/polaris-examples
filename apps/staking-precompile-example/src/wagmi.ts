import { Chain, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';

// Configure chain information for local Stargazer chain
const stargazerChain: Chain = {
  id: 69420,
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

// Configure Wagmi client with Stargazer chain
const { provider, chains } = configureChains(
  [stargazerChain],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

// only use MetaMask for now
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
    ],
  },
]);

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains }
