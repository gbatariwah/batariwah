<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 gap-2 flex">
      <PhEraser :size="32" weight="duotone" />
      Manage Posts
    </h2>
    <div class="grid sm:grid-cols-2 gap-6">
      <!-- postcardAlt -->
      <PostCardAlt v-for="post in data.posts" :key="post" :post="post" />
      <!-- postcardAlt -->
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

    <!-- /pagination -->
  </div>
</template>

<script setup>
import { PhEraser, PhCaretLeft, PhCaretRight } from "phosphor-vue";

const route = useRoute();
const router = useRouter();
const page = ref(route.query.page || 1);

const { data, pending, refresh } = await useAsyncData(
  "use_posts",
  () =>
    $fetch(`/api/posts/user?page=${page.value}`, {
      headers: useRequestHeaders(["cookie"]),
    }),
  { watch: [page] }
);

const previousPage = () => {
  page.value--;
  router.push(`/cms/posts?page=${page.value}`);
  refresh();
};

const nextPage = () => {
  page.value++;
  router.push(`/cms/posts?page=${page.value}`);
  refresh();
};

onBeforeUpdate(() => {
  page.value = route.query.page;
});
</script>
