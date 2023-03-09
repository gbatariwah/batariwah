<template>
  <div>
    <!-- tags -->
    <div>
      <label class="label">
        <span class="label-text text-lg items-center flex gap-2">
          <PhTag :size="20" weight="duotone" />
          Tags</span
        >
      </label>
      <div class="space-y-6">
        <CreateTag @tag-created="refresh()" />
        <div class="overflow-auto space-y-4 max-h-64 tags">
          <!-- tag -->

          <FormKit
            :classes="{
              input: 'checkbox',
              wrapper: 'inline-flex gap-4 py-1',
            }"
            name="tags"
            type="checkbox"
            :options="tags"
          >
            <template #label="{ option }">
              <div class="badge badge-outline badge-lg gap-2 pr-0">
                <span class="capitalize cursor-pointer">
                  {{ option.label }}</span
                >

                <label
                  class="btn btn-square btn-xs"
                  :class="{ 'btn-circle btn-ghost': isDark }"
                  @click="setTagId(option.value)"
                >
                  <PhX :size="18" weight="duotone" />
                </label>
              </div>
            </template>
          </FormKit>

          <!-- /tag -->
        </div>
      </div>
    </div>
    <!-- tags -->

    <!-- confirm tag deletion modal -->

    <Teleport to="body">
      <input type="checkbox" id="delete-tag" class="modal-toggle" />
      <div class="modal" :class="{ 'modal-open': openTagDeletionModal }">
        <div class="modal-box relative">
          <button
            @click="openTagDeletionModal = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <PhX :size="20" weight="duotone" />
          </button>

          <div class="flex gap-4">
            <PhWarningCircle :size="32" class="text-warning" weight="duotone" />
            <div>
              <h3 class="text-lg font-semibold">Delete tag</h3>
              <p class="py-4">Are you sure you want to delete this tag?</p>
            </div>
          </div>
          <div class="modal-action">
            <button
              @click="deleteTag()"
              for="my-modal"
              class="btn gap-2 btn-error"
              :loading="deletingTag"
            >
              <PhTrashSimple v-if="!deletingTag" :size="18" weight="duotone" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    <!-- confirm tag deletion modal -->
  </div>
</template>

<script setup>
import { PhTag, PhX, PhWarningCircle, PhTrashSimple } from "phosphor-vue";

const { isDark } = useTheme();

const tagId = ref("");
const openTagDeletionModal = ref(false);
const deletingTag = ref(false);

const setTagId = (id) => {
  tagId.value = id;
  openTagDeletionModal.value = true;
};

const { data: tags, refresh } = await useAsyncData(
  "tags",
  () =>
    $fetch("/api/tags", {
      headers: useRequestHeaders(["cookie"]),
    }),
  {
    transform: (d) =>
      d.tags.map((tag) => ({ value: tag._id, label: tag.name })),
  }
);

const deleteTag = async () => {
  try {
    deletingTag.value = true;
    await $fetch(`/api/tags/${tagId.value}`, {
      method: "DELETE",
      headers: useRequestHeaders(["cookie"]),
    });
    deletingTag.value = false;
    tagId.value = "";
    openTagDeletionModal.value = false;
    refresh();
  } catch (error) {
    deletingTag.value = false;
  }
};
</script>

<style scoped>
.tags::-webkit-scrollbar {
  display: none;
}
</style>
