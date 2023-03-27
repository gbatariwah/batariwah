<template>
  <div class="space-y-6">
    <div
      class="block animate-pulse card-compact card bg-base-200 mx-auto sm:max-w-full md:grid md:grid-cols-12 shadow-md border rounded-md h-full border-zinc-700 overflow-hidden"
    >
      <figure class="md:col-span-7">
        <div class="aspect-video h-full w-full bg-zinc-400 opacity-20" />
      </figure>
      <div class="p-4 md:col-span-5 opacity-20">
        <div class="flex flex-col h-full full-h">
          <div class="space-y-1 text-xl mb-2">
            <p class="w-full h-6 rounded bg-zinc-400" />
            <p class="w-4/5 h-6 rounded bg-zinc-400" />
          </div>
          <div class="w-2/5 h-6 rounded bg-zinc-400 mb-4" />
          <div class="space-y-1">
            <p class="w-full h-6 rounded bg-zinc-400" />
            <p class="w-full h-6 rounded bg-zinc-400" />
            <p class="w-full h-6 rounded bg-zinc-400" />
            <p class="w-full h-6 rounded bg-zinc-400" />
            <p class="w-4/5 h-6 rounded bg-zinc-400" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <PostSkeleton v-for="s in 9" :key="s" />
    </div>
  </div>
</template>

<script setup></script>
