import { Chain, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';

// Configure chain information for local Polaris chain
const PolarisChain: Chain = {
  id: 69420,
  name: 'Polaris',
  network: 'Polaris',
  nativeCurrency: {
    decimals: 18,
    name: 'Polaris',
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

// Configure Wagmi client with Polaris chain
const { provider, chains } = configureChains(
  [PolarisChain],
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
