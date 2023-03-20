<template>
  <div class="space-y-6 p-4">
    <div v-if="page == 1">
      <template v-if="pending">
        <HomeSkeleton />
      </template>
      <template v-else>
        <HomePage :posts="data.posts" />
      </template>
    </div>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <template v-if="pending">
        <PostSkeleton v-for="s in 9" :key="s" />
      </template>
      <template v-else>
        <PostCard v-for="post in data.posts" :key="post._id" :post="post" />
      </template>
    </div>

    <!-- pagination -->
    <div class="py-4 flex gap-4 justify-end items-center">
      <p>
        Page
        <span class="font-semibold">{{ page }}</span>
        of
        <span class="font-semibold">{{ data.totalPages }}</span>
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
          :disabled="page >= data.totalPages"
          class="btn-primary btn-sm"
          @click="nextPage()"
          :loading="direction === 'next' && pending"
        >
          <template #suffix-icon>
            <PhCaretRight :size="18" weight="duotone" />
          </template>
          next
        </Button>
      </div>
    </div>

    <!-- pagination -->
  </div>
</template>

<script setup>
import { PhCaretLeft, PhCaretRight } from "phosphor-vue";
const route = useRoute();
const router = useRouter();
const page = ref(Number(route.query.page) || 1);
const direction = ref("next");

const { data, pending, refresh } = await useAsyncData(
  "posts",
  () => $fetch(`/api/posts?page=${page.value}`),
  { watch: [page] }
);

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

onBeforeUpdate(() => {
  page.value = route.query.page || 1;
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
