<script setup>
import { PresentationChartLineIcon } from "@heroicons/vue/24/solid";

import { useRoute } from "vue-router";
import { computed, inject } from "vue";

const topics = inject("topics");

const route = useRoute();
console.log(route.path);

const isTopicsPath = computed(() => {
  return route.path === `/daily-task-project/topics/1`;
});

function topicRoute(topic) {
  return `/daily-task-project/topics/1/topic${topic.id}`;
}
</script>

<template>
  <section class="my-section-topics">
    <main class="p-10 ml-60 text-slate-800" v-if="isTopicsPath">
      <div class="flex justify-between items-center mb-24">
        <div class="flex gap-4 justify-center items-center">
          <PresentationChartLineIcon
            class="h-12 w-12"
          ></PresentationChartLineIcon>
          <h1 class="md:text-4xl 2xl:text-5xl font-bold">All Activity</h1>
        </div>

        <the-top-header></the-top-header>
      </div>

      <div class="my-card-container-topics">
        <div v-for="topic in topics" :key="topic.id">
          <base-card class="my-base-card" draggable="true">
            <base-button link :to="topicRoute(topic)">
              <div
                class="flex justify-center items-center font-semibold md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              >
                <h2 class="mr-8">{{ topic.emoji }}</h2>
                <h2>{{ topic.datail }}</h2>
              </div>
            </base-button>
          </base-card>
        </div>
      </div>
    </main>

    <the-header></the-header>

    <RouterView></RouterView>
  </section>
</template>

<style scoped>
.my-section-topics {
  @apply relative 
  
  
  xl:mx-36
  2xl:mx-64;
}

.my-card-container-topics {
  @apply sm:grid sm:grid-cols-3 sm:gap-4
  md:gap-4
  lg:gap-6
  xl:gap-6
  2xl:gap-8;
}
</style>
