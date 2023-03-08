<template>
  <NuxtLink :to="`/posts/${post.slug}`">
    <div
      class="card bg-base-200 card-compact shadow-md hover:border border-zinc-600 rounded-md h-full"
    >
      <figure>
        <NuxtImg :src="post.featured_image.url" class="object-cover" />
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
