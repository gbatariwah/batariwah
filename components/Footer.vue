<template>
  <div class="p-4 md:px-6 md:py-8">
    <div class="divider" />
    <div class="mb-2 flex items-center justify-between">
      <NuxtLink to="/">
        <Logo class="w-[120px]" />
      </NuxtLink>

      <div class="flex items-center">
        <NuxtLink to="/" class="btn btn-ghost btn-sm gap-1">
          <i class="ph-duotone ph-house-simple text-[18px]"></i>
          <span class="font-semibold tracking-wider uppercase">Home</span>
        </NuxtLink>
        <NuxtLink to="/about" class="btn btn-ghost btn-sm gap-1">
          <i class="ph-duotone ph-info text-[18px]"></i>
          <span class="font-semibold tracking-wider uppercase">About</span>
        </NuxtLink>
      </div>
    </div>
    <div class="text-sm text-center space-y-1 pt-2">
      <p class="flex justify-center items-center gap-1">
        <i class="ph-duotone ph-copyright text-[16px]"></i>
        <span
          >{{ new Date().getFullYear() }}
          <span class="tracking-wide">BATARIWAH</span>. All Rights
          Reserved.</span
        >
      </p>
      <p>
        Developed by
        <NuxtLink
          to="https://facebook.com/gerald.batariwah"
          target="_blank"
          rel="noopener"
          class="link link-hover text-sm font-semibold"
          ><span class="tracking-wide">
            Gerald Batariwah
          </span></NuxtLink
        >
      </p>
    </div>
  </div>
</template>

