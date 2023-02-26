<template>
  <div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 mx-auto">
    <div class="mb-8 text-center">
      <h1 class="my-3 text-4xl font-bold">Login</h1>
      <p class="text-sm">Login to access your account</p>
    </div>

    <FormKit
      type="form"
      id="login-form"
      submit-label="Login"
      @submit="handleSubmit"
      :actions="false"
      v-model="initialValue"
      #default="{ value }"
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
          <FormKit
            type="submit"
            label="Login"
            :classes="{
              input: 'btn btn-primary btn-outline my-6 w-full',
            }"
          />
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
const initialValue = { email: "batariwahg@gmail.com", password: "123456" };
const { signIn } = useSession();
const handleSubmit = async ({ email, password }) => {
  await signIn("credentials", { email, password, callbackUrl: "/" });
};

definePageMeta({ auth: false, layout: "login" });
</script>
