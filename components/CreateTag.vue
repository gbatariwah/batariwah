<template>
  <FormKit
    type="form"
    id="tag-form"
    v-model="field"
    :actions="false"
    :ignore="true"
    @submit="createTag"
    :config="{
      classes: {
        message: 'text-error text-sm py-2 font-thin',
      },
    }"
  >
    <div class="input-group">
      <FormKit
        placeholder="Add tag.."
        name="tag"
        :classes="{ input: 'input input-bordered' }"
      />

      <Button
        type="submit"
        class="btn-ghost btn-square"
        :disabled="field.tag.length < 3"
        :loading="loading"
      >
        <template #icon>
          <i class="ph-duotone ph-plus-circle text-[32px]"></i>
        </template>
      </Button>
    </div>
  </FormKit>
</template>

<script setup>
const field = ref({ tag: "" });
const loading = ref(false);

const emit = defineEmits(["tagCreated"]);

const createTag = async ({ tag }) => {
  try {
    loading.value = true;
    await $fetch("/api/tags", {
      method: "POST",
      body: { name: tag },
      headers: useRequestHeaders(["cookie"]),
    });

    field.value = { tag: "" };
    emit("tagCreated");

    loading.value = false;
    useNuxtApp().$toast.success("Success!");
  } catch (error) {
    if (error.message.includes("name_1 dup key")) {
      toast.error("The tag already exist.");
    } else {
      useNuxtApp().$toast.error("Tag not created, please try again.");
    }

    loading.value = false;
  }
};
</script>
