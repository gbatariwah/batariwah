<template>
  <label class="swap swap-rotate btn btn-circle btn-ghost" title="Change theme">
    <input type="checkbox" @change="() => toggleDark()" />

    <i class="swap-on ph-duotone ph-sun text-[32px]"></i>
    <i class="swap-off ph-duotone ph-moon text-[32px]"></i>
  </label>
</template>

<script setup>
const { isDark, useToggle } = useTheme();

const toggleDark = useToggle(isDark);
</script>
