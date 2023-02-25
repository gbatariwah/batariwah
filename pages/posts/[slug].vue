<template>
  <div class="py-10">
    <figure class="mb-6">
      <nuxt-img
        :src="data.post.featured_image.url"
        class="w-full object-cover max-h-sm"
      />
    </figure>
    <div class="space-y-12 max-w-2xl mx-auto">
      <div class="space-y-8">
        <div class="space-y-6">
          <h1 class="text-3xl font-bold md:tracking-tight md:text-4xl prose">
            {{ data.post.title }}
          </h1>
          <div
            class="flex flex-col items-start justify-between w-full md:flex-row md:items-center"
          >
            <p class="text-sm capitalize">
              {{ data.post.author.firstname }} {{ data.post.author.lastname }} •
              {{ formatDate(data.post.createdAt) }}
            </p>
            <p class="flex-shrink-0 mt-3 text-sm md:mt-0">
              {{ minRead(data.post.content) }}
            </p>
          </div>
        </div>
        <div class="prose prose-xl pt-2">
          <div
            class="first-letter:text-5xl first-letter:font-semibold prose-lg"
          >
            {{ data.post.content }}
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-4 flex-wrap">
        <div class="badge badge-outline badge-success">#MambaUI</div>
        <div class="badge badge-outline badge-primary">#TailwindCSS</div>
        <div class="badge badge-outline badge-error">#Angular</div>
      </div>

      <div class="divider" />

      <!-- <div class="space-y-4 card">
        <h4 class="font-bold tracking-wider uppercase text-xl">
            Author
          </h4>

        <div class="flex gap-4">
          <el-avatar
            :size="64"
            src="https://source.unsplash.com/75x75/?portrait"
            class="md:justify-self-start flex-shrink-0"
          />
          <div class="prose font-thin">
            <h4 class="tracking-wider uppercase">
              {{ post.author.firstname }} {{ post.author.lastname }}
            </h4>
            <p class="text-sm">
              Sed non nibh iaculis, posuere diam vitae, consectetur neque.
              Integer velit ligula, semper sed nisl in, cursus commodo elit.
              Pellentesque sit amet mi luctus ligula euismod lobortis ultricies
              et nibh.
            </p>
          </div>
        </div>
      </div> -->

      <div class="py-4">
        <div class="flex gap-4">
          <img
            src="https://source.unsplash.com/75x75/?portrait"
            alt=""
            class="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
          />
          <div class="flex flex-col">
            <h4 class="text-lg font-semibold">Leroy Jenkins</h4>
            <p>
              Sed non nibh iaculis, posuere diam vitae, consectetur neque.
              Integer velit ligula, semper sed nisl in, cursus commodo elit.
              Pellentesque sit amet mi luctus ligula euismod lobortis ultricies
              et nibh.
            </p>
          </div>
        </div>
        <div class="flex justify-center pt-4 space-x-4 align-center">
          <button class="btn btn-sm btn-circle btn-ghost">
            <PhFacebookLogo :size="24" weight="duotone" />
          </button>
          <button class="btn btn-sm btn-circle btn-ghost">
            <PhTwitterLogo :size="24" weight="duotone" />
          </button>
          <button class="btn btn-sm btn-circle btn-ghost">
            <PhInstagramLogo :size="24" weight="duotone" />
          </button>
        </div>
      </div>

      <ClientOnly>
        <Disqus shortname="gblog-5" />
      </ClientOnly>

      <div class="space-y-2">
        <h4 class="text-lg font-semibold pb-2 flex items-center gap-2">
          <PhArticle :size="20" weight="duotone" />
          Suggested posts
        </h4>
        <div class="grid sm:grid-cols-2 gap-6">
          <PostCard
            v-for="suggestedPost in data.suggestedPosts"
            :key="suggestedPost.slug"
            :post="suggestedPost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disqus } from "vue-disqus";
import {
  PhFacebookLogo,
  PhTwitterLogo,
  PhInstagramLogo,
  PhArticle,
} from "phosphor-vue";

const route = useRoute();
const tags = ["#mambaui", "#tailwindcss", "#vuejs"];

const { data, pending } = await useAsyncData("post", () =>
  $fetch(`/api/posts/${route.params.slug}`)
);

const minRead = (content) => {
  const words_per_minute = 300;
  const no_of_words = content.split(/\s/g).length;
  const minutes = no_of_words / words_per_minute;
  return `${Math.ceil(minutes)} min read`;
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};
</script>

<style scoped></style>
