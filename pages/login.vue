<template>
  <div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 mx-auto">
    <div class="mb-8 text-center">
      <div class="flex justify-center">
        <NuxtLink to="/">
          <Logo class="my-3 w-[240px] border" />
        </NuxtLink>
      </div>
    </div>

    <FormKit
      type="form"
      id="login-form"
      method="post"
      submit-label="Login"
      @submit="handleSubmit"
      :actions="false"
      v-model="initialValue"
      :config="{
        classes: {
          message: 'text-error text-sm py-2 font-thin',
        },
      }"
    >
      <div class="space-y-4">
        <FormKit
          type="email"
          name="email"
          label="Email"
          placeholder=""
          :classes="{
            input: 'input input-bordered w-full',
            label: 'label',
          }"
        />
      </div>

      <div class="space-y-4">
        <FormKit
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          :classes="{
            input: 'input input-bordered w-full',
            label: 'label',
          }"
        />
      </div>

      <div class="space-y-2">
        <div>
          <Button
            type="submit"
            :loading="logingIn"
            class="btn-primary my-6 w-full"
          >
            <template #icon>
              <i class="ph-duotone ph-sign-in text-[18px]"></i>
            </template>
            Login
          </Button>
        </div>
        <!-- <p class="px-6 text-sm text-center dark:text-gray-400">
          Don't have an account yet?
          <a
            rel="noopener noreferrer"
            href="#"
            class="hover:underline dark:text-violet-400"
            >Sign up</a
          >.
        </p> -->
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { setErrors } from "@formkit/core";

const initialValue = ref({ email: "", password: "" });

const { login } = useAuth();
const logingIn = ref(false);

const handleSubmit = async ({ email, password }) => {
  try {
    logingIn.value = true;
    await login(email, password);
    logingIn.value = false;
    await navigateTo("/");
  } catch (error) {
    setErrors("login-form", error.message);
    logingIn.value = false;
  }
};

definePageMeta({ layout: "login", middleware: "login" });
useSeoMeta({
  title: "Login",
  titleTemplate: "%s | Batariwah",
});
</script>
