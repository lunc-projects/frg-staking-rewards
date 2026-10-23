// Custom WalletConnect wallets for Terra Classic community wallets that are
// not listed in the WalletConnect explorer registry (so no upstream
// Cosmos Kit package exists for them):
//
//   - Galaxy Station — the Terra Classic community Station fork
//     (https://station.terraclassic.community). In its in-app browser it
//     injects window.station, which the @cosmos-kit/station extension entry
//     already covers; this entry adds the standard Cosmos WalletConnect
//     pairing flow (QR / copy-link) for desktop and other mobile browsers.
//   - LUNCDash — Terra Classic mobile wallet (https://luncdash.com),
//     standard Cosmos WalletConnect.
//
// Both are built exactly like @cosmos-kit/keplr-mobile / station-mobile:
// a WCWallet (from @cosmos-kit/walletconnect) whose chain wallets are
// ChainWC instances backed by the generic WCClient, which speaks the
// standard Cosmos namespace (cosmos_getAccounts / cosmos_signAmino /
// cosmos_signDirect). Because neither wallet is in the WC explorer
// registry, no registry `projectId` / deep-link listing exists — pairing
// goes through the Cosmos Kit modal's QR code and copyable WC URI.
import { ChainWC, WCClient, WCWallet } from '@cosmos-kit/walletconnect';

export const galaxyStationInfo = {
  name: 'galaxy-station',
  prettyName: 'Galaxy Station',
  logo: 'https://station.terraclassic.community/favicon.svg',
  mode: 'wallet-connect',
  mobileDisabled: false,
  rejectMessage: {
    source: 'Request rejected',
  },
  downloads: [
    {
      link: 'https://station.terraclassic.community',
    },
  ],
  supportedChains: ['terraclassic'],
  walletconnect: {
    name: 'Galaxy Station',
    mobile: {
      universal: 'https://station.terraclassic.community',
    },
  },
};

export const luncDashInfo = {
  name: 'luncdash',
  prettyName: 'LUNCDash',
  mode: 'wallet-connect',
  mobileDisabled: false,
  rejectMessage: {
    source: 'Request rejected',
  },
  downloads: [
    {
      link: 'https://luncdash.com',
    },
  ],
  supportedChains: ['terraclassic'],
  walletconnect: {
    name: 'LUNCDash',
    mobile: {
      universal: 'https://luncdash.com',
    },
  },
};

export class ChainGalaxyStation extends ChainWC {
  constructor(walletInfo, chainInfo) {
    super(walletInfo, chainInfo, WCClient);
  }
}

export class ChainLUNCDash extends ChainWC {
  constructor(walletInfo, chainInfo) {
    super(walletInfo, chainInfo, WCClient);
  }
}

export class GalaxyStationWallet extends WCWallet {
  constructor(walletInfo) {
    super(walletInfo, ChainGalaxyStation, WCClient);
  }
}

export class LUNCDashWallet extends WCWallet {
  constructor(walletInfo) {
    super(walletInfo, ChainLUNCDash, WCClient);
  }
}

const galaxyStation = new GalaxyStationWallet(galaxyStationInfo);
const luncDash = new LUNCDashWallet(luncDashInfo);

export const wallets = [galaxyStation, luncDash];
