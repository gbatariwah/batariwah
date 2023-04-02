<template>
  <div class="navbar p-4">
    <div class="navbar-start pr-2">
      <NuxtLink to="/" class="w-[220px]">
        <Logo />
      </NuxtLink>
    </div>

    <div class="navbar-end">
      <NuxtLink
        v-if="route.name !== 'cms-posts-new-post'"
        to="/cms/posts/new-post"
        class="btn btn-circle btn-ghost"
      >
        <i class="ph-duotone ph-pen text-[32px]"></i>
      </NuxtLink>

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
            <NuxtLink :to="`/profile/${user._id}`" class="flex justify-between">
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
              Manage Posts
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
</template>

<script setup>
import VLazyImage from "v-lazy-image";

const { user, logout } = useAuth();

const route = useRoute();
</script>
