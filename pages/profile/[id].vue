<template>
  <section class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold flex gap-2">
        <PhUser :size="32" weight="duotone" />
        Profile
      </h2>
      <button class="btn btn-primary hover:bg-primary-focus gap-2">
        <PhUserGear :size="18" weight="duotone" />
        Update
      </button>
    </div>
    <div
      v-if="status === 'authenticated'"
      class="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
    >
      <fieldset class="grid grid-cols-4 gap-6 rounded-md shadow-sm">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <p class="font-medium">Personal Inormation</p>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label for="firstname" class="label">First name</label>
            <input
              id="firstname"
              type="text"
              placeholder="First name"
              class="w-full input input-bordered capitalize"
              v-model="data.user.firstname"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label for="lastname" class="label">Last name</label>
            <input
              id="lastname"
              type="text"
              placeholder="Last name"
              class="w-full input input-bordered capitalize"
              v-model="data.user.lastname"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label for="email" class="label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              class="w-full input input-bordered"
              v-model="data.user.email"
            />
          </div>
        </div>
      </fieldset>
      <fieldset class="grid grid-cols-4 gap-6 rounded-md shadow-sm">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <p class="font-medium">Profile</p>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full">
            <label for="bio" class="label">Bio</label>
            <textarea
              id="bio"
              placeholder=""
              class="w-full textarea textarea-bordered"
              v-model="data.user.bio"
            ></textarea>
          </div>
          <div class="col-span-full">
            <label for="bio" class="label">Photo</label>
            <div class="space-y-2">
              <div class="avatar block">
                <div class="w-32 rounded">
                  <img src="https://api.lorem.space/image/face?w=150&h=150" />
                </div>
              </div>
              <button type="button" class="btn gap-2 btn-primary">
                <PhImage :size="20" weight="duotone" />
                Change
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="grid grid-cols-4 gap-6">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <p class="font-medium">Password</p>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label for="username" class="label">Old Password</label>
            <input
              id="username"
              type="password"
              placeholder="Username"
              class="w-full input input-bordered"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label for="website" class="label">New Password</label>
            <input
              id="website"
              type="password"
              class="w-full input input-bordered"
            />
          </div>
          <div class="col-span-full">
            <label for="bio" class="label">Repeat Password</label>
            <input
              type="password"
              id="password-repeat"
              class="w-full input input-bordered"
              v-model="data.user.bio"
            />
          </div>
        </div>
        <div class="flex gap-2 justify-end col-span-full">
          <button
            class="btn btn-primary hover:bg-primary-focus gap-2"
            title="Change Password"
          >
            <PhPassword :size="18" weight="duotone" />
            Change Password
          </button>
        </div>
      </fieldset>
    </div>
  </section>
</template>

<script setup>
import {
  PhArticle,
  PhImage,
  PhUser,
  PhUserGear,
  PhPassword,
} from "phosphor-vue";
const { data, status } = useSession();

definePageMeta({ middleware: "auth", layout: "cms" });
</script>
