<script setup>
import { BeakerIcon } from "@heroicons/vue/24/solid";
import { ArrowsUpDownIcon } from "@heroicons/vue/24/solid";
import { RectangleGroupIcon } from "@heroicons/vue/24/solid";
import { Cog8ToothIcon } from "@heroicons/vue/24/solid";
import { PresentationChartLineIcon } from "@heroicons/vue/24/solid";
import { PlayIcon } from "@heroicons/vue/24/solid";

import { useRoute } from "vue-router";
import { inject } from "vue";

const route = useRoute();
console.log(route.params);

const topics = inject("topics");

function topicRoute(topic) {
  return `/daily-task-project/topics/1/topic${topic.id}`;
}
</script>

<template>
  <header
    class="absolute top-0 left-0 min-h-screen w-64 px-6 py-10 bg-slate-900 bg-opacity-10 text-slate-900 flex flex-col"
  >
    <base-card class="my-top-card">
      <BeakerIcon class="bg-blue-600 rounded-full p-1 h-6 w-6"></BeakerIcon>
      <p class="text-center">OWW Studio</p>
      <ArrowsUpDownIcon class="rounded-full h-3 w-3 ml-2"></ArrowsUpDownIcon>
    </base-card>
    <ul class="my-10 px-4 flex flex-col gap-6">
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

      <base-button link to="/daily-task-project/topics/1">
        <li class="my-list">
          <PresentationChartLineIcon
            class="my-list-icon"
          ></PresentationChartLineIcon>
          <p>All Activity</p>
        </li>
      </base-button>
    </ul>

    <ul class="px-4 flex flex-col gap-3">
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
            showCard: route.params.topic1 === `topic${topic.id}`,
          }"
        >
          <PlayIcon class="my-playIcon"></PlayIcon>
          <p>{{ topic.emoji }}</p>
          <p class="my-topic-detail">{{ topic.datail }}</p>
        </li>
      </base-button>
    </ul>
  </header>
</template>

<style scoped>
.my-top-card {
  @apply gap-2 font-semibold
  sm:flex sm:flex-col sm:justify-center sm:items-center
  /* md: */
  lg:flex-row lg:text-lg
  xl:text-xl;
}
.my-list {
  @apply font-semibold
  sm:text-sm sm:flex sm:flex-col sm:justify-center sm:items-center
  /* md:text-sm md:flex md:flex-col md:justify-center md:items-center */
  lg:text-lg lg:flex lg:flex-row gap-3 lg:justify-start lg:items-center text-slate-500 text-opacity-50
  xl:text-xl;
}

.my-list-icon {
  @apply sm:h-7 sm:w-7
  md:h-10 md:w-10
  lg:h-6 lg:w-6;
}

.my-list2 {
  @apply sm:flex  sm:justify-center sm:items-center sm:text-base 
  /* md:flex  md:justify-center md:items-center md:text-base    */
  lg:flex gap-2 lg:justify-start lg:items-center lg:text-base 
  xl:text-lg;
}

.showCard {
  @apply px-2 py-4 shadow-md bg-slate-50 rounded-lg;
}

.my-playIcon {
  @apply fill-slate-500 opacity-70 
  sm:hidden
  md:hidden
  lg:block lg:h-4 lg:w-4;
}

.my-topic-detail {
  @apply sm:hidden
  md:block 
  lg:block;
}
</style>
