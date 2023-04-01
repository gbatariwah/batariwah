<template>
  <VLazyImage
    class="border animate__animated animate__bounceIn animate__faster"
    :src="src"
    alt="logo"
  />
</template>

<script setup>
import VLazyImage from "v-lazy-image";
const { isDark } = useTheme();

const src = ref("/images/logo-dark.png");

watch(isDark, (val) => {
  if (!val) {
    src.value = "/images/logo-light.png";
  } else {
    src.value = "/images/logo-dark.png";
  }
});

onMounted(() => {
  if (isDark.value) {
    src.value = "/images/logo-dark.png";
  } else {
    src.value = "/images/logo-light.png";
  }
});
</script>

<style scoped>
[data-theme="lofi"] .border {
  border-color: #3f3f46;
  border-width: 2px;
}
</style>
