// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // css: ["~/assets/scss/index.scss"],
  modules: [
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
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_API_SECRET: process.env.JWT_API_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    COOKIE_NAME: process.env.COOKIE_NAME,
    ENV: process.env.ENV,
    public: {},
  },
});
