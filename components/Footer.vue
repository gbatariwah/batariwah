<template>
  <div class="p-4 md:px-6 md:py-8">
    <div class="divider" />
    <div class="mb-2 flex items-center justify-between">
      <NuxtLink to="/">
        <Logo class="w-[160px]" />
      </NuxtLink>

      <div class="flex gap-4 items-center">
        <NuxtLink to="/" class="flex gap-1 items-center hover:underline">
          <PhHouseLine :size="20" weight="duotone" />
          <span class="font-semibold tracking-wider uppercase">Home</span>
        </NuxtLink>
        <NuxtLink to="/about" class="flex gap-1 items-center hover:underline">
          <PhInfo :size="20" weight="duotone" />
          <span class="font-semibold tracking-wider uppercase">About</span>
        </NuxtLink>
      </div>
    </div>
    <div class="text-sm text-center space-y-1 pt-2">
      <p class="flex justify-center items-center gap-1">
        <PhCopyright :size="16" weight="duotone" />
        <span
          >{{ new Date().getFullYear() }} Batariwah. All Rights Reserved.</span
        >
      </p>
      <p>Developed by <a class="link link-hover link-primary">Geraldo</a></p>
    </div>
  </div>
</template>

<script setup>
import { PhHouseLine, PhInfo, PhCopyright } from "phosphor-vue";
</script>
