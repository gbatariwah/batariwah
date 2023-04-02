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
          <i class="ph-duotone ph-house-simple text-[32px]"></i>
        </NuxtLink>

        <NuxtLink
          active-class="text-primary"
          title="About"
          to="/about"
          class="btn btn-ghost btn-circle"
        >
          <i class="ph-duotone ph-info text-[32px]"></i>
        </NuxtLink>
      </div>

      <div class="dropdown dropdown-end md:hidden">
        <button class="btn btn-ghost btn-circle">
          <i class="ph-duotone ph-caret-circle-down text-[32px]"></i>
        </button>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-44"
        >
          <li>
            <a class="justify-between">
              <NuxtLink to="/" class="flex gap-4 items-center">
                <i class="ph-duotone ph-house-simple text-[28px]"></i>

                <span class="font-semibold tracking-wider gap-2 uppercase">
                  Home
                </span>
              </NuxtLink>
            </a>
          </li>
          <li>
            <a>
              <NuxtLink to="/about" class="flex gap-4 items-center">
                <i class="ph-duotone ph-info text-[28px]"></i>

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
                class="object-cover"
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
                <span class="gap-2 flex items-center">
                  <i class="ph-duotone ph-user text-[16px]"></i>
                  Profile</span
                >
                <span class="badge badge-sm badge-info capitalize">{{
                  user.firstname
                }}</span>
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/cms/posts" class="gap-2">
                <i class="ph-duotone ph-note-pencil text-[16px]"></i>
                Manage Content
              </NuxtLink>
            </li>
            <li>
              <a class="gap-2 hover:bg-error" @click="logout()">
                <i class="ph-duotone ph-sign-out text-[16px]"></i>
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
import VLazyImage from "v-lazy-image";

const { user, logout } = useAuth();
</script>
