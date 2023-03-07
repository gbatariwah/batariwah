<template>
  <FormKit
    type="form"
    method="post"
    id="tag-form"
    v-model="tag"
    :actions="false"
    @submit="createTag"
    :config="{
      classes: {
        message: 'text-error text-sm py-2 font-thin',
      },
    }"
    #default="{ loading }"
  >
    <div class="input-group">
      <FormKit placeholder="Add tag.." name="tag" :classes="{ input: 'input input-bordered' }" />
      <FormKit
        type="submit"
        :classes="{ input: 'btn btn-square' }"
        :disabled="loading || tag.length < 3"
      >
        <PhPlusCircle :size="32" weight="duotone" />
      </FormKit>
    </div>
  </FormKit>
</template>

<script setup>
import { PhPlusCircle } from "phosphor-vue";
import { reset } from "@formkit/core";
const tag = ref({ tag: "" });
const emit = defineEmits(["tagCreated"]);

const createTag = async ({ tag }) => {
  await $fetch("/api/tags", {
    method: "POST",
    body: { name: tag },
    headers: useRequestHeaders(["cookie"]),
  });

  reset("tag-form");
  emit("tagCreated");
};
</script>
