<template>
  <div>
    <Button class="btn-outline" @click="sayHi">
      <template #icon>
        <PhActivity :size="24" />
      </template>

      Hello
    </Button>
  </div>
</template>

<script setup>
import { PhActivity } from "phosphor-vue";

const sayHi = () => {
  alert("Hi");
};
</script>
