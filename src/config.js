// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for the FRG Staking Rewards app.
// Post-deploy wiring is a one-file change: set CONTRACT_ADDRESS
// (and DEPLOY_PRESET.wasmSha256 once frg_staking_v2.wasm is built).
// ─────────────────────────────────────────────────────────────

export const CHAIN_ID = 'columbus-5';
export const CHAIN_NAME = 'terraclassic'; // Cosmos Kit lookup key (see chainDef.js)
export const LCD_URL = 'https://terra-classic-lcd.publicnode.com';
export const RPC_URL = 'https://terra-classic-rpc.publicnode.com';

// FRG — the home token of this app (verified live on-chain).
export const FRG = {
  symbol: 'FRG',
  name: 'FRG Universe',
  address: 'terra14rfnhc2aru7jp304lht3yf903necsnrt4cxd464cftsfcksw0rtsgundnt',
  decimals: 6,
};

// Cross staking is open: ANY CW20 can be a staking token or a reward
// token. FRG is pre-known; every other token's symbol/decimals are
// resolved on-chain from its token_info query (see lib/tokenMeta.js).
export const KNOWN_TOKENS = [FRG];

// FRG staking contract — empty string until it is deployed.
// Every contract read/write in the app checks this and degrades
// gracefully (browse-only mode) while it is empty.
export const CONTRACT_ADDRESS = 'terra10tn5tpx35kvhsnhxt3l4eyupxmykxyl3u0553et9mf57de7s0dvqgquufh';

// No admin is known yet. The admin address is entered in the Deploy
// Wizard at instantiate time — it is NEVER hardcoded here.
export const ADMIN_PLACEHOLDER = '';

// NFT collections registered in the app as a static fallback.
// Empty until the first collection is created and registered by
// the admin. Once the contract is live, collections are read
// on-chain via the Collections{} query and merged with this list.
// Entries: { cw721: 'terra1…', name?: string }
export const COLLECTIONS = [];

export const isContractDeployed = () => Boolean(CONTRACT_ADDRESS);

// ── One-time Deploy Wizard preset ──
// fun_address is locked to the verified FRG CW20. The admin comes
// from an input field in the wizard (default empty) — whoever signs
// / pays in the wizard is only the deployer; contract admin and
// control belong to the wallet entered as admin.
export const DEPLOY_PRESET = {
  fun_address: FRG.address,
  label: 'FRG Staking Rewards',
  wasmPath: './frg_staking_v2.wasm',
  // sha256 of frg_staking_v2.wasm (526,524 bytes, built + tested
  // 2026-10-23, 13/13 tests) — wasm file ships at public/frg_staking_v2.wasm
  // and the wizard verifies it in-browser before Store Code unlocks.
  wasmSha256: '43584044fa4ac208386248065daf633cc7cb8239c0b90e62c0c7b9e4301b7994',
  deadlineText: 'Mon Oct 26, 6:52 PM ET',
};
