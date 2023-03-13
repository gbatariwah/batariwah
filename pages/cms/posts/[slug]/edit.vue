<template>
  <section>
    <div>
      <FormKit
        type="form"
        id="edit-post-form"
        method="post"
        @submit.="updatePost"
        :actions="false"
        v-model="fields"
        :config="{
          classes: {
            message: 'text-error text-sm py-2 font-thin',
          },
        }"
        #default="{ value }"
      >
        <div class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold flex gap-2 items-center">
              <PhEraser :size="32" weight="duotone" />
              Edit Post
            </h2>

            <Button
              type="submit"
              class="btn-primary"
              :disabled="loading || !fieldsChanged"
              :loading="loading"
            >
              <template #icon>
                <PhCheck :size="18" weight="duotone" />
              </template>
              Publish
            </Button>
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
            :validation-messages="{
              required: 'Please select and image.',
            }"
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

            <template v-if="!value.featured_image[0] && fileUrl" #noFiles>
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
        </div>
      </FormKit>

      <!-- /tags -->
    </div>

    <!-- confirm tag deletion modal -->

    <!-- confirm tag deletion modal -->
  </section>
</template>

<script setup>
import {
  PhArticle,
  PhTextT,
  PhImage,
  PhCheck,
  PhX,
  PhEraser,
} from "phosphor-vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { reset, setErrors } from "@formkit/core";
import { FormKitMessages } from "@formkit/vue";
import { useToast } from "vue-toastification";

const fields = ref({
  title: "",
  content: "",
  featured_image: [],
  tags: [],
});

const theSameTags = (tagsA, tagsB) =>
  tagsA.reduce((_, tag) => {
    return `${tag?._id}`;
  }, "") !==
  tagsB.reduce((_, tag) => {
    return `${tag}`;
  }, "");

const oldValues = ref({});

const fieldsChanged = computed(() => {
  return (
    fields.value.title !== oldValues.value.title ||
    fields.value.content != oldValues.value.content ||
    theSameTags(oldValues.value.tags, fields.value.tags) ||
    fields.value.featured_image.length >= 1
  );
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const fileUrl = ref("");
const loading = ref(false);

onMounted(async () => {
  const res = await $fetch(`/api/posts/${route.params.slug}`);

  const {
    title,
    content,
    tags,
    featured_image: { url },
  } = res.post;

  const formatedTags = tags.map((t) => t._id);

  reset("edit-post-form", {
    ...fields.value,
    title,
    content,
    tags: formatedTags,
  });

  oldValues.value = { title, content, tags };

  fileUrl.value = url;
});

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

const updatePost = async ({ title, content, featured_image, tags }) => {
  loading.value = true;

  const formData = new FormData();

  if (title !== oldValues.value.title) {
    formData.append("title", title);
  }

  if (content !== oldValues.value.content) {
    formData.append("content", content);
  }

  const tagsChanged = theSameTags(oldValues.value.tags, tags);

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
    toast.success("Success!");
    router.back();
  } catch (error) {
    const message = error.message;
    loading.value = false;
    toast.error("Post not update, Please try again");

    setErrors("edit-post-form", message);
  }
};
</script>
