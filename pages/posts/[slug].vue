<template>
  <div>
    <figure>
      <NuxtPicture
        :imgAttrs="{
          class: 'aspect-video w-full object-cover max-h-sm',
        }"
        placeholder="/images/loader.gif"
        loading="lazy"
        :srcset="post.srcset"
        :src="post.image"
      />
    </figure>
    <div class="p-4 space-y-8 max-w-2xl mx-auto">
      <div class="space-y-8">
        <div class="space-y-4">
          <h1 class="text-3xl font-bold md:tracking-tight md:text-4xl prose">
            {{ post.title }}
          </h1>

          <div
            class="flex text-sm flex-col items-start justify-between w-full md:flex-row md:items-center"
          >
            <div class="flex items-center md:space-x-2">
              <div class="inline-flex items-center gap-2">
                <span class="inline-flex gap-1 items-center capitalize">
                  <PhUser :size="16" weight="duotone" />
                  {{ post.author }}
                </span>
                <span> • </span>
                <span class="inline-flex gap-1 items-center">
                  <PhCalendarBlank :size="16" weight="duotone" />
                  {{ post.formatedCreatedAt }}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0 mt-3 md:mt-0">
              <p class="flex gap-1 items-center">
                <PhClock :size="16" weight="duotone" />
                {{ post.minRead() }}
              </p>
            </div>
          </div>
        </div>
        <div class="prose prose-xl">
          <div
            v-html="post.content"
            class="first-line:uppercase first-line:tracking-wider first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left prose prose-lg font-body prose-em:font-light prose-strong:font-bold prose-img:rounded-lg prose-img:mx-auto"
          ></div>
        </div>
      </div>

      <template v-if="post.tags">
        <div class="flex justify-center gap-4 flex-wrap">
          <div v-for="tag in post.tags" class="badge badge-outline">
            #{{ tag.name }}
          </div>
        </div>
      </template>

      <div class="divider" />

      <SharePost :post="post" />

      <div class="p-4 bg-base-200 shadow-md border border-zinc-700 rounded-md">
        <div class="flex gap-4">
          <NuxtImg
            :src="data.post.author.profile_picture.url"
            alt="Image of author"
            class="self-start flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
          />
          <div class="flex flex-col">
            <h4 class="text-lg font-semibold capitalize pb-2">
              {{ post.author }}
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

const md = new MarkdownIt().use(sub).use(sup);

const route = useRoute();
const config = useRuntimeConfig();

const { data, pending } = await useAsyncData("post", () =>
  $fetch(`/api/posts/${route.params.slug}`)
);

const post = computed(() => ({
  title: data.value.post.title,
  content: md.render(data.value.post.content, { html: true }),
  description: md
    .render(data.value.post.content, { html: true })
    .replace(/(<([^>]+)>)/gi, "")
    .slice(0, 360),
  image: data.value.post.featured_image.url,
  author: `${data.value.post.author.firstname} ${data.value.post.author.lastname}`,
  slug: data.value.post.slug,
  tags: data.value.post.tags,
  createdAt: data.value.post.createdAt,
  updatedAt: data.value.post.updatedAt,
  formatedCreatedAt: new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(data.value.post.createdAt)),
  minRead: () => {
    const words_per_minute = 300;
    const no_of_words = data.value.post.content.split(/\s/g).length;
    const minutes = no_of_words / words_per_minute;
    return `${Math.ceil(minutes)} min read`;
  },
  srcset: () =>
    data.value.featured_image.srcset
      .map((image) => `${image.secure_url} ${image.width}w`)
      .join(","),
}));

useSeoMeta({
  title: post.value.title,
  titleTemplate: "%s | Batariwah",
  ogTitle: post.value.title,
  description: post.value.description,
  ogDescription: post.value.description,
  ogImage: post.value.image,
  ogType: "article",
  ogSiteName: "Batariwah",
  ogUrl: `${config.BASE_URL}/posts/${post.value.slug}`,
  twitterCard: "summary_large_image",
  twitterTitle: post.value.title,
  twitterDescription: post.value.description,
  twitterImage: post.value.image,
  publisher: post.value.author,
  articlePublished_time: post.value.createdAt,
  articleModified_time: post.value.updatedAt,
  twitterLabel1: "Written by",
  twitterData1: post.value.author,
  twitterLabel2: "Filed under",
  twitterUrl: `${config.BASE_URL}/posts/${post.value.slug}`,
});
</script>
