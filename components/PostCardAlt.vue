<template>
  <div
    class="flex flex-col card border border-zinc-700 hover:ring-1 ring-zinc-900 shadow-lg rounded-md bg-base-100 md:flex-row md:max-w-xl"
  >
    <VLazyImage
      class="object-cover w-full rounded-t-md md:w-48 md:rounded-none md:rounded-l-md"
      :src="imageUrl"
      :alt="post.title"
      :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
      src-placeholder="/images/loader.gif"
    />
    <div class="leading-normal p-4 flex flex-col justify-between h-full">
      <NuxtLink
        :to="`/posts/${post.slug}`"
        class="mb-2 text-lg font-bold tracking-tigh"
      >
        {{ post.title }}
      </NuxtLink>

      <div class="self-end btn-group">
        <NuxtLink
          :to="`/cms/posts/${post.slug}/edit`"
          class="btn btn-warning btn-outline btn-sm"
        >
          <PhNotePencil :size="26" weight="duotone" />
        </NuxtLink>

        <button
          @click.prevent="$emit('confirm-post-deletion', post.slug)"
          class="btn btn-error btn-outline btn-sm"
        >
          <PhTrash :size="26" weight="duotone" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhNotePencil, PhTrash } from "phosphor-vue";
import VLazyImage from "v-lazy-image";

const props = defineProps({
  post: Object,
});

const imageUrl = computed(() => {
  const srcset = props.post.featured_image.srcset;
  return srcset[srcset.length - 1].secure_url;
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
