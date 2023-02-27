<template>
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
      <div class="md:flex gap-2 hidden md:block">
        <NuxtLink title="Home" to="/" class="flex gap-2">
          <button class="btn btn-ghost btn-circle">
            <PhHouseLine :size="32" weight="duotone" />
          </button>
        </NuxtLink>

        <NuxtLink title="About" to="/about" class="flex gap-2">
          <button class="btn btn-ghost btn-circle">
            <PhInfo :size="32" weight="duotone" />
          </button>
        </NuxtLink>
      </div>

      <div class="dropdown dropdown-end md:hidden">
        <button class="btn btn-ghost btn-circle">
          <PhCaretCircleDown :size="32" weight="duotone" />
        </button>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-44"
        >
          <li>
            <a class="justify-between">
              <NuxtLink to="/" class="flex gap-4 items-center">
                <PhHouseLine :size="28" weight="duotone" />

                <span class="font-semibold tracking-wider gap-2 uppercase">
                  Home
                </span>
              </NuxtLink>
            </a>
          </li>
          <li>
            <a>
              <NuxtLink to="/about" class="flex gap-4 items-center">
                <PhInfo :size="28" weight="duotone" />

                <span class="font-semibold tracking-wider gap-2 uppercase">
                  About
                </span>
              </NuxtLink>
            </a>
          </li>
        </ul>
      </div>

      <!-- <div class="divider divider-horizontal"></div> -->

      <div class="flex gap-2">
        <!-- search -->
        <Search v-if="route.name !== 'search'" />
        <!-- search -->

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
              <NuxtLink
                :to="`/profile/${data.user.id}`"
                class="flex justify-between"
              >
                <span class="gap-2 flex items-center"
                  ><PhUser :size="16" weight="duotone" /> Profile</span
                >
                <span class="badge badge-sm badge-info capitalize">{{
                  data.user.firstname
                }}</span>
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/cms/posts" class="gap-2">
                <PhNotePencil :size="16" weight="duotone" />
                Manage Content
              </NuxtLink>
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
  </div>
</template>

<script setup>
import {
  PhHouseLine,
  PhInfo,
  PhSignOut,
  PhCaretCircleDown,
  PhUser,
  PhNotePencil,
} from "phosphor-vue";
import { useDark } from "@vueuse/core";

const { data, signOut, status } = useSession();

const route = useRoute();

const links = [
  { name: "home", url: "/" },
  { name: "about", url: "/about" },
];

const isDark = useDark({
  selector: "html",
  attribute: "data-theme",
  valueDark: "halloween",
  valueLight: "lofi",
});
</script>
