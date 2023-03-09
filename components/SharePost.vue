<template>
  <div class="space-x-4 flex items-center py-4">
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
  </div>
</template>

<script setup>
import { PhFacebookLogo, PhTwitterLogo, PhWhatsappLogo } from "phosphor-vue";

const config = useRuntimeConfig();

const props = defineProps({
  post: Object,
});

const description = computed(() => props.post.content.slice(0, 12));

const hashtags = "radiology, law, religion";

const { isDark } = useTheme();
</script>
