<template>
  <NuxtLink :to="`/posts/${featuredPost.slug}`">
    <div
      class="block card-compact card bg-base-200 mx-auto sm:max-w-full md:grid md:grid-cols-12 shadow-md border rounded-md h-full border-zinc-700 hover:ring-1 ring-zinc-900 overflow-hidden"
    >
      <figure class="md:col-span-7">
        <NuxtImg
          placeholder="/images/loader.gif"
          loading="lazy"
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
          <p class="font-light">{{ excerpt }}</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

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

const excerpt = computed(() => {
  const html = md.render(props.featuredPost.content, { html: true });
  return `${html.replace(/(<([^>]+)>)/gi, "").slice(0, 224)}...`;
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
