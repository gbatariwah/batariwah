<template>
  <div class="min-h-[600px] flex justify-center items-center">
    <PhSpiral :size="48" weight="duotone" class="animate-spin" />
  </div>
</template>

<script setup>
import { PhSpiral } from "phosphor-vue";
</script>
