<template>
  <NuxtLink :to="`/posts/${featuredPost.slug}`">
    <div
      class="block card-compact card bg-base-100 mx-auto sm:max-w-full md:grid md:grid-cols-12 shadow-md border rounded-md h-full border-zinc-700 hover:ring-1 ring-zinc-900 overflow-hidden animate__animated animate__zoomIn animate__faster"
    >
      <figure class="md:col-span-7">
        <VLazyImage
          class="object-cover h-full w-full sm:aspect-video"
          :alt="featuredPost.title"
          :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
          src-placeholder="/images/loader.gif"
          :src="imageUrl"
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
import VLazyImage from "v-lazy-image";
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

const imageUrl = computed(() => {
  const srcset = props.featuredPost.featured_image.srcset;
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
