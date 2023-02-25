<template>
  <div class="space-y-6">
    <FeaturedPostCard :featuredPost="posts[0]" />
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <PostCard v-for="post in posts.slice(1)" :key="post.slug" :post="post" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  posts: Object,
});
</script>
