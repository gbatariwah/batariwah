<template>
  <NuxtLink :to="`/posts/${post.slug}`">
    <div
      class="card bg-base-100 card-compact overflow-hidden shadow-md border border-zinc-700 hover:ring-1 ring-zinc-900 rounded-md h-full"
    >
      <VLazyImage
        class="aspect-video h-auto min-h-48 object-cover"
        :alt="post.title"
        :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
        src-placeholder="/images/loader.gif"
        :src="imageUrl"
      />

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
import VLazyImage from "v-lazy-image";
const props = defineProps({
  post: Object,
});

const datePublished = computed(() =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(props.post.createdAt))
);

const imageUrl = computed(() => {
  const srcset = props.post.featured_image.srcset;
  return srcset[0].secure_url;
});
</script>

<style scoped>
[data-theme="halloween"] .card {
  border-color: #3f3f46;
}

[data-theme="halloween"] .card:hover {
  border-color: #52525b;
}
</style>
