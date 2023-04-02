<template>
  <button
    v-show="visible"
    @click="scrollUp"
    class="btn btn-circle outline-none fixed bottom-8 right-8 z-50 opacity-80 hover:opacity-100"
  >
    <i class="ph-duotone ph-arrow-u-left-up text-[28px]"></i>
  </button>
</template>

<script setup>
import { useEventListener } from "@vueuse/core";

const visible = ref(false);

onMounted(() => {
  useEventListener(document, "scroll", (e) => {
    visible.value = window.scrollY > 150;
  });
});

const scrollUp = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
</script>

<style scoped>
[data-theme="halloween"] .btn {
  border-color: #3f3f46;
}

[data-theme="halloween"] .btn:hover {
  border-color: #52525b;
}
</style>
