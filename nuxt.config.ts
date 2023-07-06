// https://nuxt.com/docs/api/configuration/nuxt-config

import gm from "@nuxtjs/google-fonts";
export default defineNuxtConfig({
  // css: ["~/assets/scss/index.scss"],
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "nuxt-simple-sitemap",
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
    "nuxt-simple-robots",
    "@nuxt/devtools",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [
        {
          src: "https://analytics.umami.is/script.js",
          async: true,
          "data-website-id": "b2b387f4-dd4d-482f-8bf4-7dd70f1a4433",
        },
      ],
      bodyAttrs: {
        class: "bg-base-300",
      },
      title: "Batariwah",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "A blog to share perspectives that are fresh and tell narratives that resonate",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/@phosphor-icons/web@2.0.3/src/duotone/style.css",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "57x57",
          href: "/apple-icon-57x57.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "60x60",
          href: "/apple-icon-60x60.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "72x72",
          href: "/apple-icon-72x72.png",
        },

        {
          rel: "apple-touch-icon",
          sizes: "76x76",
          href: "/apple-icon-76x76.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "114x114",
          href: "/apple-icon-114x114.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          href: "/apple-icon-120x120.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "144x144",
          href: "/apple-icon-144x144.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/apple-icon-152x152.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-icon-180x180.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "192x192",
          href: "/apple-icon-192x192.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "192x192",
          href: "/apple-icon-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          hid: "canonical",
          rel: "canonical",
          href: process.env.BASE_URL,
        },
      ],
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
    ENV: process.env.NODE_ENV,
    indexable: process.env.NUXT_INDEXABLE || false,
    public: {
      BASE_URL:
        process.env.NODE_ENV === "development"
          ? process.env.DEV_BASE_URL
          : process.env.BASE_URL,
      NUXT_PUBLIC_SITE_URL:
        process.env.NODE_ENV === "development"
          ? process.env.DEV_NUXT_PUBLIC_SITE_URL
          : process.env.NUXT_PUBLIC_SITE_URL,
      DISQUS_SHORT_NAME:
        process.env.NODE_ENV === "development"
          ? process.env.DEV_DISQUS_SHORT_NAME
          : process.env.DISQUS_SHORT_NAME,
    },
  },
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ["/"],
  //   },
  // },
  sitemap: {
    exclude: ["/cms/**", "/profile/*", "/login"],
  },
  routeRules: {
    "/cms/**": { index: false },
    "/profile/**": { index: false },
    "/login": { index: false },
  },
});
