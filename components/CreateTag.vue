<template>
  <FormKit
    type="form"
    method="post"
    id="tag-form"
    v-model="field"
    :actions="false"
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

      <button
        type="submit"
        class="btn btn-ghost btn-square"
        :class="{ loading: loading }"
        :disabled="field.tag.length < 3 || loading"
      >
        <PhPlusCircle v-if="!loading" :size="32" weight="duotone" />
      </button>
    </div>
  </FormKit>
</template>

<script setup>
import { PhPlusCircle } from "phosphor-vue";
import { reset } from "@formkit/core";

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

    reset("tag-form");
    emit("tagCreated");

    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
</script>
