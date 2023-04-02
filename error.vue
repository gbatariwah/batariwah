<template>
  <section class="flex items-center h-screen bg-base-300">
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="md:max-w-md w-full text-center">
        <VLazyImage
          src="images/404.svg"
          class="object-cover"
          alt="404"
          :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
          src-placeholder="/images/loader.gif"
        />
        <p class="text-2xl font-semibold md:text-3xl mt-4">
          There is NOTHING here...
        </p>
        <p class="mt-4 mb-8">
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <Button @click="handleError" class="btn-primary">
          <template #icon>
            <i class="ph-duotone ph-house-simple text-[18px]"></i>
          </template>
          Back to homepage
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import VLazyImage from "v-lazy-image";

const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
useTheme();
</script>
