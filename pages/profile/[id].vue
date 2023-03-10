<template>
  <section class="space-y-6">
    <div
      class="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
    >
      <FormKit
        @submit="update"
        id="update-profile-form"
        type="form"
        v-model="fields"
        :actions="false"
        :disabled="!updateProfile"
        :config="{
          classes: {
            message: 'text-error text-sm py-2 font-thin',
            label: 'label',
          },
        }"
        #default="{ value }"
      >
        <div class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold flex gap-2">
              <PhUser :size="32" weight="duotone" />
              Profile
            </h2>
            <div class="flex">
              <div v-if="updateProfile" class="gap-4 flex">
                <Button
                  :loading="updatingProfile"
                  type="submit"
                  class="btn-primary"
                >
                  <template #icon>
                    <PhUserGear :size="18" weight="duotone" />
                  </template>
                  Update
                </Button>
                <button
                  @click="
                    updateProfile = false;
                    reset('update-profile-form');
                  "
                  class="btn btn-outline btn-circle"
                >
                  <PhX :size="32" weight="duotone" />
                </button>
              </div>

              <button
                @click="updateProfile = true"
                v-else
                class="btn btn-square btn-outline"
              >
                <PhUserCircleGear :size="32" weight="duotone" />
              </button>
            </div>
          </div>
          <fieldset class="grid grid-cols-4 gap-6 rounded-md shadow-sm">
            <div class="space-y-2 col-span-full lg:col-span-1">
              <p class="font-medium">Personal Inormation</p>
            </div>
            <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div class="col-span-full sm:col-span-3">
                <FormKit
                  name="firstname"
                  label="First Name"
                  type="text"
                  input-class="w-full input input-bordered capitalize"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                <FormKit
                  name="lastname"
                  label="Last Name"
                  type="text"
                  input-class="w-full input input-bordered capitalize"
                />
              </div>
              <div class="col-span-full sm:col-span-3">
                <FormKit
                  name="email"
                  label="Email"
                  type="email"
                  input-class="w-full input input-bordered"
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
                <FormKit
                  name="bio"
                  label="Bio"
                  type="textarea"
                  input-class="textarea textarea-bordered w-full"
                />
              </div>
              <div class="col-span-full">
                <FormKit
                  type="file"
                  name="profile_image"
                  accept=".jpeg,.jpg"
                  input-class="file-input block file-input-bordered file-input-md"
                  fileItem-class="relative w-64"
                  fileRemove-class="absolute right-2 top-2 text-transparent w-8"
                >
                  <template #label>
                    <label class="label">
                      <span class="label-text text-lg items-center flex gap-2">
                        <PhImage :size="22" weight="duotone" />
                        Profile Picture</span
                      >
                    </label>
                  </template>

                  <template v-if="newImageUrl" #fileName>
                    <div class="w-full">
                      <div class="avatar">
                        <figure class="w-full h-64">
                          <NuxtImg
                            class="aspect-video object-cover w-full"
                            :src="newImageUrl"
                          />
                        </figure>
                      </div>
                      <div class="flex justify-center py-4">
                        <PhSwap :size="38" weight="duotone" />
                      </div>
                    </div>
                  </template>

                  <template #noFiles>
                    <div class="avatar">
                      <figure class="w-64 h-64">
                        <NuxtImg
                          class="aspect-video object-cover w-full"
                          :src="value.profile_picture.url"
                        />
                      </figure>
                    </div>
                  </template>

                  <template #fileRemoveIcon>
                    <span
                      class="btn btn-circle btn-sm opacity-70 hover:opacity-100"
                    >
                      <PhX :size="18" weight="duotone" />
                    </span>
                  </template>
                </FormKit>
              </div>
            </div>
          </fieldset>
        </div>
      </FormKit>
      <div>
        <div class="text-center mb-4">
          <button
            class="btn btn-outline"
            @click="changePassword = !changePassword"
          >
            <span v-if="changePassword" class="flex gap-2 items-center">
              <PhX :size="20" weight="duotone" />
              Cancel
            </span>

            <span v-else class="flex gap-2 items-center">
              <PhPassword :size="20" weight="duotone" />
              Change Password
            </span>
          </button>
        </div>
        <ChangePassword :change="changePassword" />
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  PhImage,
  PhUser,
  PhUserGear,
  PhX,
  PhUserCircleGear,
  PhSwap,
  PhPassword,
} from "phosphor-vue";
import { reset } from "@formkit/core";

const { user } = useAuth();

const fields = ref(user);
const updateProfile = ref(false);

const updatingProfile = ref(false);

const newImageUrl = ref("");
const changePassword = ref(false);

watch(
  () => fields.value.profile_image,
  (value) => {
    const file = value[0]?.file;

    if (file) {
      newImageUrl.value = URL.createObjectURL(file);
    }
  },
  { deep: true }
);

definePageMeta({ middleware: "auth", layout: "cms" });

const update = async ({
  firstname,
  lastname,
  email,
  bio = "",
  profile_image,
  _id,
}) => {
  const formData = new FormData();
  formData.append("firstname", firstname);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("bio", bio);

  const file = profile_image[0].file;

  if (file) {
    formData.append("profile_image", file);
  }

  updatingProfile.value = true;

  try {
    const res = await $fetch(`/api/users/${_id}`, {
      method: "PATCH",
      body: formData,
      headers: useRequestHeaders(["cookie"]),
    });

    updatingProfile.value = false;
    reset("update-profile-form", res.user);
    newImageUr.value = res.user.profile_picture.url;
  } catch (error) {
    updatingProfile.value = false;
  }
};
</script>
