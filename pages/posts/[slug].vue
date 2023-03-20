<template>
  <div>
    <figure>
      <NuxtPicture
        :imgAttrs="{
          class: 'aspect-video w-full object-cover max-h-sm',
        }"
        placeholder="/images/loader.gif"
        loading="lazy"
        :srcset="srcset(data.post.featured_image.srcset)"
        :src="data.post.featured_image.url"
      />
    </figure>
    <div class="p-4 space-y-8 max-w-2xl mx-auto">
      <div class="space-y-8">
        <div class="space-y-4">
          <h1 class="text-3xl font-bold md:tracking-tight md:text-4xl prose">
            {{ data.post.title }}
          </h1>

          <div
            class="flex text-sm flex-col items-start justify-between w-full md:flex-row md:items-center"
          >
            <div class="flex items-center md:space-x-2">
              <div class="inline-flex items-center gap-2">
                <span class="inline-flex gap-1 items-center capitalize">
                  <PhUser :size="16" weight="duotone" />
                  {{ data.post.author.firstname }}
                  {{ data.post.author.lastname }}
                </span>
                <span> • </span>
                <span class="inline-flex gap-1 items-center">
                  <PhCalendarBlank :size="16" weight="duotone" />
                  {{ formatDate(data.post.createdAt) }}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0 mt-3 md:mt-0">
              <p class="flex gap-1 items-center">
                <PhClock :size="16" weight="duotone" />
                {{ minRead(data.post.content) }}
              </p>
            </div>
          </div>
        </div>
        <div class="prose prose-xl">
          <div
            v-html="md.render(data.post.content, { html: true })"
            class="first-line:uppercase first-line:tracking-wider first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left prose prose-lg font-body prose-em:font-light prose-strong:font-bold prose-img:rounded-lg prose-img:mx-auto"
          ></div>
        </div>
      </div>

      <template v-if="data.post.tags">
        <div class="flex justify-center gap-4 flex-wrap">
          <div v-for="tag in data.post.tags" class="badge badge-outline">
            #{{ tag.name }}
          </div>
        </div>
      </template>

      <div class="divider" />

      <SharePost :post="data.post" />

      <div class="p-4 bg-base-200 shadow-md border border-zinc-700 rounded-md">
        <div class="flex gap-4">
          <NuxtImg
            :src="data.post.author.profile_picture.url"
            alt="Image of author"
            class="self-start flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
          />
          <div class="flex flex-col">
            <h4 class="text-lg font-semibold capitalize pb-2">
              {{ data.post.author.firstname }} {{ data.post.author.lastname }}
            </h4>
            <p class="text-sm">
              {{ data.post.author.bio }}
            </p>
          </div>
        </div>
        <div
          v-if="data.post.author.admin"
          class="flex justify-center pt-4 space-x-4 align-center"
        >
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
        <Disqus class="py-8" :shortname="config.DISQUS_SHORT_NAME" />
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
  PhClock,
  PhUser,
  PhCalendarBlank,
} from "phosphor-vue";
import MarkdownIt from "markdown-it";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";

const route = useRoute();
const config = useRuntimeConfig();

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

const md = new MarkdownIt().use(sub).use(sup);

const srcset = (srcset) => {
  return srcset.map((image) => `${image.secure_url} ${image.width}w`).join(",");
};
</script>
