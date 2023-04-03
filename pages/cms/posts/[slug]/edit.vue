<template>
  <div>
    <Loader v-if="pending" />
    <FormKit
      v-else
      type="form"
      id="edit-post-form"
      method="post"
      @submit.="updatePost"
      :actions="false"
      v-model="data"
      :config="{
        classes: {
          message: 'text-error text-sm py-2 font-thin',
        },
      }"
      #default="{ value }"
    >
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="uppercase text-2xl font-semibold flex gap-2 items-center">
            <i class="ph-duotone ph-eraser text-[32px]"></i>
            Edit Post
          </h2>

          <Button
            :disabled="loading || !fieldsChanged"
            type="submit"
            class="btn-primary"
            :loading="loading"
          >
            <template #icon>
              <i class="ph-duotone ph-check text-[18px]"></i>
            </template>
            Update
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
                <i class="ph-duotone ph-text-t text-[22px]"></i>
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
            input: 'file-input w-full block file-input-bordered file-input-md',
          }"
          :validation-messages="{
            required: 'Please select and image.',
          }"
          fileItem-class="relative"
          fileRemove-class="absolute right-2 top-2 text-transparent w-8"
        >
          <template #label>
            <label class="label">
              <span class="label-text text-lg items-center flex gap-2">
                <i class="ph-duotone ph-image text-[22px]"></i>
                Featured Image</span
              >
            </label>
          </template>
          <template #fileName>
            <VLazyImage
              v-if="newImageUrl"
              class="aspect-video object-cover w-full max-h-[400px]"
              :src="newImageUrl"
            />
          </template>

          <template #noFiles>
            <VLazyImage
              v-show="!imageChanged"
              class="aspect-video object-cover w-full max-h-[400px]"
              :src="value.featured_image_url"
              src-placeholder="/images/loader.gif"
            />
          </template>

          <template #fileRemoveIcon>
            <span class="btn btn-circle btn-sm opacity-70 hover:opacity-100">
              <i class="ph-duotone ph-x text-[18px]"></i>
            </span>
          </template>
        </FormKit>

        <!-- /featured image -->

        <!-- editor -->

        <FormKit
          name="content"
          validation="required"
          v-model="data.content"
          preserve
          :validation-messages="{
            required: 'Please add some content to your post',
          }"
        >
          <template #label>
            <label class="label">
              <span class="label-text text-lg items-center flex gap-2">
                <i class="ph-duotone ph-article text-[22px]"></i>
                Content</span
              >
            </label>
          </template>
          <template #input>
            <client-only>
              <md-editor
                :preview="false"
                language="en-US"
                v-model="data.content"
              />
            </client-only>
          </template>
        </FormKit>

        <!-- /editor -->

        <!-- tags -->
        <Tags />
        <!-- /tags -->
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { setErrors } from "@formkit/core";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const imageChanged = ref(false);
const newImageUrl = ref("");

const { data, pending } = await useFetch(`/api/posts/${route.params.slug}`, {
  transform: (res) => {
    const {
      title,
      content,
      tags,
      featured_image: { url },
    } = res.post;

    const formatedTags = tags.map((t) => t._id);

    return {
      title,
      content,
      tags: formatedTags,
      featured_image: [],
      featured_image_url: url,
      oldValues: { title, content, tags },
    };
  },
});

const theSameTags = (tagsA, tagsB) =>
  tagsA.reduce((_, tag) => {
    return `${tag?._id}`;
  }, "") !==
  tagsB.reduce((_, tag) => {
    return `${tag}`;
  }, "");

const fieldsChanged = computed(() => {
  return (
    data.value.title !== data.value.oldValues.title ||
    data.value.content != data.value.oldValues.content ||
    theSameTags(data.value.oldValues.tags, data.value.tags) ||
    data.value.featured_image.length >= 1
  );
});

watchEffect(async () => {
  const file = data.value.featured_image[0]?.file;

  if (file) {
    newImageUrl.value = URL.createObjectURL(file);
    imageChanged.value = true;
  } else {
    imageChanged.value = false;
  }
});

const updatePost = async ({
  title,
  content,
  featured_image,
  tags,
  oldValues,
}) => {
  loading.value = true;

  const formData = new FormData();

  if (title !== oldValues.title) {
    formData.append("title", title);
  }

  if (content !== oldValues.content) {
    formData.append("content", content);
  }

  const tagsChanged = theSameTags(oldValues.tags, tags);

  if (tagsChanged) {
    formData.append("tags", tags);
  }

  const file = featured_image[0]?.file;

  if (file) {
    formData.append("featured_image", file);
  }

  try {
    await $fetch(`/api/posts/${route.params.slug}`, {
      method: "PATCH",
      body: formData,
      headers: useRequestHeaders(["cookie"]),
    });

    loading.value = false;
    useNuxtApp().$toast.success("Success!");
    router.back();
  } catch (error) {
    const message = error.message;
    loading.value = false;
    useNuxtApp().$toast.error("Post not update, Please try again");

    setErrors("edit-post-form", message);
  }
};
</script>
