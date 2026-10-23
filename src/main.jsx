import './polyfills.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChainProvider } from '@cosmos-kit/react';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as stationWallets } from '@cosmos-kit/station';
import { wallets as terraClassicWcWallets } from './wallets.js';
import { terraClassicChain, terraClassicAssets } from './chainDef.js';
import App from './App.jsx';
// REQUIRED: the Cosmos Kit wallet modal (wallet list, QR/connecting,
// connected views) is built from @interchain-ui/react components whose
// entire stylesheet — layout, dark theme, and the CSS-driven sizing of
// every inline SVG icon (wallet logos' badges, the WalletConnect glyph,
// the spinner, the close/back icons, the QR frame) — ships as a separate
// CSS file that the app must import. Without it the icons render at
// unconstrained (giant) sizes and the modal chrome is unstyled.
import '@interchain-ui/react/styles';
import './styles.css';

// WalletConnect (Reown) project ID — the dApp's own public client ID
// (it ships in the browser bundle). Required for every WalletConnect
// wallet (Keplr Mobile, Galaxy Station) to initialize its
// sign client; without it WC wallets fail with "projectId is not
// provided" and Keplr appears broken on mobile.
const WC_PROJECT_ID = '7e363f1ed5d676ecc4ae2d40c5b83fbf';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChainProvider
      chains={[terraClassicChain]}
      assetLists={[terraClassicAssets]}
      wallets={[...keplrWallets, ...stationWallets, ...terraClassicWcWallets]}
      walletConnectOptions={{
        signClient: {
          projectId: WC_PROJECT_ID,
          metadata: {
            name: 'FRG Staking Rewards',
            description: 'Stake FRG and NFTs, earn rewards on Terra Classic',
            url: 'https://lunc-projects.github.io/frg-staking-rewards/',
            icons: ['https://lunc-projects.github.io/frg-staking-rewards/favicon.ico'],
            redirect: {
              native: 'https://lunc-projects.github.io/frg-staking-rewards/',
              universal: 'https://lunc-projects.github.io/frg-staking-rewards/',
            },
          },
        },
      }}
      modalTheme={{ defaultTheme: 'dark' }}
    >
      <App />
    </ChainProvider>
  </React.StrictMode>
);
