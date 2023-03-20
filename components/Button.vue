<template>
  <button
    :disabled="loading"
    class="btn gap-2"
    :class="{ loading: loading }"
    v-bind="$attrs"
  >
    <slot v-if="!loading" name="icon"> </slot>
    <slot> </slot>

    <slot v-if="!loading" name="suffix-icon"></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  loading: Boolean,
  text: String,
});
</script>
