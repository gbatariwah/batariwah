// https://nuxt.com/docs/api/configuration/nuxt-config

import gm from "@nuxtjs/google-fonts";
export default defineNuxtConfig({
  // css: ["~/assets/scss/index.scss"],
  modules: [
    "@vueuse/nuxt",
    "@nuxt/image-edge",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        display: "swap",
        download: true,
        families: {
          Roboto: true,
          "Josefin+Sans": true,
          Montserrat: {
            wght: [100, 300, 400, 600, 700],
            ital: [100, 300, 600],
          },
          "Work Sans": {
            wght: [100, 300, 400, 600, 700],
            ital: [100, 300, 600],
          },
        },
      },
    ],
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      bodyAttrs: {
        class: "bg-base-300",
      },
    },
  },
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_API_SECRET: process.env.JWT_API_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    COOKIE_NAME: process.env.COOKIE_NAME,
    ENV: process.env.ENV,
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
});
