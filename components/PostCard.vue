<template>
  <NuxtLink :to="`/posts/${post.slug}`">
    <div
      class="card bg-base-200 card-compact shadow-md border border-zinc-700 hover:ring-1 ring-zinc-900 rounded-md h-full"
    >
      <figure>
        <NuxtImg
          :src="post.featured_image.url"
          loading="lazy"
          placeholder="/images/loader.gif"
          class="aspect-video object-cover"
        />
      </figure>
      <div class="px-4 pt-2 pb-4 space-y-2 post-body">
        <p class="text-sm font-thin">
          {{ datePublished }}
        </p>
        <h2 class="text-xl font-semibold post-card-title">
          {{ post.title }}
        </h2>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: Object,
});

const { isDark } = useTheme();

const datePublished = computed(() =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(props.post.createdAt))
);
</script>

<style scoped>
[data-theme="halloween"] .card {
  border-color: #3f3f46;
}

[data-theme="halloween"] .card:hover {
  border-color: #52525b;
}
</style>
