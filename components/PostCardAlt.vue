<template>
  <div
    class="flex flex-col card border shadow-lg rounded-none bg-base-200 md:flex-row md:max-w-xl animate__animated animate__zoomIn animate__faster"
  >
    <VLazyImage
      class="object-cover w-full  md:w-48 "
      :src="imageUrl"
      :alt="post.title"
      :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
      src-placeholder="/images/loader.gif"
    />
    <div class="leading-normal p-4 flex flex-col justify-between h-full w-full">
      <NuxtLink
        :to="`/posts/${post.slug}`"
        class="mb-2 text-lg font-bold font-['oswald'] tracking-wider link link-hover"
      >
        {{ post.title }}
      </NuxtLink>

      <div class="self-end btn-group">
        <NuxtLink
          :to="`/cms/posts/${post.slug}/edit`"
          class="btn btn-warning btn-outline btn-sm"
        >
          <i class="ph-duotone ph-note-pencil text-[26px]"></i>
        </NuxtLink>

        <Button
          @click.prevent="$emit('confirm-post-deletion', post.slug)"
          class="btn btn-error btn-outline btn-sm"
        >
          <template #icon>
            <i class="ph-duotone ph-trash-simple text-[26px]"></i>
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";

const props = defineProps({
  post: Object,
});

const imageUrl = computed(() => {
  const srcset = props.post.featured_image.srcset;
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
