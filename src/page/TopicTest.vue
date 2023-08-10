<script setup>
import { PresentationChartLineIcon } from "@heroicons/vue/24/solid";

import { useRoute } from "vue-router";
import { computed, inject, ref } from "vue";
import RegisTopic from "../components/topics/RegisTopic.vue";

const topics = inject("topics");

const route = useRoute();

const isAddTopic = ref(false);

const isTopicsPath = computed(() => {
  return route.path === `/topics/1`;
});

function changIsAddTopictoTrue() {
  isAddTopic.value = true;
}

function changIsAddTopictoFalse() {
  isAddTopic.value = false;
}

function topicRoute(topic) {
  return `/topics/1/${topic.id}`;
}
</script>

<template>
  <RegisTopic
    v-if="isAddTopic"
    :show="isAddTopic"
    @close="changIsAddTopictoFalse"
  ></RegisTopic>
  <section class="my-section-topics">
    <main class="py-10 px-20 ml-60 text-slate-800" v-if="isTopicsPath">
      <div class="flex justify-between items-center mb-4">
        <div class="flex gap-4 justify-center items-center">
          <PresentationChartLineIcon
            class="h-12 w-12"
          ></PresentationChartLineIcon>
          <h1 class="md:text-4xl 2xl:text-5xl font-bold">All Activity</h1>
        </div>

        <!-- <the-top-header></the-top-header> -->
      </div>

      <p
        class="text-slate-500 opacity-70 mb-24 md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
      >
        Click
        <base-button
          mode="my-base-button-inline-block"
          @click="changIsAddTopictoTrue"
        >
          <span
            class="bg-slate-900 bg-opacity-10 p-1 text-blue-600 font-semibold md:text-xs lg:text-sm xl:text-base 2xl:text-lg;"
            >+ New
          </span>
        </base-button>

        To create new list and wait for project manager card.
      </p>

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

    <the-header-test></the-header-test>

    <RouterView></RouterView>
  </section>
</template>

<style scoped>
.my-section-topics {
  @apply relative;
}

.my-card-container-topics {
  @apply sm:grid sm:grid-cols-3 sm:gap-4
  md:gap-4
  lg:gap-6
  xl:gap-6
  2xl:gap-8;
}
</style>
