<template>
  <div class="space-y-6 p-4">
    <Transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <template v-if="pending">
        <Skeleton />
      </template>
      <template v-else>
        <HomePage :posts="data.posts" />
      </template>
    </Transition>
    <!-- load more -->
    <div class="text-center">
      <Button
        class="btn-primary"
        @click="loadMorePosts"
        :loading="fetchingMorePosts"
        v-if="!fetchedAllPosts"
      >
        <template #icon>
          <i class="ph-duotone ph-caret-double-down text-[24px]"></i>
        </template>
        Load More
      </Button>
    </div>
    <!-- load more -->
  </div>
</template>

<script setup>
const page = ref(1);

const fetchingMorePosts = ref(false);

const { data, pending } = await useFetch("/api/posts", {
  query: { page: page.value, limit: 7 },
});

const loadMorePosts = async () => {
  page.value++;

  try {
    fetchingMorePosts.value = true;

    const response = await $fetch(`/api/posts?page=${page.value}&limit=${3}`);

    data.value = {
      ...data.value,
      posts: [...data.value.posts, ...response.posts],
    };

    fetchingMorePosts.value = false;
  } catch (error) {
    fetchingMorePosts.value = true;
  }
};

const fetchedAllPosts = computed(
  () => data.value.posts.length === data.value.totalPosts
);
</script>

<style>
:root {
  color-scheme: light dark;
}

iframe {
  color-scheme: light;
}
</style>
