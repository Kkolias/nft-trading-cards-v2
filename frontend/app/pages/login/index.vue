<template>
  <div class="page-login main-page">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import apiUser from "@/utils/api/api-user";

export default {
  async mounted() {
    const logged = await this.isLogged();
    if (logged) this.$router.push("/dashboard");
  },
  methods: {
    async getUser() {
      return await apiUser.getUserByToken();
    },
    async isLogged(): Promise<boolean> {
      try {
        const user = await this.getUser();

        if (!user) return false;

        return !!user;
      } catch (error) {
        return false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page-login {
  margin: auto;
}
</style>
