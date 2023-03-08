<template>
  <NuxtLink
    :to="`/posts/${post.slug}`"
    class="flex flex-col card group shadow-lg bg-base-200 md:flex-row md:max-w-xl"
    :class="{ 'bg-transparent border-zinc-300': !isDark }"
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

        <button class="btn btn-error btn-outline btn-sm">
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

const { isDark } = useTheme();
</script>

<style scoped>
/* [data-theme="halloween"] .post-body {
    color: #9ca3af;
  } */

/* [data-theme="lofi"] .card {
  background-color: transparent;
  color: #4b5563;
} */
</style>
