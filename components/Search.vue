<template>
  <label
    for="search-modal"
    class="btn btn-ghost btn-circle"
    title="Search"
    @click="searchInput.focus()"
  >
    <PhMagnifyingGlass :size="32" weight="duotone" />
  </label>

  <!-- Put this part before </body> tag -->
  <Teleport to="body">
    <input type="checkbox" id="search-modal" class="modal-toggle" />
    <label
      for="search-modal"
      class="modal modal-bottom items-start cursor-pointer"
    >
      <label class="modal-box relative md:max-w-xl md:rounded-b-xl" for="">
        <div class="form-control">
          <div class="input-group">
            <input
              type="search"
              placeholder="Search blog..."
              class="input input-bordered w-full"
              v-model="query"
              @keydown.enter="search()"
              ref="searchInput"
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
      </label>
    </label>
  </Teleport>
</template>

<script setup>
import { PhMagnifyingGlass } from "phosphor-vue";

const query = ref("");
const searchInput = ref(null);

const router = useRouter();

const search = async () => {
  await router.push(`/search?q=${query.value}`);
};

onMounted(() => {
  searchInput.value.focus();
});
</script>
