import {create} from "zustand";
import {AccountInterface, Provider} from "starknet";
import { connect } from "@argent/get-starknet"

interface StarknetState {
  account: AccountInterface | undefined,
  provider: Provider | undefined,
  setAccount: (account: AccountInterface) => void,
  setProvider: (provider: Provider) => void,
  connectWallet: () => void,
  disconnect: () => void
}

export const useStarknet = create<StarknetState>((set) => ({
    account: undefined,
    provider: undefined,
    setAccount: (account: AccountInterface) => {
      set((state) => ({...state, account: account}))
    },
    setProvider: (provider: Provider) => {
      set((state) => ({...state, provider: provider}))
    },
    connectWallet: async () => {
  // Let the user pick a wallet (on button click)
    const starknet = connect()


    if (!starknet) {
      throw Error("User rejected wallet selection or silent connect found nothing")
    }

    // (optional) connect the wallet
    await starknet?.enable()

      set((state) => ({...state, account: starknet.account, provider: starknet.provider}))

    },
    disconnect: () => {
      set((state) => ({account: undefined, provider: undefined}))
    },
  })
)
