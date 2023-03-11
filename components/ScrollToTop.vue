<template>
  <Teleport to=".wrapper">
    <button class="btn btn-circle absolute bottom-5 right-5">
      <PhArrowCircleUp :size="32" weight="duotone" />
    </button>
  </Teleport>
</template>

<script setup>
import { useScroll } from "@vueuse/core";
import { PhArrowCircleUp } from "phosphor-vue";

// const { x, y } = useScroll(, { behavior: "smooth" });
</script>
