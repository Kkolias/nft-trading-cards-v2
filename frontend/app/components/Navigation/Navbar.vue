<template>
  <div class="component-Navbar">
    <div class="left-container">NAV</div>
    <div class="right-container">
      <button
        class="admin-logout secondary"
        v-if="isAdminLogged"
        @click="logout()"
      >
        Admin Logout
      </button>
      <!-- {{ walletShortAddress }} -->
        {{ walletAddress }}
      <button
        v-if="!walletAddress"
        class="connect-wallet secondary"
        @click="handleConnectToWallet()"
      >
        Connect Wallet
      </button>
      <NavProfileButton v-if="walletAddress"/>
    </div>
  </div>
</template>

<script lang="ts">
import AdminAccess from "~/mixins/adminAccess.vue";
import apiUser from "~/utils/api/api-user";
import NavProfileButton from "./NavProfileButton.vue";
import { useWalletStore } from '~/stores/wallet'
export default {
  mixins: [AdminAccess],
  computed: {
    isAdminLogged(): boolean {
      return this.isLogged;
    },
    wallet() {
      return useWalletStore();
    },
    walletAddress(): string | null {
      console.log("walletAddress in Navbar:", this.wallet.walletAddress);
      return this.wallet.walletAddress;
    },
  },
  methods: {
    async logout() {
      await apiUser.eraseToken();
      this.$router.push("/login");
    },
    handleConnectToWallet() {
      this.wallet.connectWallet();
    },
  },
};
</script>

<style lang="less" scoped>
.component-Navbar {
  padding: 0 64px;
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.5), 0 0 10px 0 rgba(0, 0, 0, 0.25);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
