<template>
  <div
    class="flex flex-col card border border-zinc-700 hover:ring-1 ring-zinc-900 shadow-lg rounded-md bg-base-200 md:flex-row md:max-w-xl"
  >
    <NuxtImg
      class="object-cover w-full rounded-t-md md:w-48 md:rounded-none md:rounded-l-md"
      :src="post.featured_image.url"
      :alt="post.title"
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
const props = defineProps({
  post: Object,
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
