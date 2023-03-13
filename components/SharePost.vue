<template>
  <p class="text-center">
    <button
      class="btn gap-6 bg-base-200 btn-outline rounded-full relative border-zinc-700"
      @click="startShare"
    >
      <span class="tracking-wider"> Share </span>
      <span class="flex gap-4">
        <PhFacebookLogo :size="24" weight="duotone" />
        <PhTwitterLogo :size="24" weight="duotone" />
        <PhWhatsappLogo :size="24" weight="duotone" />
        <PhEnvelopeSimple :size="24" weight="duotone" />
        <PhPlus :size="24" weight="duotone" />
      </span>
    </button>
  </p>
</template>

<script setup>
import { useShare } from "@vueuse/core";
import {
  PhFacebookLogo,
  PhTwitterLogo,
  PhWhatsappLogo,
  PhEnvelopeSimple,
  PhPlus,
} from "phosphor-vue";
const { share } = useShare();
const props = defineProps({
  post: Object,
});

const description = computed(() => props.post.content.slice(0, 12));
const config = useRuntimeConfig();

function startShare() {
  share({
    title: props.post.title,
    text: description,
    url: `${config.BASE_URL}/posts/${props.post.slug}`,
  });
}
</script>
