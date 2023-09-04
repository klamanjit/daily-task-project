<script setup>
import { PresentationChartLineIcon } from "@heroicons/vue/24/solid";
import { computed, inject, onMounted, ref } from "vue";
import { useGetTopics, useGetTasks } from "../components/hooks/fetchTopicData";

const topics = inject("topics");
const users = inject("users");

// Loading
const isLoading = ref(false);

const isLogin = computed(() => {
  return !!localStorage.getItem("token");
});

const userName = computed(() => {
  return localStorage.getItem("username");
});

const allTopicProgression = computed(() => {
  const completeTopic = topics.value.filter((ct) => ct.status === "Complete");
  return Math.floor((completeTopic.length / topics.value.length) * 100);
});

const currentTopic = computed(() => {
  return topics.value.slice().pop();
});

const numOfCompletTask = computed(() => {
  if (currentTopic.value.tasks) {
    return currentTopic.value.tasks.filter((task) => task.status === "Complete")
      .length;
  } else {
    return 0;
  }
});

function clipPathStyle(topic) {
  return `clip-path: polygon(0 0, 100% 0, 100% ${topic.progression}%, 0 ${topic.progression}%);`;
}

console.log(currentTopic.value);

const topicSelected = computed(() => {
  return topics.value.find((topic) => topic.id === currentTopic.value.id);
});

onMounted(async () => {
  await useGetTopics(topics, isLoading);
  await useGetTasks(topicSelected, currentTopic.value.id, isLoading);
});
</script>

<template>
  <!-- <base-spinner v-if="isLoading"></base-spinner> -->
  <section class="my-section-home" v-if="!isLoading">
    <the-header v-if="true"></the-header>
    <header
      class="mt-10 mb-8 py-8 h-32 px-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-sm flex flex-col justify-end"
    >
      <h3 class="text-xs font-bold text-slate-300">OWW studio</h3>
      <h2 class="text-lg text-blue-50 font-bold">
        Welcome back, {{ userName }} !
      </h2>
    </header>

    <p class="text-green-900 font-semibold">Current Topic</p>

    <div class="flex gap-1">
      <p class="text-slate-500 text-xs font-semibold">
        Status | {{ currentTopic.status }},
      </p>
      <p class="text-slate-500 text-xs font-semibold mb-6">
        Progression | {{ currentTopic.progression }}%
      </p>
    </div>

    <main
      class="w-full bg-white border-t-8 border-t-green-600 border border-slate-400 grid grid-cols-myHomeTemplate mb-6"
    >
      <!-- Left column -->
      <div class="border-r border-r-slate-400 p-4 col-start-1 col-end-1">
        <h2 class="text-slate-900">Topic {{ currentTopic.id }}</h2>
        <p class="text-slate-500 text-xs font-semibold mb-2">Key Statistics</p>

        <div class="flex flex-col justify-center items-center bg-slate-100">
          <p class="text-blue-700 text-sm font-semibold my-6">YOUR STATS</p>
          <ul class="flex justify-center gap-8 items-center mb-6">
            <li>
              <p class="text-blue-700 text-sm font-semibold mb-2">
                {{ currentTopic.progression }}%
              </p>
              <p class="text-blue-700 text-xs">Done</p>
            </li>
            <li>
              <img
                :src="users[0].imgUrl"
                alt="user"
                class="h-10 w-10 border-2 border-blue-700 rounded-full object-cover shadow-md"
              />
            </li>
            <li>
              <p class="text-blue-700 text-sm font-semibold mb-2">
                {{ numOfCompletTask }}/{{ currentTopic.tasks.length }}
              </p>
              <p class="text-blue-700 text-xs">effort</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right column -->

      <div class="border-r border-r-slate-400 p-4 col-start-2 col-end-2">
        <h2 class="">Tasks</h2>
        <p class="text-slate-500 text-xs font-semibold">
          {{ currentTopic.tasks.length }} tasks are assigned to you
        </p>

        <base-card
          v-for="task in currentTopic.tasks"
          :key="task.id"
          class="flex items-center mb-2"
        >
          <div
            class="flex gap-1 items-center p-1 rounded-sm mr-2"
            :class="{
              myInProgress: task.status === 'InProgress',
              myNextUp: task.status === 'NextUp',
              myComplete: task.status === 'Complete',
              myUnknown: task.status === 'Unknown',
            }"
          >
            <p>{{ task.month }}</p>
            <p>{{ task.date }}</p>
          </div>
          <p>{{ task.detail }}</p>
        </base-card>
      </div>
    </main>

    <!-- All topic -->
    <p class="text-green-900 font-semibold">All Topic</p>
    <div class="flex gap-1">
      <p class="text-slate-500 text-xs font-semibold">
        Remaining | {{ topics.length }} topics,
      </p>
      <p class="text-slate-500 text-xs font-semibold mb-6">
        Progression | {{ allTopicProgression }}%
      </p>
    </div>

    <base-button mode="my-base-button-inline-block" link to="/topics/1">
      <div
        class="w-44 h-10 mb-2 flex justify-center items-center gap-2 shadow-sm text-center p-1 rounded-md bg-black"
      >
        <PresentationChartLineIcon
          class="h-8 w-8 fill-blue-50 px-2 border-r border-r-slate-50"
        ></PresentationChartLineIcon>

        <p class="text-sm text-slate-50 px-2">View all topics</p>
      </div>
    </base-button>

    <base-card class="grid grid-cols-4 gap-4">
      <div
        class="w-24 h-24 relative mx-auto"
        v-for="topic in topics"
        :key="topic.id"
      >
        <div class="relative w-full h-full">
          <div
            class="absolute top-0 left-0 bg-slate-50 rounded-full w-full h-full"
          ></div>
          <div
            class="absolute top-0 left-0 transform -rotate-90 origin-center w-full h-full"
          >
            <div
              class="progress-circle bg-transparent border-teal-500 border-8 rounded-full w-full h-full clip-auto"
              :style="clipPathStyle(topic)"
            ></div>
            <div
              class="before-progression"
              style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            ></div>
          </div>
          <div
            class="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full"
          >
            <p>Topic {{ topic.id }}</p>
            <p class="text-teal-600 font-semibold text-sm">
              {{ topic.progression }}%
            </p>
          </div>
        </div>
      </div>
    </base-card>
  </section>
</template>

<style scoped>
.my-section-home,
.my-section-login {
  @apply ml-72 mr-8 text-slate-800 overflow-hidden;
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

/* progression */

.before-progression {
  @apply absolute inset-0 bg-transparent border-teal-200 border-8 rounded-full w-full h-full -z-10;
}
</style>
