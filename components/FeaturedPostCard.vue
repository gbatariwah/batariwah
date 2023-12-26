<template>
  <div>
    <!--    <nuxt-link :to="`/posts/${featuredPost.slug}`"-->

    <!--      class="gap-3 mx-auto md:max-w-full group  dark:bg-gray-900 "-->
    <!--    >-->

    <!--      <div  class="block mx-auto md:grid md:grid-cols-12 animate__animated animate__zoomIn animate__faster">-->
    <!--       <figure class="sm:h-96 md:col-span-7 lg:col-span-8">-->
    <!--         <VLazyImage-->
    <!--           class="object-cover w-full h-64  group-hover:scale-105 transition-all duration-300 "-->
    <!--           :alt="featuredPost.title"-->
    <!--           :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"-->
    <!--           src-placeholder="/images/loader.gif"-->
    <!--           :src="imageUrl"-->
    <!--         />-->
    <!--       </figure>-->
    <!--&lt;!&ndash;        <nuxt-img placeholder="/images/loader.gif"  class="object-cover w-full h-64 sm:h-96 md:col-span-7 lg:col-span-8 group-hover:scale-105 transition-all duration-300 " :src="imageUrl"/>&ndash;&gt;-->
    <!--        <div class="p-6 space-y-2 lg:col-span-4 md:col-span-5 flex">-->
    <!--          <div class="p-4 bg-base-300 relative -mt-14 md:mt-0 md:-ml-16 border dark:border-zinc-700 group-hover:bg-base-200">-->
    <!--            <h2-->
    <!--              class="card-title text-xl sm:text-2xl font-['Oswald'] link link-hover tracking-wider"-->
    <!--            >-->
    <!--              {{ featuredPost.title }}-->
    <!--            </h2>-->
    <!--            <span class="text-sm italic mb-2">-->
    <!--          {{ datePublished }}-->
    <!--        </span>-->

    <!--            <p class="pb-4">{{ excerpt }}</p>-->

    <!--            <a-->
    <!--              class="link text-primary underline-offset-2 transition-all hover:underline-offset-4 decoration-4 "-->
    <!--            >Read more</a-->
    <!--            >-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </nuxt-link>-->

    <nuxt-link

      :to="`/posts/${featuredPost.slug}`"
      class="block gap-3 mx-auto group sm:max-w-full md:grid md:grid-cols-12 animate__animated animate__zoomIn animate__faster "
    >

      <figure class="lg:col-span-8 md:col-span-7 border card rounded-none border-zinc-700 overflow-hidden">
        <VLazyImage
          class="object-cover w-full  h-64 sm:h-full   group-hover:scale-105 transition-all duration-300 "
          :alt="featuredPost.title"
          :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
          src-placeholder="/images/loader.gif"
          :src="imageUrl"
        />
      </figure>
      <div class="p-6 md:px-0 lg:col-span-4 md:col-span-5 flex">
       <div class="p-4 bg-base-300 relative -mt-14 md:mt-0 md:-ml-16 border card rounded-none group-hover:bg-base-200">
         <h3
           class="font-semibold link link-hover text-xl sm:text-2xl font-['Oswald'] link link-hover tracking-wider"
         >
           {{ featuredPost.title }}
         </h3>
         <span class="text-sm italic">{{ datePublished }}</span>

         <p class="pt-4 pb-2">
           {{ excerpt }}

         </p>

         <span
           class="link text-primary tracking-wider underline-offset-2 transition-all hover:underline-offset-4 decoration-4 "
         >Read more</span
         >

       </div>

      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const props = defineProps({
  featuredPost: Object,
});

const datePublished = computed(() =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(props.featuredPost.createdAt))
);

const excerpt = computed(() => {
  const html = md.render(props.featuredPost.content, { html: true });
  return `${html.replace(/(<([^>]+)>)/gi, "").slice(0, 280)}...`;
});

const imageUrl = computed(() => {
  const srcset = props.featuredPost.featured_image.srcset;
  return srcset[0].secure_url;
});
</script>

<style scoped>
[data-theme="halloween"] .card {
  border-color: #3f3f46;
}

[data-theme="halloween"] .card:hover {
  border-color: #52525b;
}

.card {
  --animate-duration: 0.3s;
}
</style>
