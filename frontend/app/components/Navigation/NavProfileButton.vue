<template>
  <div class="component-NavProfileButton">
    <div class="hover-area">
      {{ walletAddressStart }}
    </div>
    <div class="hover-are-container">
      <p>{{ walletShortAddress }}</p>
      <button class="disconnect-wallet secondary" @click="handleDisconnectWallet()">
        Disconnect Wallet
      </button>
    </div>
  </div>
</template>

<script lang="ts">
// import WalletMixin from "~/mixins/walletMixin.vue";
import { useWalletStore } from '~/stores/wallet'


export default {
  // mixins: [WalletMixin],
  computed: {
    wallet() {
      return useWalletStore();
    },
    walletShortAddress(): string {
      return this.wallet.walletShortAddress;
    },
    walletAddressStart(): string {
      return this.wallet.walletAddressStart;
    },
  },
  methods: {
    handleDisconnectWallet() {
      // this.disconnectWallet();
      this.wallet.disconnectWallet();
      this.$emit("disconnected");
    },
    
  },
};
</script>

<style lang="less" scoped>
.component-NavProfileButton {
  position: relative;

  .hover-area {
    cursor: pointer;
    padding: 8px 0;
  }
  .hover-are-container {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--primary-dark);
    box-shadow: var(--box-shadow-dark);
    padding: 8px;
    border-radius: 10px;
    width: max-content;
    display: none;

    p {
      margin-left: 16px;
    }
  }
  &:hover {
    .hover-are-container {
      display: block;
    }
  }
}
</style>
