<script setup>
import { BeakerIcon } from "@heroicons/vue/24/solid";
import { ArrowsUpDownIcon } from "@heroicons/vue/24/solid";
import { RectangleGroupIcon } from "@heroicons/vue/24/solid";
import { Cog8ToothIcon } from "@heroicons/vue/24/solid";
import { PresentationChartLineIcon } from "@heroicons/vue/24/solid";
import { PlayIcon } from "@heroicons/vue/24/solid";

import { inject } from "vue";

const topics = inject("topics");

function topicRoute(topic) {
  return `/topics/1/topic${topic.id}`;
}
</script>

<template>
  <header
    class="absolute top-0 left-0 h-full w-1/5 p-6 bg-slate-900 bg-opacity-10 text-slate-900 flex flex-col"
  >
    <base-card class="my-top-card">
      <BeakerIcon class="bg-blue-600 rounded-full p-1 h-6 w-6"></BeakerIcon>
      <p class="text-center">OWW Studio</p>
      <ArrowsUpDownIcon class="rounded-full h-3 w-3"></ArrowsUpDownIcon>
    </base-card>
    <ul class="my-6 px-4 flex flex-col gap-4">
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

    <ul class="my-6 px-4 flex flex-col gap-3">
      <base-button
        v-for="topic in topics"
        :key="topic.id"
        link
        :to="topicRoute(topic)"
      >
        <li class="my-list2">
          <PlayIcon class="my-playIcon"></PlayIcon>
          <p class="my-topic-emoji">{{ topic.emoji }}</p>
          <p class="my-topic-detail">{{ topic.datail }}</p>
        </li>
      </base-button>
    </ul>
  </header>
</template>

<style scoped>
.my-top-card {
  @apply gap-2 
  sm:flex sm:flex-col sm:justify-center sm:items-center
  /* md: */
  lg:flex-row
  xl:text-lg;
}
.my-list {
  @apply sm:text-sm sm:flex sm:flex-col sm:justify-center sm:items-center
  /* md:text-sm md:flex md:flex-col md:justify-center md:items-center */
  lg:text-base lg:flex lg:flex-row gap-3 lg:justify-start lg:items-center text-slate-500 text-opacity-50
  xl:text-lg;
}

.my-list-icon {
  @apply sm:h-7 w-7
  md:h-10 md:w-10
  lg:h-6 lg:w-6;
}

.my-list2 {
  @apply sm:flex  sm:justify-center sm:items-center sm:text-base 
  /* md:flex  md:justify-center md:items-center md:text-base    */
  lg:flex gap-2 lg:justify-start lg:items-center  
  xl:text-lg;
}

.my-playIcon {
  @apply fill-slate-500 opacity-70 
  sm:hidden
  md:hidden
  lg:block lg:h-4 lg:w-4
  xl:text-lg;
}

.my-topic-detail {
  @apply sm:hidden
  md:block 
  lg:block
  xl:text-lg;
}

/* .my-topic-emoji {
  @apply md:bg-black md:bg-opacity-20 md:rounded-full md:p-1
  lg:bg-opacity-0;
} */
</style>
