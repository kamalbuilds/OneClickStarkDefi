import { create } from "zustand";
import { AccountInterface, Provider } from "starknet";
import { connect } from "starknetkit";

interface StarknetState {
  account: AccountInterface | undefined;
  provider: Provider | undefined;
  setAccount: (account: AccountInterface) => void;
  setProvider: (provider: Provider) => void;
  connectWallet: () => Promise<void>; // Added Promise<void> to indicate the asynchronous nature
  disconnect: () => void;
}

export const useStarknet = create<StarknetState>((set) => ({
  account: undefined,
  provider: undefined,
  setAccount: (account: AccountInterface) => {
    set((state) => ({ ...state, account: account }));
  },
  setProvider: (provider: Provider) => {
    set((state) => ({ ...state, provider: provider }));
  },
  connectWallet: async () => {
    try {
      // Let the user pick a wallet (on button click)
      const starknet = await connect(
        { modalMode : "alwaysAsk"}
      ); // Use await to resolve the promise
      console.log(starknet,"starkl")
      if (!starknet) {
        throw new Error("User rejected wallet selection or silent connect found nothing");
      }

      
      // Enable the wallet
      await starknet.wallet.enable();

      set((state) => ({ ...state, account: starknet.wallet.account, provider: starknet.wallet.provider }));
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  },
  disconnect: () => {
    set((state) => ({ account: undefined, provider: undefined }));
  },
}));
