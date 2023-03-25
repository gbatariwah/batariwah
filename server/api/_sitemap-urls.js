export default cachedEventHandler(
  async (e) => {
    const config = useRuntimeConfig();
    const response = await $fetch("/api/posts");

    return [...response.posts].map((p) => ({
      loc: `${config.NUXT_PUBLIC_SITE_URL}/posts/${p.slug}`,
      lastmod: p.updatedAt,
    }));
  },
  {
    name: "sitemap-dynamic-urls",
    maxAge: 60 * 10,
  }
);
