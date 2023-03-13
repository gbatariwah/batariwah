<template>
  <button
    v-show="visible"
    @click="scrollUp"
    class="btn btn-circle fixed bottom-8 right-8 z-50 opacity-80 hover:opacity-100"
  >
    <PhCaretDoubleUp :size="28" weight="duotone" />
  </button>
</template>

<script setup>
import { useEventListener } from "@vueuse/core";
import { PhCaretDoubleUp } from "phosphor-vue";

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
