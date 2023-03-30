<template>
  <Button
    v-if="route.name !== 'search' && !user"
    class="btn-ghost btn-circle"
    title="Search"
    @click.="openModal()"
  >
    <template #icon>
      <PhMagnifyingGlass :size="32" weight="duotone" />
    </template>
  </Button>

  <!-- Put this part before </body> tag -->
  <Teleport to="body">
    <!-- <input type="checkbox" id="search-modal" class="modal-toggle" /> -->
    <div
      class="modal modal-bottom items-start cursor-pointer"
      :class="{ 'modal-open': modalOpen }"
      @click.self="closeModal()"
    >
      <div class="modal-box relative md:max-w-xl md:rounded-b-xl">
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
            <Button
              :disabled="query.length < 3"
              class="btn-square"
              @click="search()"
            >
              <template #icon>
                <PhMagnifyingGlass :size="32" weight="duotone" />
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { PhMagnifyingGlass } from "phosphor-vue";
import { useFocus } from "@vueuse/core";

const query = ref("");
const searchInput = ref();
const modalOpen = ref(false);
const { focused } = useFocus(searchInput);

const router = useRouter();
const { user } = useAuth();
const route = useRoute();

const search = async () => {
  modalOpen.value = false;
  await router.push(`/search?q=${query.value}`);
};

const openModal = () => {
  modalOpen.value = true;
  setTimeout(() => (focused.value = true), 50);
};

const closeModal = () => {
  modalOpen.value = false;
  setTimeout(() => (focused.value = false), 50);
};
</script>
