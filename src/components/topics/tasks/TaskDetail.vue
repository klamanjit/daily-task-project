<script setup>
// General
import { computed, inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useControlMenu from "../../hooks/controlMenu";

// Component
import RegisterTask from "./RegisterTask.vue";
import EditTask from "./EditTask.vue";
import RemoveTask from "./RemoveTask.vue";
import AddTaskUser from "./AddTaskUser.vue";
import {
  useGetTasks,
  useSearchTask,
  useGetTopics,
} from "../../hooks/fetchTopicData";

// Icon
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
  ClockIcon,
  PlusCircleIcon,
  ArrowPathRoundedSquareIcon,
  PlusIcon,
} from "@heroicons/vue/24/solid";

import { PhUserPlus } from "@phosphor-icons/vue";

const route = useRoute();

// Topic section
const topics = inject("topics");
const users = inject("users");

const topicSelected = computed(() => {
  const selectedTopic = topics.value.find(
    (topic) => topic.id === route.params.topicId
  );

  return selectedTopic || {};
});

const topicHeader = computed(() => {
  return (
    (topicSelected.value.emoji || "") +
    "  " +
    (topicSelected.value.datail || "")
  );
});

// Task section
const topicTasks = computed(() => {
  return (topicSelected.value && topicSelected.value.tasks) || [];
});

const nextUpTask = computed(() => {
  return (topicSelected.value.tasks || []).filter(
    (task) => task.status === "NextUp"
  );
});

const inProgressTask = computed(() => {
  return (topicSelected.value.tasks || []).filter(
    (task) => task.status === "InProgress"
  );
});

const completeTask = computed(() => {
  return (topicSelected.value.tasks || []).filter(
    (task) => task.status === "Complete"
  );
});

// Show task edit menu
function toggleEditMenu(task) {
  task.editStatus = !task.editStatus;

  const notSelectedTask = topicSelected.value.tasks.filter(
    (t) => t.id !== task.id
  );

  notSelectedTask.forEach((notSelected) => (notSelected.editStatus = false));
}

// Control menu
const {
  isAddItem,
  changeAddItemToTrue,
  changeAddItemToFalse,
  isEditItem,
  openEditItem,
  isRemoveItem,
  openRemoveItem,
  isAddUser,
  openAddUser,
  closeMenu,
  isLoading,
} = useControlMenu();

// clear input after fetch
function clear(titleValue, searchBtn) {
  searchBtn = false;
  titleValue = "";
}

async function searchTask(titleValue, searchBtn) {
  await useSearchTask(
    titleValue,
    searchBtn,
    topicSelected,
    route.params.topicId,
    clear,
    isLoading
  );
}

async function getTasks() {
  await useGetTasks(topicSelected, route.params.topicId, isLoading);
}

onMounted(async () => {
  await useGetTopics(topics, isLoading);
  await useGetTasks(topicSelected, route.params.topicId, isLoading);
});
</script>

