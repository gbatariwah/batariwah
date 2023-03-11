<template>
  <NuxtLink :to="`/posts/${featuredPost.slug}`">
    <div
      class="block card-compact card bg-base-200 mx-auto sm:max-w-full md:grid md:grid-cols-12 shadow-md border rounded-md h-full border-zinc-400 hover:border-zinc-600 overflow-hidden"
    >
      <figure class="md:col-span-7">
        <NuxtImg
          :src="featuredPost.featured_image.url"
          class="object-cover h-full w-full sm:aspect-video"
        />
      </figure>
      <div class="p-6 md:col-span-5">
        <div class="flex flex-col h-full full-h post-body">
          <h2 class="card-title text-xl sm:text-2xl">
            {{ featuredPost.title }}
          </h2>
          <span class="text-sm font-thin mb-2">
            {{ datePublished }}
          </span>
          <p class="font-light">{{ featuredPost.content.slice(0, 220) }}...</p>
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
[data-theme="halloween"] .card {
  border-color: #3f3f46;
}

[data-theme="halloween"] .card:hover {
  border-color: #52525b;
}
</style>
