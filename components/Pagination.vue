<template>
  <div class="py-4 flex gap-4 justify-end items-center">
    <p>
      Page
      <span class="font-semibold">{{ page }}</span>
      of
      <span class="font-semibold">{{ totalPages }}</span>
    </p>
    <div class="btn-group">
      <Button
        :disabled="page <= 1"
        class="btn-primary btn-sm"
        @click="previousPage()"
        :loading="direction === 'previous' && pending"
      >
        <template #icon>
          <PhCaretLeft :size="18" weight="duotone" />
        </template>
        previous
      </Button>
      <Button
        :disabled="page >= totalPages"
        class="btn-primary btn-sm"
        @click="nextPage()"
        :loading="direction === 'next' && pending"
      >
        next
        <template #icon>
          <PhCaretRight :size="18" weight="duotone" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { PhCaretLeft, PhCaretRight } from "phosphor-vue";
const props = defineProps({
  page: Number,
  pending: Boolean,
  totalPages: Number,
});

const direction = ref("next");

const previousPage = () => {
  page.value--;
  router.push(`?page=${page.value}`);
  direction.value = "previous";
  refresh();
};

const nextPage = async () => {
  page.value++;
  router.push(`?page=${page.value}`);
  direction.value = "next";
  await refresh();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
</script>
