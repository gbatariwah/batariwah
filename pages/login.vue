<script setup>
const initialValue = { email: "batariwahg@gmail.com", password: "123456" };
const { signIn } = useSession();
const submitHandler = async ({ email, password }) => {
  await signIn("credentials", { email, password, callbackUrl: "/" });
};

const emailLogin = async ({ email }) => {};

definePageMeta({ auth: false, layout: "login" });
</script>

<template>
  <!-- <div class="py-12">-->
  <!--   <div class="w-md mx-auto">-->
  <!--     <FormKit-->
  <!--         type="form"-->
  <!--         id="login-form"-->
  <!--         submit-label="Login"-->
  <!--         @submit="submitHandler"-->
  <!--         :actions="false"-->
  <!--         v-model = initialValue-->
  <!--         #default="{ value }"-->
  <!--     >-->
  <!--       <h1 class="font-bold">Login</h1>-->

  <!--       <FormKit-->
  <!--           type="text"-->
  <!--           name="username"-->
  <!--           label="Username"-->
  <!--           placeholder=""-->
  <!--           validation="required"-->
  <!--           :classes="{-->
  <!--        input: 'input input-bordered',-->
  <!--        label: 'label'-->
  <!--      }"-->
  <!--       />-->
  <!--       <div class="double">-->
  <!--         <FormKit-->
  <!--             type="password"-->
  <!--             name="password"-->
  <!--             label="Password"-->
  <!--             validation="required"-->
  <!--             placeholder="Password"-->
  <!--             :classes="{-->
  <!--        input: 'input input-bordered',-->
  <!--        label: 'label'-->
  <!--      }"-->
  <!--         />-->
  <!--       </div>-->

  <!--       <FormKit-->
  <!--           type="submit"-->
  <!--           label="Login"-->
  <!--           :classes="{-->
  <!--        input: 'btn btn-primary btn-outline btn-sm',-->
  <!--      }"-->
  <!--       />-->
  <!--     </FormKit>-->
  <!--   </div>-->
  <!-- </div>-->

  <div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 mx-auto">
    <div class="mb-8 text-center">
      <h1 class="my-3 text-4xl font-bold">Login</h1>
      <p class="text-sm">Login to access your account</p>
    </div>

    <FormKit
      type="form"
      id="login-form"
      submit-label="Login"
      @submit="submitHandler"
      :actions="false"
      v-model="initialValue"
      #default="{ value }"
    >
      <!--      <form  class="space-y-12 ng-untouched ng-pristine ng-valid">-->
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
