<template>
  <div>About</div>

  <Button
    @click="
      toast.success('My toast content', {
        timeout: 2000,
      })
    "
  >
    Toast
  </Button>
</template>

<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();
</script>
