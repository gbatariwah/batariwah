<template>
  <NuxtLink :to="`/posts/${post.slug}`">
    <div
      class="card bg-base-300 card-compact shadow-lg hover:ring-1 ring-primary rounded-md h-full group"
    >
      <figure>
        <NuxtImg
          :src="post.featured_image.url"
          class="group-hover:scale-105 trasform transition"
        />
      </figure>
      <div class="px-4 pt-2 pb-4 space-y-2 post-body">
        <p class="flex items-center gap-2">
          <PhCalendar :size="16" weight="duotone" />
          <span class="text-sm font-thin">
            {{ datePublished }}
          </span>
        </p>
        <h2 class="text-xl font-semibold post-card-title">
          {{ post.title }}
        </h2>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { PhCalendar } from "phosphor-vue";

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
</script>

<style scoped>
/* [data-theme="halloween"] .post-body {
  color: #9ca3af;
} */

[data-theme="lofi"] .card {
  background-color: transparent;
}

[data-theme="lofi"] .post-body {
  color: #4b5563;
}
</style>
