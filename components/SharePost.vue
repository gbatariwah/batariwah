<template>
  <p class="text-center">
    <button
      class="btn gap-6 bg-base-200 btn-outline rounded-full relative border-zinc-700"
      @click="startShare()"
    >
      <span class="tracking-wider"> Share </span>
      <span class="flex gap-4">
        <i class="ph-duotone ph-facebook-logo text-[24px]"></i>
        <svg class="h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
<!--        <i class="ph-duotone ph-twitter-logo text-[24px]"></i>-->
        <i class="ph-duotone ph-whatsapp-logo text-[24px]"></i>
        <i class="ph-duotone ph-envelope-simple text-[24px]"></i>
        <i class="ph-duotone ph-plus text-[24px]"></i>
      </span>
    </button>
  </p>
</template>

<script setup>
import { useShare } from "@vueuse/core";
import { isClient } from "@vueuse/shared";

const props = defineProps({
  post: Object,
});

const config = useRuntimeConfig();

const options = ref({
  title: props.post.title,
  text: `${props.post.description.split(".")[0]}.`,
  url: isClient ? `${config.public.BASE_URL}/posts/${props.post.slug}` : "",
});

const { share } = useShare(options);

const startShare = () => share();
</script>
