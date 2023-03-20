<template>
  <div class="container mx-auto flex flex-col">
    <div class="mx-auto">
      <div class="rounded-lg h-64 overflow-hidden">
        <NuxtImg
          alt="banner Image"
          class="object-cover object-center h-full w-full"
          src="/images/banner.jpg"
          placeholder="/images/loader.gif"
        ></NuxtImg>
      </div>
      <div class="flex p-4 flex-col sm:flex-row">
        <div class="sm:w-1/3 text-center md:pr-4">
          <div>
            <NuxtImg
              class="w-32 h-32 rounded-full inline-flex items-center justify-center object-cover"
              placeholder="/images/loader.gif"
              alt="Prosper Batariwah"
              src="images/prosper-batariwah.jpg"
            >
            </NuxtImg>
            <div class="flex flex-col items-center text-center justify-center">
              <h2
                class="font-medium title-font mt-4 text-lg uppercase tracking-wide"
              >
                Prosper Batariwah
              </h2>
              <div class="w-12 h-1 bg-primary rounded mt-2 mb-4"></div>
              <p class="font-light">
                Batariwah: A blog to share perspectives that are fresh and tell
                narratives that resonate.
              </p>
            </div>
          </div>
          <div class="space-y-4">
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

            <div class="text-center">
              <p class="pb-2 font-light">Follow Batariwah on Facebook</p>
              <Button class="btn-outline">
                <template #icon>
                  <PhThumbsUp :size="20" weight="duotone" />
                </template>
                Follow
              </Button>
            </div>
          </div>
        </div>
        <div class="sm:w-2/3">
          <div
            class="first-line:uppercase first-line:tracking-wider first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left leading-relaxed md:border-none md:mt-0 md:pt-0 border-t mt-6 pt-4 border-zinc-700 font-body prose-lg"
            v-html="messageHtml"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import {
  PhFacebookLogo,
  PhInstagramLogo,
  PhTwitterLogo,
  PhThumbsUp,
} from "phosphor-vue";
const md = new MarkdownIt();

const message =
  ref(`I do hope a very hearty ‘hello!’ will do. Welcome to my blog!

Some years back, I made the bold decision; one, which in my personal world and language could be described as a leap to the moon. Sooner rather than later, I realized, keeping a blog, though not a matter of cleaning the Augean stables, was still an extremely trying enterprise which required one to summon all the tools in one’s arsenal to ground the wherewithal to maintain consistency. Over the course of these years (the hiatus), I have amassed experiences and birthed perspectives which are begging for expression. I have, thus, grown and aged. This year, I make that decision I made some years back by reactivating my blog.

I hope to accomplish two main objectives. First, I hope to write. Second, I want to share perspectives that are fresh and tell narratives that resonate.

I am **Prosper Batariwah**. I hold a Bachelor of Laws Degree (with first class honours, of course lol) from the University Of Ghana School Of Law. Currently, I am a Part I Professional Law Course Student of the Ghana School of Law (wish me loads of luck, I totally need that).

Though I am a law student, this blog, from the onset, is quintessentially personal. A large number of the things I shall write will focus on law and quasi-legal matters. When I am occasionally seized by Shakespeare or Pope, other things could come forth and be seen. Nonetheless, I may, from time to time, publish pieces from others.

My interests generally span law and literature. In particular, I am genuinely passionate about law and society; law and anthropology; law and history. There is also a burgeoning interest in business and IT law.

I hope this blog achieves what it seeks to achieve: a platform for me to express my views and for you to see them. Do get in touch if you can. I will be glad to hear and learn from you. Have a great time!`);

const messageHtml = md.render(message.value, { html: true });
</script>
