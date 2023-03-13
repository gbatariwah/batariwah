<template>
  <div class="container mx-auto max-w-4xl">
    <header class="sticky z-10 top-0 bg-base-100"><Header /></header>
    <main class="p-6 min-h-full">
      <slot />
    </main>
    <footer><Footer /></footer>
    <ScrollToTop />
  </div>
</template>

<script setup></script>
