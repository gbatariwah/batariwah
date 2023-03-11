<template>
  <button class="btn gap-2" :class="{ loading: loading }" v-bind="$attrs">
    <slot v-if="!loading" name="icon"> </slot>
<<<<<<< HEAD
    <slot> </slot>
=======
    <slot></slot>
>>>>>>> 44ff51234692752c647ffab3798e3c139fc18efd
  </button>
</template>

<script setup>
const props = defineProps({
  loading: Boolean,
<<<<<<< HEAD
  text: String,
=======
>>>>>>> 44ff51234692752c647ffab3798e3c139fc18efd
});
</script>
