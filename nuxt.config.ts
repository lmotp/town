// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
    },
  ],
  css: ["@/assets/scss/main.scss"],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/constants/_colors.scss" as *;',
        },
      },
    },
  },
});
