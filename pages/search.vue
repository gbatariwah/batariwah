<template>
  <div>
    <div class="mx-auto max-w-sm pb-6">
      <h2 class="text-center text-4xl font-semibold prose mb-6">
        Search Results
      </h2>

      <input
        class="input input-bordered w-full"
        @keydown.enter="search()"
        placeholder="Search my blog.."
        v-model="q"
      />
    </div>

    <div v-if="data.results.length > 1">
      <div class="text-center mb-5 font-thin">
        Search results for
        <div class="badge">
          <span class="font-semibold tracking-wider">{{ query }}</span>
        </div>
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        <PostCard v-for="post in data.results" :key="post.id" :post="post" />
      </div>
    </div>
    <div v-else class="mx-auto max-w-sm">No results found</div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "search",-->
<!--  async asyncData({-->
<!--                    route: {-->
<!--                      query: { q },-->
<!--                    },-->
<!--                    $axios,-->
<!--                  }) {-->
<!--    try {-->
<!--      const { posts } = await $axios.$get(`/api/posts?q=${q}`);-->
<!--      return { posts };-->
<!--    } catch (e) {}-->
<!--  },-->
<!--  watchQuery: true,-->
<!--  computed: {-->
<!--    summary() {-->
<!--      return this.posts.length-->
<!--          ? this.posts.length === 1-->
<!--              ? `${this.posts.length} result found`-->
<!--              : `${this.posts.length} results found`-->
<!--          : "Sorry! Nothing found";-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<script setup>
const route = useRoute();
const router = useRouter();
const q = ref(route.query.q);

const tagTypes = ["", "success", "info", "error", "warning"];

const randomTagType = tagTypes[Math.floor(Math.random() * tagTypes.length)];

const { data, pending, refresh } = await useAsyncData(
  () => $fetch(`/api/posts/search?q=${q.value}`)
  // { watch: [q] }
);

const query = computed(() => route.query.q);

const search = () => {
  router.push(`/search?q=${q.value}`);
  refresh();
};
</script>
