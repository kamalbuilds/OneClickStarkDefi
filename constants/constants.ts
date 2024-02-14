export enum ActionTypes {
  ADD_LIQUIDITY,
  REMOVE_LIQUIDITY,
  APPROVE,
  SWAP,
  REVOKE_APPROVAL,
  TRANSFER,
  WITHDRAW,
}

export enum ProtocolNames {
  JEDISWAP,
  AAVNU,
  ZK_LEND,
  MY_SWAP,
}

export const PROTOCOLS: { [key in keyof typeof ProtocolNames]?: any} = {
  [ProtocolNames.JEDISWAP]: {
    name: 'Jediswap',
    address: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
    abi: []
  },
  [ProtocolNames.ZK_LEND]: {
    name: 'ZkLend',
    address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    abi: []
  },
  [ProtocolNames.AAVNU]: {
    name: 'AAVNU',
    address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A12',
    abi: []
  },
}


export const ACTIONS: { [key in keyof typeof ActionTypes]?: any} = {
  [ActionTypes.ADD_LIQUIDITY]: {
    type: ActionTypes.ADD_LIQUIDITY,
    name: 'Add Liquidity',
    availableProtocols: [
      ProtocolNames.JEDISWAP,
      ProtocolNames.ZK_LEND
    ],
  },
  [ActionTypes.REMOVE_LIQUIDITY]: {
    type: ActionTypes.REMOVE_LIQUIDITY,
    name: 'Remove Liquidity',
    availableProtocols: [
      ProtocolNames.JEDISWAP,
      ProtocolNames.ZK_LEND
    ],
  },
  [ActionTypes.APPROVE]: {
    type: ActionTypes.APPROVE,
    name: 'Approve',
    availableProtocols: [
      ProtocolNames.JEDISWAP,
      ProtocolNames.ZK_LEND
    ],
  },
  [ActionTypes.SWAP]: {
    type: ActionTypes.SWAP,
    name: 'Swap',
    availableProtocols: [
      ProtocolNames.JEDISWAP,
      ProtocolNames.ZK_LEND
    ],
  },
  [ActionTypes.REVOKE_APPROVAL]: {
    type: ActionTypes.REVOKE_APPROVAL,
    availableProtocols: [
      ProtocolNames.JEDISWAP,
      ProtocolNames.ZK_LEND
    ],
  },
  [ActionTypes.TRANSFER]: {
    type: ActionTypes.TRANSFER,
    name: 'Transfer',
    availableProtocols: [
    ],
  },
  [ActionTypes.WITHDRAW]: {
    type: ActionTypes.WITHDRAW,
    name: 'Withdraw',
    availableProtocols: [
    ],
  },
};

export const SELECTABLE_TOKENS = [
  {
    name: 'BTC',
    address: '',
    decimals: 18,
    symbol: 'BTC',
  },
  {
    name: 'USDT',
    address: '',
    decimals: 18,
    symbol: 'USDT',
  },
  {
    name: 'USDC',
    address: '',
    decimals: 6,
    symbol: 'USDC',
  },
  {
    name: 'ETH',
    address: '',
    decimals: 18,
    symbol: 'ETH',
  },
];

export const AVNU_TOKENS = [
  {
    name: 'ETH',
    address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    decimals: 18,
    symbol: 'ETH',
  },
  {
    name: 'USDC',
    address: '0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426',
    decimals: 6,
    symbol: 'USDC',
  },
  {
    name: 'DAI',
    address: '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9',
    decimals: 18,
    symbol: 'DAI',
  },
  {
    name: 'Wrapped BTC',
    address: '0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56',
    decimals: 8,
    symbol: 'wBTC',
  }
];

export const JEDI_TOKENS = [
  {
    "name": "Wrapped BTC",
    "address": "0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56",
    "symbol": "WBTC",
    "decimals": 8,
    "chainId": "0x534e5f474f45524c49",
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
  },
  {
    "name": "Dai Stablecoin",
    "address": "0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": "0x534e5f474f45524c49",
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "USDCoin",
    "address": "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": "0x534e5f474f45524c49",
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Tether USD",
    "address": "0x386e8d061177f19b3b485c20e31137e6f6bc497cc635ccdfcab96fadf5add6a",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": "0x534e5f474f45524c49",
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  }
];

export const MY_SWAP_ROUTER_ADDRESS = '0x071faa7d6c3ddb081395574c5a6904f4458ff648b66e2123b877555d9ae0260e';
export const JEDI_FACTORY_ADDRESS = '0x06b4115fa43c48118d3f79fbc500c75917c8a28d0f867479acb81893ea1e036c';
export const JEDI_REGISTRY_ADDRESS = '0x0413ba8d51ec05be863eb82314f0cf0ffceff949e76c87cae0a4bd7f89cfc2b1'
