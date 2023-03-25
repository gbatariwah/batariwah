<template>
  <div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 mx-auto">
    <div class="mb-8 text-center">
      <h1 class="my-3 text-4xl font-bold">Login</h1>
      <p class="text-sm">Login to access your account</p>
    </div>

    <FormKit
      type="form"
      id="login-form"
      method="post"
      submit-label="Login"
      @submit="handleSubmit"
      :actions="false"
      v-model="initialValue"
      #default="{ value }"
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
          validation="required"
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
          validation="required"
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
              <PhSignIn :size="18" weight="duotone" />
            </template>
            Login
          </Button>
        </div>
        <p class="px-6 text-sm text-center dark:text-gray-400">
          Don't have an account yet?
          <a
            rel="noopener noreferrer"
            href="#"
            class="hover:underline dark:text-violet-400"
            >Sign up</a
          >.
        </p>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { setErrors } from "@formkit/core";
import { PhSignIn } from "phosphor-vue";

const initialValue = { email: "", password: "" };

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
