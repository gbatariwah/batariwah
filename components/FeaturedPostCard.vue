<template>
  <NuxtLink :to="`/posts/${featuredPost.slug}`">
    <div
      class="block card bg-base-200 mx-auto sm:max-w-full md:grid md:grid-cols-12 shadow-md hover:border rounded-md h-full border-zinc-600 overflow-hidden"
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
          <p class="flex items-center gap-2 mb-4 mt-1">
            <PhCalendar :size="16" weight="duotone" />
            <span class="text-sm font-thin">
              {{ datePublished }}
            </span>
          </p>
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
