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
      >
        <div class="space-y-6">
          <div class="flex justify-between items-center">
            <h2
              class="text-2xl uppercase font-semibold flex gap-2 items-center"
            >
              <PhPen :size="32" weight="duotone" />
              Create Post
            </h2>

            <Button
              type="submit"
              class="btn-primary"
              :disabled="loading"
              :loading="loading"
            >
              <template #icon>
                <PhCheck :size="18" weight="duotone" />
              </template>
              Publish
            </Button>
          </div>

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

            <template if="fileUrl" #fileName>
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
          <Tags />

          <!-- tags -->
        </div>
      </FormKit>

      <!-- /tags -->
    </div>

    <!-- confirm tag deletion modal -->

    <!-- confirm tag deletion modal -->
  </section>
</template>

<script setup>
import { PhArticle, PhTextT, PhImage, PhCheck, PhPen, PhX } from "phosphor-vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { reset, setErrors } from "@formkit/core";
import * as pkg from "vue-toastification";
const { useToast } = pkg;

const fields = ref({
  title: "",
  content: "",
  featured_image: {},
  tags: [],
});

const fileUrl = ref("");
const loading = ref(false);
const toast = useToast();

watchEffect(async () => {
  const file = fields.value.featured_image[0]?.file;

  if (file) {
    fileUrl.value = URL.createObjectURL(file);
  }
});

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

    reset("new-post-form");
    loading.value = false;
    toast.success("Success!");
  } catch (error) {
    const message = error.message;

    if (message.includes("title_1 dup key")) {
      const message = "A post with the same title already exist";
      setErrors("new-post-form", message);
      toast.error(message);
    } else {
      setErrors("new-post-form", error.message);
      toast.error(error.message);
    }
    loading.value = false;
  }
};
</script>
