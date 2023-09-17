<script setup>
import { PresentationChartLineIcon } from "@heroicons/vue/24/solid";
import { computed, inject, onMounted, ref } from "vue";
import { useGetTopics, useGetTasks } from "../components/hooks/fetchTopicData";
import useControlMenu from "../components/hooks/controlMenu";

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

// function clipPathStyle(topic) {
//   return `clip-path: polygon(0 0, 100% 0, 100% ${topic.progression}%, 0 ${topic.progression}%);`;
// }

function clipPathStyle(topic) {
  return {
    clipPath: `polygon(0 0, 100% 0, 100% ${topic.progression}%, 0 ${topic.progression}%)`,
  };
}

console.log(currentTopic.value);

const topicSelected = computed(() => {
  return topics.value.find((topic) => topic.id === currentTopic.value.id);
});

// popup menu for sm responsive
const { isPopupMenu } = useControlMenu();

onMounted(async () => {
  await useGetTopics(topics, isLoading);
  await useGetTasks(topicSelected, currentTopic.value.id, isLoading);
});
</script>

<template>
  <div class="2xl:container 2xl:mx-auto">
    <base-spinner v-if="isLoading"></base-spinner>
    <section class="my-section-home" v-if="!isLoading">
      <the-header v-if="true"></the-header>
      <header
        class="mt-10 mb-8 py-8 max-h-48 px-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-sm flex flex-col justify-end"
      >
        <h3 class="font-bold text-slate-300 sm:text-lg lg:text-sm 2xl:text-xl">
          OWW studio
        </h3>
        <h2
          class="capitalize text-lg text-blue-50 font-bold sm:text-3xl lg:text-xl 2xl:text-4xl"
        >
          Welcome back, {{ userName }} !
        </h2>
      </header>

      <p class="my-header-paragraph-home">Current Topic</p>

      <div class="flex gap-1">
        <p class="my-header-sub-paragraph-home">
          Status | {{ currentTopic.status }},
        </p>
        <p class="my-header-sub-paragraph-home mb-6">
          Progression | {{ currentTopic.progression }}%
        </p>
      </div>

      <main
        class="w-full lg:max-h-[32rem] bg-white border-t-8 border-t-blue-600 border border-slate-400 sm:flex sm:flex-col xl:grid xl:grid-cols-myHomeTemplate mb-6 overflow-y-auto"
      >
        <!-- Left column -->
        <div class="border-r border-r-slate-400 p-4 col-start-1 col-end-1">
          <h2 class="my-main-header-home">Topic {{ currentTopic.id }}</h2>
          <p class="text-slate-500 mb-2 my-main-sub-paragraph-home">
            Key Statistics
          </p>

          <div class="flex flex-col justify-center items-center bg-slate-100">
            <p class="text-slate-700 lg:text-base 2xl:text-xl font-bold my-6">
              YOUR STATS
            </p>
            <ul
              class="sm:flex sm:flex-row justify-center gap-8 items-center mb-6"
            >
              <li>
                <p class="text-slate-700 my-main-paragraph-home font-bold mb-2">
                  {{ currentTopic.progression }}%
                </p>
                <p class="text-slate-400 my-main-paragraph-home font-bold">
                  Done
                </p>
              </li>
              <li>
                <img
                  :src="users[0].imgUrl"
                  alt="user"
                  class="sm:h-32 sm:w-32 lg:h-12 lg:w-12 2xl:h-16 2xl:w-16 border-2 border-slate-700 rounded-full object-cover shadow-md"
                />
              </li>
              <li>
                <p class="text-slate-700 my-main-paragraph-home font-bold mb-2">
                  {{ numOfCompletTask }}/{{ currentTopic.tasks.length }}
                </p>
                <p class="text-slate-400 my-main-paragraph-home font-bold">
                  effort
                </p>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right column -->

        <div class="border-r border-r-slate-400 p-4 col-start-2 col-end-2">
          <h2 class="my-main-header-home">Tasks</h2>
          <p class="text-slate-500 my-main-sub-paragraph-home font-semibold">
            {{ currentTopic.tasks.length }} tasks are assigned to you
          </p>

          <div
            v-for="task in currentTopic.tasks"
            :key="task.id"
            class="flex items-center mb-2"
          >
            <div
              class="flex gap-1 items-center p-2 rounded-sm mr-2"
              :class="{
                myInProgress: task.status === 'InProgress',
                myNextUp: task.status === 'NextUp',
                myComplete: task.status === 'Complete',
                myUnknown: task.status === 'Unknown',
              }"
            >
              <p class="my-main-paragraph-home font-semibold">
                {{ task.month }}
              </p>
              <p class="my-main-paragraph-home font-semibold">
                {{ task.date }}
              </p>
            </div>
            <p class="my-main-paragraph-home">{{ task.detail }}</p>
          </div>
        </div>
      </main>

      <!-- All topic -->
      <p class="my-header-paragraph-home">All Topic</p>
      <div class="flex gap-1">
        <p class="my-header-sub-paragraph-home">
          Remaining | {{ topics.length }} topics,
        </p>
        <p class="my-header-sub-paragraph-home mb-6">
          Progression | {{ allTopicProgression }}%
        </p>
      </div>

      <base-button
        mode="my-base-button-inline-block"
        class="mb-4"
        link
        to="/topics/1"
      >
        <div
          class="max-w-sm max-h-sm mb-2 flex justify-center items-center gap-2 shadow-sm text-center p-1 rounded-md bg-black"
        >
          <PresentationChartLineIcon
            class="sm:h-12 sm:w-12 lg:h-8 lg:w-8 2xl:h-12 2xl:w-12 fill-blue-50 px-2 border-r border-r-slate-50"
          ></PresentationChartLineIcon>

          <p class="my-main-paragraph-home font-semibold text-slate-50 px-2">
            View all topics
          </p>
        </div>
      </base-button>

      <div
        class="sm:flex sm:flex-col lg:grid lg:grid-cols-4 gap-8 py-8 bg-white border-t-8 border-t-blue-600 border border-slate-400"
      >
        <div
          class="sm:w-32 sm:h-32 lg:w-32 lg:h-32 2xl:w-44 2xl:h-44 relative mx-auto sm:-z-0"
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
                class="progress-circle bg-transparent border-blue-200 sm:border-8 lg:border-8 2xl:border-[12px] rounded-full w-full h-full clip-auto"
              ></div>
              <div
                class="before-progression"
                :style="clipPathStyle(topic)"
              ></div>
            </div>
            <div
              class="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full"
            >
              <p class="my-header-paragraph-home">Topic {{ topic.id }}</p>
              <p class="text-slate-400 font-semibold my-header-paragraph-home">
                {{ topic.progression }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.my-section-home {
  @apply text-slate-800 overflow-x-hidden
  sm:mt-20
  lg:mt-0 lg:ml-72 2xl:ml-80 px-12;
}

/* .my-section-login */
.my-header-paragraph-home {
  @apply text-slate-900 font-semibold sm:text-xl lg:text-base 2xl:text-xl;
}

.my-header-sub-paragraph-home {
  @apply text-slate-500 sm:text-base lg:text-xs 2xl:text-base font-semibold;
}

.my-main-header-home {
  @apply text-slate-900 sm:text-lg lg:text-base 2xl:text-xl;
}

.my-main-paragraph-home {
  @apply sm:text-lg lg:text-sm 2xl:text-lg;
}

.my-main-sub-paragraph-home {
  @apply sm:text-base lg:text-xs 2xl:text-base font-semibold sm:mb-6 lg:mb-2;
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
  @apply absolute inset-0 bg-transparent border-blue-500 sm:border-8 lg:border-8 2xl:border-[12px] rounded-full w-full h-full;
}

/* responsive sm */

.controlProgrssionForSm {
  @apply sm:hidden;
}
</style>

<!-- 
  style="clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%)"
 -->

<!-- 
   :style="clipPathStyle(topic)"
  -->
