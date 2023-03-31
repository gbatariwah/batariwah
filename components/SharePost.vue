<template>
  <p class="text-center">
    <button
      class="btn gap-6 bg-base-200 btn-outline rounded-full relative border-zinc-700"
      @click="startShare()"
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
import { isClient } from "@vueuse/shared";

const props = defineProps({
  post: Object,
});

const config = useRuntimeConfig();

const options = ref({
  title: props.post.title,
  text: `${props.post.description.split(".")[0]}.`,
  url: isClient ? `${config.BASE_URL}/posts/${props.post.slug}` : "",
});

const { share } = useShare(options);

const startShare = () => share();
</script>
