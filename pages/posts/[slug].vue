<template>
  <div>
    <div v-if="pending">
      <Loader />
    </div>
    <div v-else>
      <VLazyImage
        sizes="(max-width: 1400px) 100vw, 1400px"
        :use-picture="true"
        :src="post.image"
        :srcset="post.srcset()"
        :alt="post.title"
        src-placeholder="/images/loader.gif"
        :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
        class="aspect-video w-full object-cover max-h-sm md:px-4 md:h-[450px]"
      />

      <div class="p-4 space-y-8 max-w-2xl mx-auto">
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-3xl font-bold  md:text-4xl prose font-['oswald'] tracking-wide">
              {{ post.title }}
            </h1>

            <div
              class="flex text-sm flex-col items-start justify-between w-full md:flex-row md:items-center"
            >
              <div class="flex items-center md:space-x-2">
                <div class="inline-flex items-center gap-1">
                  <span class="inline-flex gap-1 items-center capitalize">
                    <i class="ph-duotone ph-user text-[16px]"></i>
                    {{ post.author }}
                  </span>
                  <i class="ph-duotone ph-dot-outline text-[24px]"></i>
                  <span class="inline-flex gap-1 items-center">
                    <i class="ph-duotone ph-calendar-blank text-[16px]"></i>
                    {{ post.formatedCreatedAt }}
                  </span>
                </div>
              </div>
              <div class="flex-shrink-0 mt-3 md:mt-0">
                <p class="flex gap-1 items-center">
                  <i class="ph-duotone ph-clock text-[16px]"></i>
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

        <div
          class="p-4 bg-base-200 border card rounded-none"
        >
          <div class="flex gap-4">
            <VLazyImage
              :src="data.post.author.profile_picture.url"
              :alt="post.author"
              :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
              src-placeholder="/images/loader.gif"
              class="self-start flex-shrink-0 w-24 h-24 border object-cover rounded-full md:justify-self-start"
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
            <NuxtLink
              to="https://facebook.com/batariwahp"
              class="btn-sm btn-circle btn-ghost flex justify-center items-center"
              target="_blank"
            >
              <i class="ph-duotone ph-facebook-logo text-[24px]"></i>
            </NuxtLink>
            <NuxtLink
              to="https://twitter.com/pbatariwah"
              class="btn-sm btn-circle btn-ghost flex justify-center items-center"
              target="_blank"
            >
<!--              <i class="ph-duotone ph-twitter-logo text-[24px]"></i>-->
              <svg class="h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
            </NuxtLink>

            <NuxtLink
              to="https://www.instagram.com/p_batariwah"
              class="btn-sm btn-circle btn-ghost flex justify-center items-center"
              target="_blank"
            >
              <i class="ph-duotone ph-instagram-logo text-[24px]"></i>
            </NuxtLink>

            <NuxtLink
              to="mailto:batariwah@gmail.com"
              target="_blank"
              class="btn-sm btn-circle btn-ghost flex justify-center items-center"
            >
              <i class="ph-duotone ph-envelope-simple text-[24px]"></i>
            </NuxtLink>
          </div>
        </div>

        <ClientOnly>
          <Disqus class="py-8" :shortname="config.public.DISQUS_SHORT_NAME" />
        </ClientOnly>

        <div class="space-y-2">
          <h4 class="text-lg font-semibold pb-2 flex items-center gap-2">
            <i class="ph-duotone ph-article text-[20px]"></i>
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
  </div>
</template>

<script setup>
import { Disqus } from "vue-disqus";
import VLazyImage from "v-lazy-image";
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
    data.value.post.featured_image.srcset
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
  ogUrl: () => `${config.BASE_URL}/posts/${post.value.slug}`,
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
  twitterUrl: () => `${config.BASE_URL}/posts/${post.value.slug}`,
});
</script>


