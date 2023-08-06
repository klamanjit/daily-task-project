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
  <section class="p-10 ml-60 text-slate-800">
    <div class="flex justify-between items-center">
      <h1 class="mb-8 md:text-4xl 2xl:text-5xl font-bold">
        {{ topic1 }}
      </h1>

      <the-top-header></the-top-header>
    </div>
    <p
      class="text-slate-500 opacity-70 md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
    >
      Click
      <span
        class="bg-slate-900 bg-opacity-10 p-1 text-blue-600 font-semibold md:text-xs lg:text-sm xl:text-base 2xl:text-lg;"
        >+ New</span
      >
      To create new list and wait for project manager card.
    </p>
    <p
      class="text-slate-500 opacity-70 mb-12 md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
    >
      Don't Create a card by yourself to manage a good colaboration.
    </p>

    <main class="my-card-container">
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

      <div v-for="task in dailyTasks" :key="task.id">
        <base-card class="my-base-card" draggable="true">
          <nav class="flex justify-between items-center mb-1">
            <p
              class="bg-slate-500 bg-opacity-10 rounded-full text-sm text-center h-5 w-5"
            >
              {{ task.emoji }}
            </p>
            <EllipsisHorizontalIcon
              class="h-5 w-5 fill-slate-500 opacity-70"
            ></EllipsisHorizontalIcon>
          </nav>

          <p class="mb-1">
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
    </main>
  </section>
</template>

<style scoped>
.my-grid-topic {
  @apply flex justify-between items-center font-semibold bg-slate-900 bg-opacity-10 p-2 rounded-sm
  md:text-xs
  lg:text-sm
  xl:text-base
  2xl:text-lg;
}
.my-grid-p {
  @apply bg-slate-950 text-slate-50 text-sm  py-1 px-2 rounded-sm;
}

.myInProgress {
  @apply bg-orange-500 text-orange-50
  md:text-xs
  lg:text-sm
  xl:text-base
  2xl:text-lg;
}

.myNextUp {
  @apply bg-green-500 text-green-50
  md:text-xs
  lg:text-sm
  xl:text-base
  2xl:text-lg;
}

.myComplete {
  @apply bg-slate-500 text-slate-50
  md:text-xs
  lg:text-sm
  xl:text-base
  2xl:text-lg;
}

.myUnknown {
  @apply bg-red-500 text-red-50
  md:text-xs
  lg:text-sm
  xl:text-base
  2xl:text-lg;
}

.my-section {
  @apply p-8
  sm:overflow-y-auto;
}

.my-card-container {
  @apply sm:grid sm:grid-cols-3 sm:gap-4
  md:gap-4
  lg:gap-6
  xl:gap-6
  2xl:gap-8;
}

/* .my-card-border {
  @apply border-dashed border-2 border-slate-500 border-opacity-70 w-full h-44 -z-10 
  md:h-44;
} */

.my-base-card {
  @apply z-10 h-44 w-full  flex flex-col justify-between 
   md:text-xs
  lg:text-sm
  xl:text-base
  2xl:text-lg;
}
</style>
