import './polyfills.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChainProvider } from '@cosmos-kit/react';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as stationWallets } from '@cosmos-kit/station';
import { wallets as terraClassicWcWallets } from './wallets.js';
import { terraClassicChain, terraClassicAssets } from './chainDef.js';
import App from './App.jsx';
import './styles.css';

// WalletConnect (Reown) project ID — the dApp's own public client ID
// (it ships in the browser bundle). Required for every WalletConnect
// wallet (Keplr Mobile, Galaxy Station, LUNCDash) to initialize its
// sign client; without it WC wallets fail with "projectId is not
// provided" and Keplr appears broken on mobile.
const WC_PROJECT_ID = '7e363f1ed5d676ecc4ae2d40c5b83fbf';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChainProvider
      chains={[terraClassicChain]}
      assetLists={[terraClassicAssets]}
      wallets={[...keplrWallets, ...stationWallets, ...terraClassicWcWallets]}
      walletConnectOptions={{ signClient: { projectId: WC_PROJECT_ID } }}
      modalTheme={{ defaultTheme: 'dark' }}
    >
      <App />
    </ChainProvider>
  </React.StrictMode>
);
