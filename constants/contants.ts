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
    address: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    decimals: 18,
    symbol: 'ETH',
  },
  {
    name: 'USDC',
    address: '0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426',
    decimals: 6,
    symbol: 'USDC',
  },
];

export const JEDI_TOKENS = [
  {
    name: 'J23FEB0',
    address: '0x04bc8ac16658025bff4a3bd0760e84fcf075417a4c55c6fae716efdd8f1ed26c',
    decimals: 18,
    symbol: 'J23FEB0',
  },
  {
    name: 'J23FEB1',
    address: '0x05f405f9650c7ef663c87352d280f8d359ad07d200c0e5450cb9d222092dc756',
    decimals: 18,
    symbol: 'J23FEB1',
  },
  {
    name: 'J23FEB2',
    address: '0x024da028e8176afd3219fbeafb17c49624af9b86dcbe81007ae40d93f741617d',
    decimals: 18,
    symbol: 'J23FEB2',
  },
  {
    name: 'J23FEB3',
    address: '0x01ca5dedf1612b1ffb035e838ac09d70e500d22cf9cd0de4bebcef8553506fdb',
    decimals: 18,
    symbol: 'J23FEB3',
  },
];

export const MY_SWAP_ROUTER_ADDRESS = '0x071faa7d6c3ddb081395574c5a6904f4458ff648b66e2123b877555d9ae0260e';
export const JEDI_FACTORY_ADDRESS = '0x06b4115fa43c48118d3f79fbc500c75917c8a28d0f867479acb81893ea1e036c';
export const JEDI_REGISTRY_ADDRESS = '0x0413ba8d51ec05be863eb82314f0cf0ffceff949e76c87cae0a4bd7f89cfc2b1'
