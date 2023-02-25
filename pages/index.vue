<template>
  <div class="space-y-6">
    <HomePage :posts="data.posts" v-if="page == 1" />

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <PostCard v-for="post in data.posts" :key="post._id" :post="post" />
    </div>

    <!-- pagination -->
    <div class="py-4 flex gap-4 justify-end items-center">
      <p>
        Page
        <span class="font-semibold">{{ data.currentPage }}</span>
        of
        <span class="font-semibold">{{ data.totalPages }}</span>
      </p>
      <div class="btn-group">
        <button
          :disabled="page <= 1"
          class="btn btn-primary btn-sm gap-2"
          @click="previousPage()"
          :loading="pending"
        >
          <PhCaretLeft :size="18" weight="duotone" />
          previous
        </button>
        <button
          :disabled="page >= data.totalPages"
          class="btn btn-primary btn-sm gap-2"
          @click="nextPage()"
          :loading="pending"
        >
          next
          <PhCaretRight :size="18" weight="duotone" />
        </button>
      </div>
    </div>

    <!-- pagination -->
  </div>
</template>

<script setup>
import { PhCaretLeft, PhCaretRight } from "phosphor-vue";
const route = useRoute();
const router = useRouter();
const page = ref(route.query.page || 1);

const { data, pending, error, refresh } = await useAsyncData(
  "posts",
  () => $fetch(`/api/posts?page=${page.value}`),
  { watch: [page] }
);

const previousPage = () => {
  page.value--;
  router.push(`?page=${page.value}`);
  refresh();
};

const nextPage = () => {
  page.value++;
  router.push(`?page=${page.value}`);
  refresh();
};

onBeforeUpdate(() => {
  page.value = route.query.page;
});
</script>

<style>
:root {
  color-scheme: light dark;
}

iframe {
  color-scheme: light;
}
</style>
