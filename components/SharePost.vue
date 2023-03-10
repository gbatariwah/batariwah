<template>
  <!-- <div class="space-x-4 flex items-center py-4">
    <span class="font-semibold uppercase">Share</span>
    <ShareNetwork
      class="btn btn-sm btn-primary gap-2"
      :class="{ 'btn-info': isDark }"
      network="facebook"
      :url="`${config.baseURL}/posts/${post.slug}`"
      :title="post.title"
      :description="description"
      :hashtags="hashtags"
    >
      <PhFacebookLogo :size="24" weight="duotone" />
      <span class="hidden md:block">Facebook</span>
    </ShareNetwork>
    <ShareNetwork
      class="btn btn-sm btn-primary gap-2"
      :class="{
        'bg-blue-500 hover:bg-blue-500 border border-blue-500': isDark,
      }"
      network="twitter"
      :url="`${config.baseURL}/posts/${post.slug}`"
      :title="post.title"
      :description="description"
      twitter-user="1st_apprentice"
    >
      <PhTwitterLogo :size="24" weight="duotone" />
      <span class="hidden md:block">Twitter</span>
    </ShareNetwork>
    <ShareNetwork
      class="btn btn-sm btn-primary gap-2"
      :class="{ 'btn-success': isDark }"
      network="whatsapp"
      :url="`${config.baseURL}/posts/${post.slug}`"
      :title="post.title"
      :description="description"
    >
      <PhWhatsappLogo :size="24" weight="duotone" />
      <span class="hidden md:block">Whatsapp</span>
    </ShareNetwork>
  </div> -->

  <p class="text-center">
    <button
      class="btn gap-6 bg-base-200 btn-outline rounded-full relative border-zinc-700"
      @click="startShare"
    >
      <span class="tracking-wider">
        <!-- <PhShareNetwork :size="28" weight="duotone" />
        
         -->
        Share
      </span>
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
  PhShareNetwork,
  PhEnvelopeSimple,
  PhPlus,
  PhTelegramLogo,
} from "phosphor-vue";
const { share, isSupported } = useShare();
const props = defineProps({
  post: Object,
});

const description = computed(() => props.post.content.slice(0, 12));
const config = useRuntimeConfig();

function startShare() {
  share({
    title: props.post.title,
    text: description,
    url: `${config.BASE_URL}/${props.post.slug}`,
  });
}

const hashtags = "radiology, law, religion";

const { isDark } = useTheme();
</script>
