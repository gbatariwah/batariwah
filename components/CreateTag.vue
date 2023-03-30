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
          <PhPlusCircle :size="32" weight="duotone" />
        </template>
      </Button>
    </div>
    <div>{{ field.tag }}</div>
  </FormKit>
</template>

<script setup>
import { PhPlusCircle } from "phosphor-vue";
import { reset } from "@formkit/core";
import { useToast } from "vue-toastification";

const field = ref({ tag: "" });
const loading = ref(false);

const emit = defineEmits(["tagCreated"]);
const toast = useToast();

const createTag = async ({ tag }) => {
  try {
    loading.value = true;
    await $fetch("/api/tags", {
      method: "POST",
      body: { name: tag },
      headers: useRequestHeaders(["cookie"]),
    });

    // reset("tag-form");
    field.value = { tag: "" };
    emit("tagCreated");

    loading.value = false;
    toast.success("Success!");
  } catch (error) {
    if (error.message.includes("name_1 dup key")) {
      toast.error("The tag already exist.");
    } else {
      toast.error("Tag not created, please try again.");
    }

    loading.value = false;
  }
};
</script>
