import { defineStore } from "pinia";
import { ethers } from "ethers";

export const useWalletStore = defineStore("wallet", {
  state: () => ({
    walletAddress: null as string | null,
  }),
  getters: {
    walletShortAddress: (state) =>
      state.walletAddress
        ? `${state.walletAddress.slice(0, 6)}...${state.walletAddress.slice(
            -4
          )}`
        : "",

    walletAddressStart: (state) =>
      state.walletAddress ? state.walletAddress.slice(0, 6) : "",
  },
  actions: {
    async checkWalletConnection() {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_accounts",
        });
        this.walletAddress = accounts.length > 0 ? accounts[0] : null;
      } else {
        console.error("MetaMask ei ole asennettuna");
      }
    },
    async connectWallet() {
      if (!(window as any).ethereum) {
        alert("Lompakkoa ei ole asennettuna!");
        return;
      }
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      this.walletAddress = await signer.getAddress();
    },
    disconnectWallet() {
      this.walletAddress = null;
    },
  },
});
