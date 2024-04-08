import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GlobalProvider } from './contexts/GlobalContext';
import { APIProvider } from './contexts/APIContext';
import { Web3Provider } from './contexts/Web3Context';

import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  // baseGoerli,
  sepolia
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css';

const WALLET_PROJECT_ID = '48ffa7e9a5c6bcf24f012cf1c3b3cb4e';
const ALCHEMY_API_KEY = 'GzFIYEG74BW1OgVsME4pC1vvuAs-DUI1';

const { chains, publicClient } = configureChains(
  // [ baseGoerli ],
  [sepolia],
  [
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'GrandPass',
  projectId: WALLET_PROJECT_ID,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
    <APIProvider>
      <BrowserRouter>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} modalSize='compact'>
            <Web3Provider>
              <App />
            </Web3Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </BrowserRouter>
    </APIProvider>
  </GlobalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
