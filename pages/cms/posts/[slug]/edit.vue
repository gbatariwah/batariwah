<template>
  <section>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">Create New Post</h2>
        <button class="btn btn-primary hover:bg-primary-focus gap-2">
          <PhArticle :size="18" weight="duotone" />
          Publish
        </button>
      </div>

      <div class="space-y-6">
        <!-- title -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-lg items-center flex gap-2">
              <PhTextT :size="20" weight="duotone" />
              Title</span
            >
          </label>
          <input
            type="text"
            v-model="data.post.title"
            class="input input-bordered w-full"
          />
        </div>

        <!-- /title -->

        <!-- featured image -->

        <div>
          <label class="label">
            <span class="label-text text-lg items-center flex gap-2">
              <PhImage :size="20" weight="duotone" />
              Featured Image</span
            >
          </label>

          <div class="space-y-1">
            <NuxtImg
              :src="data.post.featured_image.url"
              class="aspect-video w-full object-cover mb-2 hover:ring-1"
              alt="Featured Image"
            />
            <div class="text-right">
              <label class="btn btn-primary gap-2 hover:bg-primary-focus">
                <input type="file" hidden />
                <PhUpload :size="18" weight="duotone" />
                Upload Image
              </label>
            </div>
          </div>
        </div>

        <!-- /featured image -->

        <!-- editor -->
        <div id="editor">
          <label class="label">
            <span class="label-text text-lg items-center flex gap-2">
              <PhArticle :size="20" weight="duotone" />
              Content</span
            >
          </label>
          <client-only>
            <md-editor
              :preview="false"
              language="en-US"
              v-model="data.post.content"
            />
          </client-only>
        </div>

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
            <div class="form-control">
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Add tag"
                  class="input input-bordered"
                  v-model="newTag"
                />
                <button
                  class="btn btn-square"
                  @click="addTag()"
                  :disabled="newTag.length < 3"
                >
                  <PhPlusCircle :size="32" weight="duotone" />
                </button>
              </div>
            </div>
            <div class="overflow-auto space-y-4 max-h-64 tags">
              <!-- tag -->
              <div
                v-for="tag in tags"
                :key="tag"
                class="flex items-center gap-2"
              >
                <input type="checkbox" class="checkbox" />
                <span class="capitalize">{{ tag }}</span>
              </div>

              <!-- /tag -->
            </div>
          </div>
        </div>

        <!-- /tags -->
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  PhArticle,
  PhTag,
  PhTextT,
  PhUpload,
  PhImage,
  PhPlusCircle,
} from "phosphor-vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const route = useRoute();

const newTag = ref("");

const tags = ref(["justice", "law", "religion", "school", "social media"]);

const addTag = () => {
  tags.value.push(newTag.value);
  newTag.value = "";
};

const { data, pending, error, refresh } = await useFetch(
  `/api/posts/${route.params.slug}`
);
</script>

<style scoped>
.tags::-webkit-scrollbar {
  display: none;
}
</style>
