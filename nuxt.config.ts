// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // css: ["~/assets/scss/index.scss"],
  modules: [
    "nuxt-api-party",
    "@sidebase/nuxt-auth",
    "@vueuse/nuxt",
    "@nuxt/image-edge",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
  ],
  plugins: [],
  // app: {
  //     head: {
  //         bodyAttrs: {
  //             class: 'dark',
  //         }
  //     }
  // },
  apiParty: {
    endpoints: {
      batariwah: {
        url: process.env.API_PARTY_BASE_URL,
      },
    },
  },
  runtimeConfig: {
    NUXT_SECRET: process.env.NUXT_SECRET,
    API_PARTY_BASE_URL: process.env.API_PARTY_BASE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    public: {
      API_URL: process.env.API_URL,
    },
  },
  auth: {
    origin: process.env.ORIGIN,
    basePath: "/api/auth",
    // enableGlobalAppMiddleware: true
  },
});
