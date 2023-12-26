<template>
  <NuxtLink :to="`/posts/${post.slug}`">
    <div
      class="card group rounded-none card-compact hover:bg-base-200 overflow-hidden h-full animate__animated animate__zoomIn animate__faster"
    >
      <figure class="border card rounded-none overflow-hidden">
        <VLazyImage
          format="image/webp"
          class="aspect-video h-auto min-h-48 object-cover group-hover:scale-105 transition-all duration-300 "
          :alt="post.title"
          :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
          src-placeholder="/images/loader.gif"
          :src="imageUrl"
        />
      </figure>

      <div class="px-4 pt-2 pb-4 space-y-2 post-body">
        <p class="text-sm italic">
          {{ datePublished }}
        </p>
        <h2 class="text-xl link link-hover font-semibold post-card-title font-['Oswald'] tracking-wider">
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

.card {
  --animate-duration: 0.3s;
}
</style>
