<template>
  <div>
    <label
      htmlFor="search-modal"
      class="btn btn-ghost btn-circle"
      title="Search"
    >
      <PhMagnifyingGlass :size="32" weight="duotone" />
    </label>

    <input type="checkbox" id="search-modal" className="modal-toggle" />
    <label
      htmlFor="search-modal"
      className="modal modal-bottom items-start cursor-pointer"
    >
      <label className="modal-box md:max-w-xl md:rounded-b-xl" htmlFor="">
        <div class="form-control">
          <label class="input-group">
            <input
              type="search"
              placeholder="Search blog..."
              class="input input-bordered w-full"
              v-model="query"
              @keydown.enter="search()"
            />
            <button
              :disabled="query.length < 3"
              class="btn btn-square"
              @click="search()"
            >
              <PhMagnifyingGlass :size="32" weight="duotone" />
            </button>
          </label>
        </div>
      </label>
    </label>
  </div>
</template>

<script setup>
import { PhMagnifyingGlass } from "phosphor-vue";

const query = ref("");

const router = useRouter();

const search = async () => {
  await router.push(`/search?q=${query.value}`);
};
</script>
