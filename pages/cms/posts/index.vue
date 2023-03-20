<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 gap-2 flex">
      <PhEraser :size="32" weight="duotone" />
      Manage Posts
    </h2>
    <div class="grid sm:grid-cols-2 gap-6">
      <!-- postcardAlt -->
      <template v-if="pending">
        <PostAltSkeleton v-for="s in 6" />
      </template>
      <template v-else>
        <PostCardAlt
          @confirm-post-deletion="setSlug"
          v-for="post in data.posts"
          :key="post"
          :post="post"
        />
      </template>
      <!-- postcardAlt -->
    </div>

    <!-- pagination -->
    <div class="py-4 flex gap-4 justify-end items-center">
      <p>
        Page
        <span class="font-semibold">{{ data.currentPage }}</span>
        of
        <span class="font-semibold">{{ data.totalPages }}</span>
      </p>
      <div class="btn-group">
        <Button
          :disabled="page <= 1"
          class="btn-primary btn-sm"
          @click="previousPage()"
          :loading="direction === 'previous' && pending"
          ><template #icon>
            <PhCaretLeft :size="18" weight="duotone" />
          </template>
          previous
        </Button>
        <Button
          :disabled="page >= data.totalPages"
          class="btn-primary btn-sm"
          @click="nextPage()"
          :loading="direction === 'next' && pending"
        >
          next
          <template #suffix-icon>
            <PhCaretRight :size="18" weight="duotone" />
          </template>
        </Button>
      </div>
    </div>

    <!-- /pagination -->

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
import {
  PhEraser,
  PhCaretLeft,
  PhCaretRight,
  PhX,
  PhTrashSimple,
  PhWarningCircle,
} from "phosphor-vue";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const page = ref(route.query.page || 1);
const direction = ref("next");

const deletingPost = ref(false);
const openPostDeletionModal = ref(false);
const slug = ref("");

const setSlug = (postSlug) => {
  openPostDeletionModal.value = true;
  slug.value = postSlug;
};

const { data, pending, refresh } = await useAsyncData(
  "use_posts",
  () =>
    $fetch(`/api/posts/user?page=${page.value}`, {
      headers: useRequestHeaders(["cookie"]),
    }),
  { watch: [page] }
);

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
    refresh();
  } catch (error) {
    deletingPost.value = false;
    toast.error("Post not deleted, please try again.");
  }
};

const previousPage = () => {
  page.value--;
  router.push(`/cms/posts?page=${page.value}`);
  direction.value = "previous";
  refresh();
};

const nextPage = async () => {
  page.value++;
  router.push(`/cms/posts?page=${page.value}`);
  direction.value = "next";
  await refresh();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
</script>
