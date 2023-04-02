<template>
  <div class="container mx-auto max-w-4xl">
    <!-- header -->

    <header class="sticky z-50 top-0 bg-base-300">
      <HeaderAlt />
    </header>

    <!-- /header -->

    <main class="p-4 min-h-[600px]">
      <slot />
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<script setup></script>
