<script setup>
import {
  PhDotsThreeCircleVertical,
  PhUsersThree,
  PhCalendarCheck,
} from "@phosphor-icons/vue";

import {
  ArrowsUpDownIcon,
  RectangleGroupIcon,
  PresentationChartLineIcon,
  PlayIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/solid";

import { useRoute } from "vue-router";
import { computed, inject } from "vue";

import useUserLogout from "../hooks/fetchUserLogout";
import useControlMenu from "../hooks/controlMenu";

const route = useRoute();

const topics = inject("topics");

function topicRoute(topic) {
  return `/topics/1/${topic.id}`;
}

const { isPopupMenu } = useControlMenu();

const controlAllTasks = computed(() => {
  if (route.path === "/" || route.path === "/users") {
    return false;
  } else {
    return true;
  }
});

// User
const { logout } = useUserLogout();
</script>

<template>
  <section class="section-the-header">
    <header>
      <base-card mode="my-base-card-for-the-header" class="my-top-card">
        <PhCalendarCheck
          class="bg-blue-600 fill-slate-100 rounded-full p-1 phone:h-8 phone:w-8 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8"
        ></PhCalendarCheck>
        <p class="phone:block sm:block text-center font-bold">OWW Studio</p>
        <ArrowsUpDownIcon
          class="phone:block sm:block fill-blue-600 rounded-full phone:h-4 phone:w-4 lg:h-3 lg:w-3 2xl:h-5 2xl:w-5 ml-2"
        ></ArrowsUpDownIcon>
      </base-card>
      <ul class="phone:hidden lg:my-10 lg:px-4 lg:flex lg:flex-col lg:gap-6">
        <base-button link to="/">
          <li class="my-list">
            <RectangleGroupIcon class="my-list-icon"></RectangleGroupIcon>
            <p>Dashboard</p>
          </li>
        </base-button>
        <base-button link to="/users">
          <li class="my-list">
            <PhUsersThree class="my-list-icon"></PhUsersThree>
            <p>All user</p>
          </li>
        </base-button>

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
        <ul class="phone:hidden px-4 lg:flex lg:flex-col gap-3">
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
      class="text-slate-400 phone:h-8 phone:w-8 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 phone:block lg:hidden"
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
        class="phone:fixed phone:top-1/2 phone:left-1/2 -translate-x-1/2 -translate-y-1/2"
        v-if="isPopupMenu"
      >
        <ul
          class="phone:my-10 phone:px-4 phone:flex phone:flex-col phone:gap-6 lg:hidden"
        >
          <base-button link to="/">
            <li class="my-list">
              <RectangleGroupIcon class="my-list-icon"></RectangleGroupIcon>
              <p>Dashboard</p>
            </li>
          </base-button>
          <base-button link to="/users">
            <li class="my-list">
              <PhUsersThree class="my-list-icon"></PhUsersThree>
              <p>All users</p>
            </li>
          </base-button>

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
          <ul
            class="phone:px-4 phone:flex phone:flex-col phone:gap-3 lg:hidden"
          >
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
          class="text-slate-400 phone:h-8 phone:w-8 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12"
        ></ArrowRightOnRectangleIcon>
        <p class="phone:hidden lg:block">Log out</p>
      </button>
    </footer>
  </section>
</template>

<style scoped>
.section-the-header {
  @apply bg-slate-900 bg-opacity-10 text-slate-900
  phone:fixed phone:top-0 phone:left-0 phone:w-full phone:min-h-fit  phone:flex phone:justify-between  phone:items-center phone:p-2 phone:z-40
  lg:fixed lg:top-0 lg:left-0 lg:flex lg:flex-col lg:justify-between lg:min-h-screen lg:h-full lg:w-72 lg:px-6 lg:py-10;
}
.my-top-card {
  @apply font-semibold gap-2
  phone:flex phone:flex-row phone:justify-center phone:items-center phone:text-base
  /* md: */
  lg:flex-row lg:text-lg 
  2xl:text-2xl;
}
.my-list {
  @apply font-semibold
  phone:text-lg phone:flex phone:flex-col phone:justify-center phone:items-center
  /* md:text-sm md:flex md:flex-col md:justify-center md:items-center */
  lg:text-lg lg:flex lg:flex-row gap-3 lg:justify-start lg:items-center text-slate-500 text-opacity-50
  2xl:text-2xl;
}

.my-list-icon {
  @apply text-slate-400
  phone:h-10 phone:w-10
  sm:h-12 sm:w-12
  /* md:h-10 md:w-10 */
  lg:h-10 lg:w-10
  2xl:h-12 2xl:w-12;
}

.my-list2 {
  @apply text-slate-400 font-semibold
  phone:flex  phone:justify-center phone:items-center phone:text-lg 
  lg:flex gap-2 lg:justify-start lg:items-center lg:text-lg 
  2xl:text-xl;
}

.showCard {
  @apply px-2 py-4 shadow-md bg-slate-50 text-slate-950 font-bold rounded-lg animate-pulse;
}

.my-playIcon {
  @apply fill-slate-500 opacity-70 
  phone:hidden
  lg:block lg:h-4 lg:w-4
  2xl:h-6 2xl:w-6;
}

.my-topic-detail {
  @apply phone:block
 
  lg:block;
}
</style>
