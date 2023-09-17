<script setup>
import { PhDotsThreeCircleVertical } from "@phosphor-icons/vue";

import {
  BeakerIcon,
  ArrowsUpDownIcon,
  RectangleGroupIcon,
  Cog8ToothIcon,
  PresentationChartLineIcon,
  PlayIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/solid";

import { useRoute } from "vue-router";
import { ref, computed, inject } from "vue";
import useValidateLogin from "../hooks/validateLogin";
import useControlMenu from "../hooks/controlMenu";

const route = useRoute();

const topics = inject("topics");

function topicRoute(topic) {
  return `/topics/1/${topic.id}`;
}

// const isPopupMenu = ref(false);

const { isPopupMenu } = useControlMenu();

console.log(route.path);

const controlAllTasks = computed(() => {
  if (route.path === "/") {
    return false;
  } else {
    return true;
  }
});

// User
const { logout } = useValidateLogin();
</script>

<template>
  <section class="section-the-header">
    <header>
      <base-card mode="my-base-card-for-the-header" class="my-top-card">
        <BeakerIcon
          class="bg-blue-600 rounded-full p-1 sm:h-8 sm:w-8 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8"
        ></BeakerIcon>
        <p class="text-center font-bold">OWW Studio</p>
        <ArrowsUpDownIcon
          class="fill-blue-600 rounded-full sm:h-4 sm:w-4 lg:h-3 lg:w-3 2xl:h-5 2xl:w-5 ml-2"
        ></ArrowsUpDownIcon>
      </base-card>
      <ul class="sm:hidden lg:my-10 lg:px-4 lg:flex lg:flex-col lg:gap-6">
        <base-button link to="/">
          <li class="my-list">
            <RectangleGroupIcon class="my-list-icon"></RectangleGroupIcon>
            <p>Dashboard</p>
          </li>
        </base-button>
        <li class="my-list">
          <Cog8ToothIcon class="my-list-icon"></Cog8ToothIcon>
          <p>Setting</p>
        </li>

        <base-button link to="/topics/1">
          <li class="my-list">
            <PresentationChartLineIcon
              class="my-list-icon"
            ></PresentationChartLineIcon>
            <p>All Activity</p>
          </li>
        </base-button>
      </ul>

      <section v-if="controlAllTasks">
        <ul class="sm:hidden px-4 lg:flex lg:flex-col gap-3">
          <base-button
            class="mb-2"
            v-for="topic in topics"
            :key="topic.id"
            link
            :to="topicRoute(topic)"
          >
            <li
              class="my-list2"
              :class="{
                showCard: route.path === `/topics/1/${topic.id}`,
              }"
            >
              <PlayIcon class="my-playIcon"></PlayIcon>
              <p>{{ topic.emoji }}</p>
              <p class="my-topic-detail">{{ topic.datail }}</p>
            </li>
          </base-button>
        </ul>
      </section>
    </header>

    <PhDotsThreeCircleVertical
      class="text-slate-400 sm:h-8 sm:w-8 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 sm:block lg:hidden"
      @click="isPopupMenu = true"
    ></PhDotsThreeCircleVertical>

    <!-- responsive sm -->
    <main class="z-50">
      <div
        class="absolute top-0 left-0 w-screen h-screen bg-slate-50 bg-opacity-90 lg:hidden"
        v-if="isPopupMenu"
        @click="isPopupMenu = false"
      ></div>
      <div
        class="sm:fixed sm:top-1/2 sm:left-1/2 -translate-x-1/2 -translate-y-1/2"
        v-if="isPopupMenu"
      >
        <ul class="sm:my-10 sm:px-4 sm:flex sm:flex-col sm:gap-6 lg:hidden">
          <base-button link to="/">
            <li class="my-list">
              <RectangleGroupIcon class="my-list-icon"></RectangleGroupIcon>
              <p>Dashboard</p>
            </li>
          </base-button>
          <li class="my-list">
            <Cog8ToothIcon class="my-list-icon"></Cog8ToothIcon>
            <p>Setting</p>
          </li>

          <base-button link to="/topics/1">
            <li class="my-list">
              <PresentationChartLineIcon
                class="my-list-icon"
              ></PresentationChartLineIcon>
              <p>All Activity</p>
            </li>
          </base-button>
        </ul>

        <section v-if="controlAllTasks">
          <ul class="sm:px-4 sm:flex sm:flex-col sm:gap-3 lg:hidden">
            <base-button
              class="mb-2"
              v-for="topic in topics"
              :key="topic.id"
              link
              :to="topicRoute(topic)"
            >
              <li
                class="my-list2"
                :class="{
                  showCard: route.path === `/topics/1/${topic.id}`,
                }"
              >
                <PlayIcon class="my-playIcon"></PlayIcon>
                <p>{{ topic.emoji }}</p>
                <p class="my-topic-detail">{{ topic.datail }}</p>
              </li>
            </base-button>
          </ul>
        </section>
      </div>
    </main>

    <footer>
      <button class="flex my-list" @click="logout">
        <ArrowRightOnRectangleIcon
          class="text-slate-400 sm:h-8 sm:w-8 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12"
        ></ArrowRightOnRectangleIcon>
        <p class="sm:hidden lg:block">Log out</p>
      </button>
    </footer>
  </section>
</template>

<style scoped>
.section-the-header {
  @apply bg-slate-900 bg-opacity-10 text-slate-900
  sm:fixed sm:top-0 sm:left-0 sm:w-full sm:min-h-fit  sm:flex sm:justify-between  sm:items-center sm:p-2 sm:z-40
  lg:fixed lg:top-0 lg:left-0 lg:flex lg:flex-col lg:justify-between lg:min-h-screen lg:h-full lg:w-72 lg:px-6 lg:py-10;
}
.my-top-card {
  @apply font-semibold gap-2
  sm:flex sm:flex-row sm:justify-center sm:items-center sm:text-base
  /* md: */
  lg:flex-row lg:text-lg 
  2xl:text-2xl;
}
.my-list {
  @apply font-semibold
  sm:text-lg sm:flex sm:flex-col sm:justify-center sm:items-center
  /* md:text-sm md:flex md:flex-col md:justify-center md:items-center */
  lg:text-lg lg:flex lg:flex-row gap-3 lg:justify-start lg:items-center text-slate-500 text-opacity-50
  2xl:text-2xl;
}

.my-list-icon {
  @apply text-slate-400
  sm:h-12 sm:w-12
  /* md:h-10 md:w-10 */
  lg:h-10 lg:w-10
  2xl:h-12 2xl:w-12;
}

.my-list2 {
  @apply text-slate-400 font-semibold
  sm:flex  sm:justify-center sm:items-center sm:text-lg 
  lg:flex gap-2 lg:justify-start lg:items-center lg:text-lg 
  2xl:text-xl;
}

.showCard {
  @apply px-2 py-4 shadow-md bg-slate-50 text-slate-950 font-bold rounded-lg animate-pulse;
}

.my-playIcon {
  @apply fill-slate-500 opacity-70 
  sm:hidden
  lg:block lg:h-4 lg:w-4
  2xl:h-6 2xl:w-6;
}

.my-topic-detail {
  @apply sm:block
 
  lg:block;
}
</style>
