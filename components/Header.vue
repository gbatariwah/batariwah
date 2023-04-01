<template>
  <div class="navbar p-4">
    <div class="navbar-start">
      <NuxtLink to="/" class="w-[200px]">
        <Logo />
      </NuxtLink>
    </div>

    <div class="navbar-end gap-1">
      <div class="space-x-1 hidden md:block">
        <NuxtLink
          active-class="text-primary"
          title="Home"
          to="/"
          class="btn btn-ghost btn-circle"
        >
          <PhHouseSimple :size="32" weight="duotone" />
        </NuxtLink>

        <NuxtLink
          active-class="text-primary"
          title="About"
          to="/about"
          class="btn btn-ghost btn-circle"
        >
          <PhInfo :size="32" weight="duotone" />
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
                <PhHouseSimple :size="28" weight="duotone" />

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

      <div class="flex gap-1">
        <!-- search -->
        <LazySearch />
        <!-- search -->

        <ThemeToggler />

        <div v-if="user" class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <VLazyImage
                :src="user.profile_picture.url"
                :alt="`${user.firstname} ${user.lastname}`"
                :intersection-options="{ rootMargin: '0px', threshold: 0.1 }"
                src-placeholder="/images/loader.gif"
              />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <NuxtLink
                :to="`/profile/${user._id}`"
                class="flex justify-between"
              >
                <span class="gap-2 flex items-center"
                  ><PhUser :size="16" weight="duotone" /> Profile</span
                >
                <span class="badge badge-sm badge-info capitalize">{{
                  user.firstname
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
              <a class="gap-2 hover:bg-error" @click="logout()">
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
  PhInfo,
  PhSignOut,
  PhCaretCircleDown,
  PhUser,
  PhNotePencil,
  PhHouseSimple,
} from "phosphor-vue";
import VLazyImage from "v-lazy-image";

const { user, logout } = useAuth();
</script>
