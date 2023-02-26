<template>
  <div class="container mx-auto max-w-4xl">
    <!-- header -->

    <header class="sticky z-10 top-0 bg-base-100">
      <div
        class="navbar bg-base-100 px-6 transition-all"
        :class="{ 'pl-0': !isDark }"
      >
        <div class="navbar-start">
          <NuxtLink to="/">
            <NuxtImg src="/logo.svg" class="w-48" />
          </NuxtLink>
        </div>

        <div class="navbar-end">
          <NuxtLink to="/cms/posts/new-post" class="btn btn-circle btn-ghost">
            <PhPen :size="32" weight="duotone" />
          </NuxtLink>

          <ThemeToggler />

          <div v-if="status === 'authenticated'" class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <NuxtImg src="https://api.lorem.space/image/face?w=150&h=150" />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a class="flex justify-between">
                  <span class="gap-2 flex items-center"
                    ><PhUser :size="16" weight="duotone" /> Profile</span
                  >
                  <span class="badge badge-sm badge-info capitalize">{{
                    data.user.firstname
                  }}</span>
                </a>
              </li>
              <li>
                <a class="gap-2 hover:bg-error" @click="signOut()">
                  <PhSignOut :size="16" weight="duotone" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <!-- /header -->

    <main class="p-6">
      <slot />
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<script setup>
import { PhSignOut, PhUser, PhPen } from "phosphor-vue";
import { useDark } from "@vueuse/core";

const { data, signOut, status } = useSession();

const route = useRoute();

definePageMeta({ middleware: "auth", layout: "cms" });

const isDark = useDark({
  selector: "html",
  attribute: "data-theme",
  valueDark: "halloween",
  valueLight: "lofi",
});
</script>
