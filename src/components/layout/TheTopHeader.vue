<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { BellIcon } from "@heroicons/vue/24/solid";
import { computed, inject } from "vue";

const dailyTasks = inject("dailyTasks");

const nextUpTask = dailyTasks.value.filter((task) => task.status === "NextUp");

const nextUpTaskLength = computed(() => {
  return nextUpTask.length;
});
</script>

<template>
  <section>
    <ul class="flex gap-3 text-slate-900">
      <li>
        <MagnifyingGlassIcon
          class="h-10 w-10 bg-slate-900 p-2 bg-opacity-10 text-slate-900 rounded-full"
        ></MagnifyingGlassIcon>
      </li>
      <li class="relative">
        <span
          class="absolute -top-2 -right-1 bg-red-600 text-red-50 rounded-full w-5 h-5 py-0.5 text-xs text-center"
          >{{ nextUpTaskLength }}</span
        >
        <BellIcon class="my-bell-icon"></BellIcon>
      </li>
      <li>
        <img
          src="../../assets/header/1.jpg"
          alt="cat-profile"
          class="h-10 w-10 rounded-full object-cover"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.my-bell-icon {
  @apply h-10 w-10 bg-slate-900 p-2 bg-opacity-10 text-slate-900 rounded-full;
}
</style>
