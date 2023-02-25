<template>
  <NuxtLink :to="`/posts/${featuredPost.slug}`">
    <div
      class="block card bg-base-300 mx-auto sm:max-w-full md:grid md:grid-cols-12 shadow-xl hover:ring-1 ring-primary rounded-md h-full group"
    >
      <figure class="md:col-span-7">
        <NuxtImg
          :src="featuredPost.featured_image.url"
          class="object-cover h-full group-hover:scale-105 trasform transition"
        />
      </figure>
      <div class="p-6 md:col-span-5">
        <div class="flex flex-col h-full full-h post-body">
          <h2 class="card-title text-xl sm:text-2xl">
            {{ featuredPost.title }}
          </h2>
          <p class="flex items-center gap-2 mb-4">
            <PhCalendar :size="16" weight="duotone" />
            <span class="text-sm font-thin">
              {{ datePublished }}
            </span>
          </p>
          <p class="font-light">{{ featuredPost.content.slice(0, 360) }}...</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { PhCalendar } from "phosphor-vue";
const props = defineProps({
  featuredPost: Object,
});

const datePublished = computed(() =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(props.featuredPost.createdAt))
);
</script>

<style scoped>
[data-theme="lofi"] .card {
  background-color: transparent;
}

[data-theme="lofi"] .post-body {
  color: #4b5563;
}
</style>
