<template>
  <label class="swap swap-rotate btn btn-circle btn-ghost" title="Change theme">
    <input type="checkbox" @change="() => toggleDark()" />

    <PhSun class="swap-on" :size="32" weight="duotone" />

    <PhMoon class="swap-off" :size="32" weight="duotone" />
  </label>
</template>

<script setup>
import { PhSun, PhMoon } from "phosphor-vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "data-theme",
  valueDark: "halloween",
  valueLight: "lofi",
});
const toggleDark = useToggle(isDark);
</script>
