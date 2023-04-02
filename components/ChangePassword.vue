<template>
  <FormKit
    v-if="change"
    v-model="fields"
    :actions="false"
    @submit="changePassword"
    type="form"
    :config="{
      classes: {
        message: 'text-error text-sm py-2 font-thin',
        label: 'label',
        input: 'w-full input input-bordered',
      },
    }"
  >
    <fieldset class="grid grid-cols-4 gap-6">
      <div class="space-y-2 col-span-full lg:col-span-1">
        <p class="font-medium">Password</p>
      </div>

      <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        <div class="col-span-full"></div>
        <div class="col-span-full sm:col-span-3">
          <FormKit
            id="old-password"
            name="oldPassword"
            type="password"
            label="Old Password"
            validation="required"
          />
        </div>
        <div class="col-span-full sm:col-span-3">
          <FormKit
            label="New Password"
            id="new-password"
            name="password"
            type="password"
            validation="required"
          />
        </div>
        <div class="col-span-full">
          <FormKit
            label="Repeat Password"
            type="password"
            id="password-repeat"
            name="password_confirm"
            validation="required|confirm"
            validation-label="Password confirmation"
          />
        </div>
      </div>
      <div class="flex gap-2 justify-end col-span-full">
        <Button
          type="submit"
          class="btn-primary"
          title="Change Password"
          :disabled="changingPassword"
          :loading="changingPassword"
        >
          <template #icon>
            <i class="ph-duotone ph-password text-[18px]"></i>
          </template>
          Change Password
        </Button>
      </div>
    </fieldset>
  </FormKit>
</template>

<script setup>
const fields = ref({
  oldPassword: "",
  password: "",
  password_confirm: "",
});

const { user, me } = useAuth();

const props = defineProps({
  change: Boolean,
});

const changingPassword = ref(false);

const changePassword = async ({ oldPassword, password }) => {
  changingPassword.value = true;
  try {
    const res = await $fetch(`/api/users/${user.value._id}`, {
      method: "PATCH",
      body: { oldPassword, password },
      headers: useRequestHeaders(["cookie"]),
    });

    changingPassword.value = false;

    await me();
    useNuxtApp().$toast.success("Success!");
  } catch (error) {
    changingPassword.value = false;
    useNuxtApp().$toast.error("Something went wrong, try again.");
  }
};
</script>
