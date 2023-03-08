<template>
  <div
    class="navbar bg-base-300 px-6 transition-all"
    :class="{ 'pl-0': !isDark }"
  >
    <div class="navbar-start">
      <NuxtLink to="/">
        <NuxtImg src="/logo.svg" class="w-48" />
      </NuxtLink>
    </div>

    <div class="navbar-end">
      <NuxtLink
        v-if="route.name !== 'cms-posts-new-post'"
        to="/cms/posts/new-post"
        class="btn btn-circle btn-ghost"
      >
        <PhPen :size="32" weight="duotone" />
      </NuxtLink>

      <ThemeToggler />

      <div v-if="user" class="dropdown dropdown-end">
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
            <NuxtLink :to="`/profile/${user._id}`" class="flex justify-between">
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
              Manage Posts
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
</template>

<script setup>
import { PhSignOut, PhUser, PhPen, PhNotePencil } from "phosphor-vue";

const { user, logout } = useAuth();

const route = useRoute();

const { isDark } = useTheme();
</script>
