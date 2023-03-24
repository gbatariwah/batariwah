<template>
  <NuxtImg
    class="-ml-5 animate__animated animate__fadeIn"
    :src="src"
    alt="logo"
  />
</template>

<script setup>
const { isDark } = useTheme();

const src = ref("/images/logo-dark.png");

watch(isDark, (val) => {
  if (!val) {
    src.value = "/images/logo-light.png";
  } else {
    src.value = "/images/logo-dark.png";
  }
});

// onBeforeUpdate(() => {
//   if (isDark.value) {
//     src.value = "/images/logo-dark.png";
//   } else {
//     src.value = "/images/logo-light.png";
//   }
// });

onMounted(() => {
  if (isDark.value) {
    src.value = "/images/logo-dark.png";
  } else {
    src.value = "/images/logo-light.png";
  }
});
</script>
