<template>
  <section>
    <div>
      <FormKit
        type="form"
        id="new-post-form"
        method="post"
        @submit="publish"
        :actions="false"
        v-model="fields"
        :config="{
          classes: {
            message: 'text-error text-sm py-2 font-thin',
          },
        }"
        #default="{ error }"
      >
        <div class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold flex gap-2 items-center">
              <PhPen :size="32" weight="duotone" />
              Create New Post
            </h2>

            <button
              type="submit"
              class="btn btn-primary hover:bg-primary-focus gap-2"
              :disabled="loading"
              :class="{ loading: loading }"
            >
              <PhCheck v-if="!loading" :size="18" weight="duotone" />
              Publish
            </button>
          </div>

          <FormKitMessages />

          <!-- title -->

          <FormKit
            type="text"
            name="title"
            validation="required"
            :classes="{
              input: 'input input-bordered w-full',
            }"
          >
            <template #label>
              <label class="label items-center gap-2">
                <span class="label-text text-lg items-center flex gap-2">
                  <PhTextT :size="22" weight="duotone" />
                  Title
                </span>
              </label>
            </template>
          </FormKit>

          <!-- /title -->

          <!-- featured image -->

          <FormKit
            type="file"
            name="featured_image"
            accept=".jpeg,.jpg"
            :classes="{
              input:
                'file-input w-full block file-input-bordered file-input-md',
            }"
            validation="required"
            :validation-messages="{
              required: 'Please select and image.',
            }"
            noFiles-class="hidden"
            fileItem-class="relative"
            fileRemove-class="absolute right-2 top-2 text-transparent w-8"
          >
            <template #label>
              <label class="label">
                <span class="label-text text-lg items-center flex gap-2">
                  <PhImage :size="22" weight="duotone" />
                  Featured Image</span
                >
              </label>
            </template>

            <template v-if="fileUrl" #fileName>
              <NuxtImg
                class="aspect-video object-cover w-full"
                :src="fileUrl"
              />
            </template>

            <template #fileRemoveIcon>
              <span class="btn btn-circle btn-sm opacity-70 hover:opacity-100">
                <PhX :size="18" weight="duotone" />
              </span>
            </template>
          </FormKit>

          <!-- /featured image -->

          <!-- editor -->

          <FormKit
            name="content"
            validation="required"
            v-model="fields.content"
            preserve
            :validation-messages="{
              required: 'Please add some content to your post',
            }"
          >
            <template #label>
              <label class="label">
                <span class="label-text text-lg items-center flex gap-2">
                  <PhArticle :size="22" weight="duotone" />
                  Content</span
                >
              </label>
            </template>
            <template #input>
              <client-only>
                <md-editor
                  :preview="false"
                  language="en-US"
                  v-model="fields.content"
                />
              </client-only>
            </template>
          </FormKit>

          <!-- /editor -->

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
        </div>
      </FormKit>

      <!-- /tags -->
    </div>

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
  </section>
</template>

<script setup>
import {
  PhArticle,
  PhTag,
  PhTextT,
  PhImage,
  PhCheck,
  PhPen,
  PhX,
  PhWarningCircle,
  PhTrashSimple,
} from "phosphor-vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { reset, setErrors } from "@formkit/core";
import { FormKitMessages } from "@formkit/vue";

const fields = ref({
  title: "",
  content: "",
  featured_image: {},
  tags: [],
});

const { isDark } = useTheme();

const fileUrl = ref("");
const loading = ref(false);
const tagId = ref("");
const openTagDeletionModal = ref(false);
const deletingTag = ref(false);

const setTagId = (id) => {
  tagId.value = id;
  openTagDeletionModal.value = true;
};

watch(
  () => fields.value.featured_image,
  (value) => {
    const file = value[0]?.file;

    if (file) {
      fileUrl.value = URL.createObjectURL(file);
    }
  },
  { deep: true }
);

const publish = async ({ title, content, featured_image, tags }) => {
  loading.value = true;
  const file = featured_image[0].file;
  const formData = new FormData();

  formData.append("title", title);

  formData.append("content", content);

  formData.append("featured_image", file);

  if (tags) {
    formData.append("tags", tags);
  }

  try {
    await $fetch("/api/posts", {
      method: "POST",
      body: formData,
      headers: useRequestHeaders(["cookie"]),
    });

    reset();
    loading.value = false;
  } catch (error) {
    const message = error.message;

    if (message.includes("title_1 dup key")) {
      setErrors("new-post-form", "A post with the same title already exist");
    } else {
      setErrors("new-post-form", error.message);
    }
    loading.value = false;
  }
};

const {
  data: tags,
  pending,
  refresh,
} = await useAsyncData(
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
