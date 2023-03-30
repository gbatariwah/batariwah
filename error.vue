<template>
  <section class="flex items-center h-screen bg-base-300">
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="md:max-w-md w-full text-center">
        <img src="~assets/img/404.svg" alt="404" />
        <p class="text-2xl font-semibold md:text-3xl mt-4">
          There is NOTHING here...
        </p>
        <p class="mt-4 mb-8">
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <Button @click="handleError" class="btn-primary">
          <template #icon>
            <PhHouseSimple :size="18" weight="duotone" />
          </template>
          Back to homepage
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PhHouseSimple } from "phosphor-vue";

const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
useTheme();
</script>