<template>
  <div class="2xl:container 2xl:mx-auto">
    <base-spinner v-if="isLoading"></base-spinner>
    <section
      class="py-10 px-20 phone:mt-20 lg:mt-0 lg:ml-72 text-slate-800"
      v-if="!isLoading"
    >
      <div
        class="phone:z-40 phone:flex phone:justify-between phone:items-center lg:items-center phone:fixed phone:bottom-0 phone:left-0 phone:w-screen phone:h-20 phone:bg-slate-400 phone:p-2 lg:static lg:flex lg:justify-between lg:w-full lg:bg-white lg:mb-20"
      >
        <h1
          class="phone:text-lg sm:text-xl lg:text-4xl 2xl:text-5xl font-bold text-center"
        >
          {{ topicHeader }}
        </h1>

        <the-top-header @search="searchTask"></the-top-header>
      </div>

      <div class="flex items-center gap-2 phone:mb-6">
        <button class="my-reload-btn" @click="changeAddItemToTrue">
          <PlusIcon
            class="phone:h-6 phone:w-6 sm:h-6 sm:w-6 lg:h-5 lg:w-5 2xl:h-6 2xl:w-6 inline-block"
          ></PlusIcon>

          <p class="border-l px-2 lg:text-base 2xl:text-xl">New Task</p>
        </button>

        <button
          class="w-10 h-10 shadow-sm text-center p-1 rounded-md bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center"
          @click="getTasks"
        >
          <ArrowPathRoundedSquareIcon
            class="phone:h-6 phone:w-6 sm:h-6 sm:w-6 lg:h-4 lg:w-4 2xl:h-5 2xl:w-5 fill-blue-50"
          ></ArrowPathRoundedSquareIcon>
        </button>
      </div>
      <header
        class="phone:hidden sm:grid sm:grid-cols-3 phone:gap-2 phone:mb-6 lg:gap-4 xl:gap-6 lg:p-6 2xl:p-8"
      >
        <div class="my-grid-topic">
          <p>Next up</p>
          <p class="my-grid-p">{{ nextUpTask.length }}</p>
        </div>
        <div class="my-grid-topic">
          <p>In Progress</p>
          <p class="my-grid-p">{{ inProgressTask.length }}</p>
        </div>
        <div class="my-grid-topic">
          <p>Complete</p>
          <p class="my-grid-p">{{ completeTask.length }}</p>
        </div>
      </header>

      <main class="my-card-container lg:p-6 2xl:p-8">
        <div v-for="task in topicTasks" :key="task.id">
          <div
            class="blackdrop"
            v-if="task.editStatus"
            @click="task.editStatus = false"
          ></div>
          <base-card class="my-base-card-task relative" draggable="true">
            <nav class="flex justify-between items-center mb-1">
              <p
                class="bg-slate-500 bg-opacity-10 rounded-full text-base text-center h-5 w-5"
              >
                {{ task.emoji }}
              </p>

              <!-- edite menu button -->
              <div>
                <base-button
                  class="h-5 w-5 fill-slate-500 opacity-70"
                  @click="toggleEditMenu(task)"
                >
                  <EllipsisHorizontalIcon></EllipsisHorizontalIcon>
                </base-button>

                <base-dialog
                  :show="task.editStatus"
                  @close="closeMenu(task)"
                  mode2="my-edit-dialog"
                  title="Adjust task"
                >
                  <div class="flex mb-2">
                    <base-button
                      class="text-xs flex justify-center items-center gap-2"
                      mode="my-basic-style-edit"
                      @click="openEditItem(task)"
                    >
                      <PencilSquareIcon class="h-4 w-4"></PencilSquareIcon>
                      Edit
                    </base-button>
                    <base-button
                      class="text-xs flex justify-center items-center gap-2"
                      mode="my-basic-style-remove"
                      @click="openRemoveItem(task)"
                    >
                      <TrashIcon class="h-4 w-4"></TrashIcon>
                      Remove
                    </base-button>
                    <base-button
                      class="text-xs flex justify-center items-center gap-2"
                      mode="my-basic-style-addUser"
                      @click="openAddUser(task)"
                    >
                      <PhUserPlus class="h-4 w-4"></PhUserPlus>
                      Add user
                    </base-button>
                  </div>

                  <!-- import component -->

                  <EditTask v-if="isEditItem" :task-id="task.id"></EditTask>

                  <RemoveTask
                    v-if="isRemoveItem"
                    :task-id="task.id"
                  ></RemoveTask>
                  <AddTaskUser
                    v-if="isAddUser"
                    :task-id="task.id"
                  ></AddTaskUser>
                </base-dialog>
              </div>
            </nav>

            <p class="mb-1">
              <span class="font-semibold">{{ task.title }}</span
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
                <div class="font-semibold">{{ task.month }}</div>
                <div class="font-semibold">{{ task.date }}</div>
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

        <base-button
          class="w-full h-44 border border-d-slate-100 self-center"
          @click="changeAddItemToTrue"
        >
          <PlusCircleIcon class="h-7 w-7 inline-block mr-2"></PlusCircleIcon>
          <span class="text-sm">Add </span>
        </base-button>
      </main>

      <the-header></the-header>

      <base-dialog
        :show="isAddItem"
        @close="changeAddItemToFalse"
        title="Add new task"
      >
        <RegisterTask></RegisterTask>
      </base-dialog>
    </section>
  </div>
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
  @apply gap-6
  phone:flex phone:flex-col 
  lg:grid lg:grid-cols-2
  xl:grid xl:grid-cols-3;
}

.blackdrop {
  @apply fixed top-0 left-0 bg-slate-500 h-full w-full bg-opacity-30 z-40;
}

.my-base-card-task {
  @apply h-44 w-full  flex flex-col justify-between 
   md:text-xs
  lg:text-sm
  xl:text-base
  2xl:text-lg;
}

.my-reload-btn {
  @apply flex gap-2 justify-center items-center text-blue-50 font-semibold p-2  bg-gradient-to-tr from-blue-500 to-indigo-500  h-10 rounded-md shadow-sm;
}

/* Trasition */
.popup-enter-active,
.popup-leave-active {
  @apply transition-all duration-200 ease-in-out;
}

.popup-enter-from,
.popup-leave-to {
  @apply opacity-75 scale-0;
}

.popup-enter-to,
.popup-leave-from {
  @apply opacity-100 scale-100;
}
</style>
