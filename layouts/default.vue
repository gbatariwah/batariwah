<template>
  <div class="container mx-auto max-w-5xl">
    <header class="sticky z-10 top-0 bg-base-300"><Header /></header>
    <main class="min-h-screen">
      <slot />
    </main>
    <footer><Footer /></footer>
    <ScrollToTop />
  </div>
</template>

<script setup></script>
