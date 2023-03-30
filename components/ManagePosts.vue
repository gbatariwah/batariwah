<template>
  <div>
    <!-- posts -->
    <div class="grid sm:grid-cols-2 gap-6">
      <PostCardAlt
        @confirm-post-deletion="setSlug"
        v-for="post in posts"
        :key="post.slug"
        :post="post"
      />
    </div>

    <!-- posts -->
    <!-- delete post modal -->
    <Teleport to="body">
      <input type="checkbox" id="delete-tag" class="modal-toggle" />
      <div class="modal" :class="{ 'modal-open': openPostDeletionModal }">
        <div class="modal-box relative">
          <button
            @click="openPostDeletionModal = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <PhX :size="20" weight="duotone" />
          </button>

          <div class="flex gap-4">
            <PhWarningCircle :size="64" class="text-warning" weight="duotone" />
            <div>
              <h3 class="text-lg font-semibold">Delete Post</h3>
              <p class="py-4">Are you sure you want to delete this post?</p>
            </div>
          </div>
          <div class="modal-action">
            <Button
              @click="deletePost()"
              class="btn gap-2 btn-error"
              :loading="deletingPost"
            >
              <template #icon>
                <PhTrashSimple :size="18" weight="duotone" />
              </template>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Teleport>
    <!-- delete post modal -->
  </div>
</template>

<script setup>
import { PhX, PhTrashSimple, PhWarningCircle } from "phosphor-vue";
import { useToast } from "vue-toastification";

const props = defineProps({
  posts: Object,
  refresh: Function,
});

const toast = useToast();
const deletingPost = ref(false);
const openPostDeletionModal = ref(false);
const slug = ref("");

const setSlug = (postSlug) => {
  openPostDeletionModal.value = true;
  slug.value = postSlug;
};

const deletePost = async () => {
  try {
    deletingPost.value = true;
    await $fetch(`/api/posts/${slug.value}`, {
      method: "DELETE",
      headers: useRequestHeaders(["cookie"]),
    });

    slug.value = "";
    openPostDeletionModal.value = false;
    deletingPost.value = false;
    toast.success("Success!");
    props.refresh();
  } catch (error) {
    deletingPost.value = false;
    toast.error("Post not deleted, please try again.");
  }
};
</script>
