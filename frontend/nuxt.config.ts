// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/styles/main.less"],
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL
    }
  }
});
