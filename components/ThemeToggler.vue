<template>
  <label class="swap swap-rotate btn btn-circle btn-ghost" title="Change theme">
    <input type="checkbox" @change="() => toggleDark()" />

    <PhSun class="swap-on" :size="32" weight="duotone" />

    <PhMoon class="swap-off" :size="32" weight="duotone" />
  </label>
</template>

<script setup>
import { PhSun, PhMoon } from "phosphor-vue";

const { isDark, useToggle } = useTheme();

const toggleDark = useToggle(isDark);
</script>
