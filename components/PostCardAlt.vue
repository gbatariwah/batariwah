<template>
  <NuxtLink
    :to="`/posts/${post.slug}`"
    class="flex flex-col card group border border-zinc-700 hover:ring-1 ring-zinc-900 shadow-lg bg-base-200 md:flex-row md:max-w-xl"
  >
    <NuxtImg
      class="object-cover aspect-video w-full rounded-t-lg md:w-48 md:rounded-none md:rounded-l-lg"
      :src="post.featured_image.url"
      alt=""
    />
    <div class="leading-normal p-4 flex flex-col justify-between">
      <h5 class="mb-2 text-lg font-bold tracking-tigh">
        {{ post.title }}
      </h5>

      <div
        class="self-end btn-group invisible group-hover:visible transition-[visibility]"
      >
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
  </NuxtLink>
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
