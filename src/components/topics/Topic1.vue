<script setup>
import { computed, inject } from "vue";

import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { ClockIcon } from "@heroicons/vue/24/solid";

const topics = inject("topics");
const users = inject("users");
const dailyTasks = inject("dailyTasks");

const nextUpTask = dailyTasks.value.filter((task) => task.status === "NextUp");
const InProgressTask = dailyTasks.value.filter(
  (task) => task.status === "InProgress"
);
const CompleteTask = dailyTasks.value.filter(
  (task) => task.status === "Complete"
);

const nextUpTaskLength = computed(() => {
  return nextUpTask.length;
});

const InProgressTaskLength = computed(() => {
  return InProgressTask.length;
});

const CompleteTaskLength = computed(() => {
  return CompleteTask.length;
});

const topic1 = computed(() => {
  return topics.value[0].emoji + " " + topics.value[0].datail;
});
</script>

<template>
  <section class="my-section">
    <h1 class="mb-4 text-3xl font-bold">{{ topic1 }}</h1>
    <p class="text-slate-500 opacity-70">
      Click
      <span class="bg-slate-900 bg-opacity-10 p-1 text-blue-600 font-semibold"
        >+ New</span
      >
      To create new list and wait for project manager card.
    </p>
    <p class="text-slate-500 opacity-70 mb-10">
      Don't Create a card by yourself to manage a good colaboration.
    </p>

    <div class="grid grid-cols-3 gap-6 mb-6">
      <div class="my-grid-topic">
        <p>Next up</p>
        <p class="my-grid-p">{{ nextUpTaskLength }}</p>
      </div>
      <div class="my-grid-topic">
        <p>In Progress</p>
        <p class="my-grid-p">{{ InProgressTaskLength }}</p>
      </div>
      <div class="my-grid-topic">
        <p>Complete</p>
        <p class="my-grid-p">{{ CompleteTaskLength }}</p>
      </div>
    </div>

    <div class="my-card-container">
      <div
        v-if="true"
        class="my-card-border"
        v-for="task in dailyTasks"
        :key="task.id"
      >
        <base-card class="my-base-card" draggable="true">
          <nav class="flex justify-between items-center">
            <p
              class="bg-slate-500 bg-opacity-10 rounded-full text-sm text-center h-5 w-5"
            >
              {{ task.emoji }}
            </p>
            <EllipsisHorizontalIcon
              class="h-5 w-5 fill-slate-500 opacity-70"
            ></EllipsisHorizontalIcon>
          </nav>

          <p class="">
            <span>{{ task.title }}</span
            >{{ task.detail }}
          </p>

          <footer class="flex justify-between items-center">
            <div
              class="flex gap-1 items-center p-1 rounded-sm"
              :class="{
                myInProgress: task.status === 'InProgress',
                myNextUp: task.status === 'NextUp',
                myComplete: task.status === 'Complete',
                myUnknown: task.status === 'Unknown',
              }"
            >
              <ClockIcon class="h-4 w-4"></ClockIcon>
              <div>{{ task.month }}</div>
              <div>{{ task.date }}</div>
            </div>
            <div class="flex">
              <img
                v-for="user in users"
                :key="user.id"
                :src="user.imgUrl"
                alt="profile-picture"
                class="h-6 w-6 rounded-full object-cover -ml-1"
              />
            </div>
          </footer>
        </base-card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.my-grid-topic {
  @apply flex justify-between items-center bg-slate-900 bg-opacity-10 p-2 rounded-sm scale-105;
}
.my-grid-p {
  @apply bg-slate-950 text-slate-50 text-sm py-1 px-2 rounded-sm;
}

.myInProgress {
  @apply bg-orange-500 text-orange-50
  md:text-xs
  lg:text-sm
  xl:text-base;
}

.myNextUp {
  @apply bg-green-500 text-green-50
  md:text-xs
  lg:text-sm
  xl:text-base;
}

.myComplete {
  @apply bg-slate-500 text-slate-50
  md:text-xs
  lg:text-sm
  xl:text-base;
}

.myUnknown {
  @apply bg-red-500 text-red-50
  md:text-xs
  lg:text-sm
  xl:text-base;
}

.my-section {
  @apply text-slate-800 p-8
  sm:overflow-y-auto
  md:overflow-y-hidden;
}

.my-card-container {
  @apply gap-6
  sm:grid sm:grid-cols-2 
  md:grid md:grid-cols-3 
  lg:grid lg:grid-cols-3
  xl:grid xl:grid-cols-4;
}

.my-card-border {
  @apply border-dashed border-2 border-slate-500 border-opacity-70 w-full h-44 -z-10 
  md:h-44;
}

.my-base-card {
  @apply z-10 h-44 w-full scale-105 flex flex-col justify-between 
  md:h-44 md:text-xs
  lg:text-sm
  xl:text-base;
}
</style>
