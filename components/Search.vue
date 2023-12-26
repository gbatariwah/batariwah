<template>
<div>
  <Button
    v-if="route.name !== 'search' && !user"
    class="btn-ghost btn-circle"
    title="Search"
    @click="openModal()"
  >
    <template #icon>
      <i class="ph-duotone ph-magnifying-glass text-[32px]"></i>
    </template>
  </Button>

  <!-- Put this part before </body> tag -->
  <Teleport to="body">
    <!-- <input type="checkbox" id="search-modal" class="modal-toggle" /> -->
    <dialog

      id="search_modal"
      class="modal items-start cursor-pointer"
    >
      <div class="modal-box mt-20 md:max-w-xl rounded-none">
        <div class="form-control p-6">
          <div class="join">
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
                <i class="ph-duotone ph-magnifying-glass text-[32px]"></i>
              </template>
            </Button>
          </div>
        </div>
        <form method="dialog" >
          <Button class="btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <template #icon>
              <i class="ph-duotone ph-x-circle text-[32px]"></i>
            </template>
          </Button>
        </form>
      </div>
    </dialog>
  </Teleport>
</div>
</template>

<script setup>
import { useFocus } from "@vueuse/core";

const query = ref("");
const searchInput = ref();
const { focused } = useFocus(searchInput);

const router = useRouter();
const { user } = useAuth();
const route = useRoute();

const search = async () => {

  await router.push(`/search?q=${query.value}`);
  setTimeout(() => (focused.value = false), 50);
  setTimeout(() => document.querySelector('#search_modal').close(), 50);
};

const openModal = () => {
  document.querySelector('#search_modal').showModal()
  setTimeout(() => (focused.value = true), 50);
};


</script>
