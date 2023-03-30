<template>
  <div class="p-4">
    <div class="mx-auto max-w-sm pb-8">
      <h2
        class="text-2xl font-semibold flex gap-2 items-center justify-center uppercase mb-6"
      >
        <PhMagnifyingGlass :size="32" weight="duotone" />
        Search
      </h2>

      <div class="form-control py-6">
        <div class="input-group">
          <input
            class="input input-bordered w-full"
            @keydown.enter="search()"
            placeholder="Search my blog.."
            v-model="q"
          />
          <Button
            :disabled="q.length < 3"
            class="btn-square"
            @click="search()"
            :loading="pending"
          >
            <template #icon>
              <PhMagnifyingGlass :size="32" weight="duotone" />
            </template>
          </Button>
        </div>
      </div>
    </div>
    <Transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div>
        <div v-if="query">
          <div v-if="fetchingResults">
            <Loader />
          </div>
          <div v-else>
            <div v-if="data.results.length >= 1">
              <div class="text-center mb-5 font-thin">
                Search results for
                <div :class="`badge badge-${tagType}`">
                  <span class="font-semibold tracking-wider">{{ query }}</span>
                </div>
              </div>
              <div class="grid gap-6 sm:grid-cols-2">
                <PostCard
                  v-for="post in data.results"
                  :key="post.id"
                  :post="post"
                />
              </div>
              <!-- load more -->
              <div class="text-center mt-6">
                <Button
                  class="btn-primary"
                  @click="loadMoreResults"
                  :loading="fetchingMoreResults"
                  v-if="data.results.totalResults > 4 || !fetchedAllResults"
                >
                  <template #icon>
                    <PhCaretDoubleDown :size="24" weight="duotone" />
                  </template>
                  Load More
                </Button>
              </div>
              <!-- load more -->
            </div>
            <div v-else class="mx-auto max-w-sm">No results found</div>
          </div>
        </div>
        <div v-else>
          <div class="mx-auto max-w-sm">Search blog</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { PhCaretDoubleDown, PhMagnifyingGlass } from "phosphor-vue";

const route = useRoute();
const router = useRouter();
const q = ref(route.query.q || "");
const fetchingResults = ref(false);
const page = ref(1);
const fetchingMoreResults = ref(false);

const tagTypes = ["", "success", "info", "error", "warning"];

const generateRandomTagType = () =>
  tagTypes[Math.floor(Math.random() * tagTypes.length)];

const tagType = ref(generateRandomTagType());

const { data, pending, refresh } = await useAsyncData(() =>
  $fetch(`/api/posts/search?q=${q.value}&page=${page.value}&limit=${4}`)
);

const query = computed(() => route.query.q);

const search = async () => {
  if (q.value.length >= 3) {
    tagType.value = generateRandomTagType();
    router.push(`/search?q=${q.value}`);
    await refresh();
  }
};

const loadMoreResults = async () => {
  page.value++;

  try {
    fetchingMoreResults.value = true;

    const response = await $fetch(
      `/api/posts/search?page=${page.value}&limit=${2}&q=${q.value}`
    );

    data.value = {
      ...data.value,
      results: [...data.value.results, ...response.results],
    };

    fetchingMoreResults.value = false;
  } catch (error) {
    fetchingMoreResults.value = false;
  }
};

const fetchedAllResults = computed(
  () => data.value.results.length === data.value.totalResults
);

useSeoMeta({
  title: "Search",
  titleTemplate: "%s | Batariwah",
});
</script>
