<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 gap-2 flex uppercase">
      <i class="ph-duotone ph-eraser text-[32px]"></i>
      Manage Posts
    </h2>

    <div class="space-y-6">
      <div>
        <!-- postcardAlt -->
        <Transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div class="grid sm:grid-cols-2 gap-6" v-if="pending">
            <PostAltSkeleton v-for="s in 6" />
          </div>
          <ManagePosts v-else :posts="data.posts" :refresh="refresh" />
        </Transition>
        <!-- postcardAlt -->
      </div>

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
  </div>
</template>

<script setup>
const page = ref(1);

const fetchingMorePosts = ref(false);

const { data, pending, refresh } = await useFetch("/api/posts/user", {
  query: { page: page.value, limit: 6 },
  headers: useRequestHeaders(["cookie"]),
});

const loadMorePosts = async () => {
  page.value++;

  try {
    fetchingMorePosts.value = true;

    const response = await $fetch(`/api/posts?page=${page.value}&limit=${2}`, {
      headers: useRequestHeaders(["cookie"]),
    });

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
