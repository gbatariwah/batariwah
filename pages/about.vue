<template>
  <div class="px-4 mx-auto flex flex-col">
    <div class="mx-auto">
      <div class="rounded-lg h-64 overflow-hidden">
        <VLazyImage
          class="object-cover object-center h-full w-full"
          alt="banner Image"
          :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
          src-placeholder="/images/loader.gif"
          src="/images/banner.jpg"
        />
      </div>
      <div class="flex p-4 flex-col sm:flex-row">
        <div class="sm:w-1/3 text-center sm:pr-4">
          <div>
            <VLazyImage
              class="w-32 h-32 rounded-full inline-flex items-center justify-center object-cover"
              alt="Prosper Batariwah"
              :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
              src-placeholder="/images/loader.gif"
              src="/images/pb-2.jpg"
            />
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
            <div class="flex justify-center pt-4 space-x-1 align-center">
              <NuxtLink
                to="https://facebook.com/batariwahp"
                target="_blank"
                rel="noopener"
                class="btn btn-circle btn-ghost"
              >
                <PhFacebookLogo :size="38" weight="duotone" />
              </NuxtLink>

              <NuxtLink
                to="https://twitter.com/pbatariwah"
                target="_blank"
                rel="noopener"
                class="btn btn-circle btn-ghost"
              >
                <PhTwitterLogo :size="38" weight="duotone" />
              </NuxtLink>

              <NuxtLink
                to="https://www.instagram.com/p_batariwah"
                target="_blank"
                rel="noopener"
                class="btn btn-circle btn-ghost"
              >
                <PhInstagramLogo :size="38" weight="duotone" />
              </NuxtLink>

              <NuxtLink
                target="_blank"
                rel="noopener"
                to="mailto:batariwah@gmail.com"
                class="btn btn-circle btn-ghost"
              >
                <PhEnvelopeSimple :size="38" weight="duotone" />
              </NuxtLink>
            </div>

            <VLazyImage
              class="hidden sm:block"
              alt="Prosper Batariwah"
              :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
              src-placeholder="/images/loader.gif"
              src="/images/pb-4.jpg"
            />
          </div>
        </div>
        <div class="sm:w-2/3">
          <div
            class="md:border-none sm:mt-0 sm:pt-0 border-t mt-6 pt-4 border-zinc-700 font-body prose-lg"
          >
            <h4 class="uppercase tracking-wider text-normal">
              Hello and welcome!
            </h4>
            <p
              class="first-line:uppercase first-line:tracking-wider first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left leading-relaxed"
            >
              I am <b>Prosper Batariwah</b>, a qualified <b>lawyer</b> called to
              the Ghanaian bar. I currently work with an Accra-based law firm,
              <b>AB Lexmall & Associates</b>, with core strengths in corporate
              and commercial law. I am also a graduate assistant at the
              <b>University of Ghana School of Law</b> (UGSOL) where I teach
              tutorials in contracts and equity. I hold a qualifying law
              certificate from the Ghana School of Law and a Bachelor of Laws
              degree (First Class Honors) from Ghana’s premier law school, the
              UGSOL.
            </p>

            <p>
              Over the last couple of years, I have gained loads of experience
              working on several projects in the areas of law reform, law and
              development, natural resource management, family, trusts and
              estates law. My current research focus on development policy
              implementation and the integration of human rights norms into the
              regulatory framework of extractive industries.
            </p>

            <VLazyImage
              class="float-right h-48 w-48 rounded-md my-2 ml-4"
              alt="Prosper Batariwah"
              :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
              src-placeholder="/images/loader.gif"
              src="/images/pb-5.jpg"
            />

            <p>
              There are other things I am interested in – for example, law and
              religion and IT law. For the last two years, I have dedicated this
              blog to these other areas. This place has equally been an outlet
              for me to reflect on life generally – from the absence of a middle
              name to Ghanaian highlife.
            </p>

            <p>
              I started this blog when I was in professional law school; now
              that I have been called to the bar, I intend to continue writing –
              this time aligning my output with my research and pet interests
              and drawing depth from my practice and teaching experience.
            </p>

            <VLazyImage
              class="float-left h-48 w-48 mr-4 rounded-md my-2"
              alt="Prosper Batariwah"
              :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
              src-placeholder="/images/loader.gif"
              src="/images/pb-3.jpg"
            />
            <p>
              If you are looking for me, you’ll most likely find me someplace
              doing or coordinating research (plugged into Spotify, tapping into
              the wisdom and rhyme of Passenger, Ebo Taylor or Kendrick Lamar).
              If not, you should find me talking to my students, who will always
              have 1001 questions to ask – or need an ear to listen to the
              daunting trials of law school. On very rare occasions, you’ll see
              me standing behind an artwork, savoring the perfection of human
              accomplishment, and the sheer brilliance of humankind.
            </p>
          </div>
          <div class="divider"></div>
          <div class="text-center">
            <p class="pb-2 font-light">Follow Batariwah on Facebook</p>
            <NuxtLink
              to="https://facebook.com/profile.php?id=100069087706398"
              target="_blank"
              rel="noopener"
            >
              <Button class="btn-info btn-sm">
                <template #icon>
                  <PhThumbsUp :size="20" weight="duotone" />
                </template>
                Follow
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  PhFacebookLogo,
  PhInstagramLogo,
  PhTwitterLogo,
  PhThumbsUp,
  PhEnvelopeSimple,
} from "phosphor-vue";
import VLazyImage from "v-lazy-image";

const config = useRuntimeConfig();

useSeoMeta({
  title: "About",
  titleTemplate: "%s | Batariwah",
  ogUrl: `${config.BASE_URL}/about`,
  description:
    "I am Prosper Batariwah, a qualified lawyer called to the Ghanaian bar. I currently work with an Accra-based law firm, AB Lexmall & Associates, with core strengths in corporate and commercial law. I am also a graduate assistant at the University of Ghana School of Law (UGSOL) where I teach tutorials in contracts and equity. I hold a qualifying law certificate from the Ghana School of Law and a Bachelor of Laws degree (First Class Honors) from Ghana’s premier law school, the UGSOL",
});
</script>
