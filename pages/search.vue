<template>
  <div>
    <div class="mx-auto max-w-sm pb-6">
      <h2 class="text-center text-4xl font-semibold prose mb-6">
        Search Results
      </h2>

      <div class="form-control">
        <div class="input-group">
          <input
            class="input input-bordered w-full"
            @keydown.enter="search()"
            placeholder="Search my blog.."
            v-model="q"
          />
          <button
            :disabled="query.length < 3"
            class="btn btn-square"
            @click="search()"
          >
            <PhMagnifyingGlass :size="32" weight="duotone" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="data.results.length > 1">
      <div class="text-center mb-5 font-thin">
        Search results for
        <div :class="`badge badge-${tagType}`">
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

<script setup>
import { PhMagnifyingGlass } from "phosphor-vue";

const route = useRoute();
const router = useRouter();
const q = ref(route.query.q);

const tagTypes = ["", "success", "info", "error", "warning"];

const generateRandomTagType = () =>
  tagTypes[Math.floor(Math.random() * tagTypes.length)];

const tagType = ref(generateRandomTagType());

const { data, pending, refresh } = await useAsyncData(() =>
  $fetch(`/api/posts/search?q=${q.value}`)
);

const query = computed(() => route.query.q);

const search = () => {
  if (q.value.length >= 3) {
    tagType.value = generateRandomTagType();

    router.push(`/search?q=${q.value}`);
    refresh();
  }
};
</script>
