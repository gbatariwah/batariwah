<template>
  <div class="container mx-auto max-w-4xl">
    <!-- header -->

    <header class="sticky z-50 top-0 bg-base-100">
      <HeaderAlt />
    </header>

    <!-- /header -->

    <main class="p-6">
      <slot />
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<script setup></script>
