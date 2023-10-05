<script setup>
// heroic icon
import {
  PresentationChartLineIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowPathRoundedSquareIcon,
  EllipsisHorizontalIcon,
  FlagIcon,
} from "@heroicons/vue/24/solid";

import { PhUser, PhUserPlus } from "@phosphor-icons/vue";

// general
import { useRoute } from "vue-router";
import { computed, inject, onMounted, onBeforeMount, ref } from "vue";
import useControlMenu from "../components/hooks/controlMenu";
import {
  useGetTopics,
  useSearchTopic,
} from "../components/hooks/fetchTopicData";

// component
import RegisTopic from "../components/topics/RegisTopic.vue";
import EditTopic from "../components/topics/EditTopic.vue";
import RemoveTopic from "../components/topics/RemoveTopic.vue";
import AddTopicUser from "../components/topics/AddTopicUser.vue";
import useValidateLogin from "../components/hooks/validateLogin";

// Route
const route = useRoute();

const isTopicsPath = computed(() => {
  return route.path === `/topics/1`;
});

function topicRoute(topic) {
  return `/topics/1/${topic.id}`;
}

// User button
const isUserBtn = ref(false);
const userId = computed(() => {
  return localStorage.getItem("userId");
});

// Topic status
const topics = inject("topics");

const topicStatus = ref({
  val: "Show All",
  length: 2,
});

const topicsByStatus = computed(() => {
  if (topicStatus.value.val === "Show All") {
    return topics.value;
  }
  if (topicStatus.value.val === "Pending") {
    return topics.value.filter((topic) => topic.status === "Pending");
  }
  if (topicStatus.value.val === "Complete") {
    return topics.value.filter((topic) => topic.status === "Complete");
  }
});

function isStatusComplete(topic) {
  return topic.status === "Complete";
}

function isStatusPending(topic) {
  return topic.status === "Pending";
}

// Show topic edit menu
function toggleEditMenu(topic) {
  // topic.editStatus = !topic.editStatus;
  topic.editStatus = true;

  const notSelectedTopic = topics.value.filter((t) => t.id !== topic.id);
  notSelectedTopic.forEach((notSelected) => (notSelected.editStatus = false));
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
function clear() {
  isSeearchBtn.value = false;
  title.value.val = "";
}

// fetch Search Topic
const isSeearchBtn = ref(false);
const title = ref({
  val: "",
  isValid: false,
});

async function searchTopic() {
  await useSearchTopic(topics, clear, title, isLoading);
}

// User
const { logout } = useValidateLogin();

onMounted(async () => {
  await useGetTopics(topics, isLoading);
});
</script>

<template>
  <div class="2xl:container 2xl:mx-auto">
    <base-spinner v-if="isLoading"></base-spinner>
    <section class="my-section-topics" v-if="!isLoading">
      <main
        class="py-10 px-20 phone:mt-20 lg:mt-0 lg:ml-72 text-slate-800"
        v-if="isTopicsPath"
      >
        <div
          class="phone:fixed phone:inline-flex phone:bottom-0 phone:left-0 phone:w-screen phone:justify-between phone:items-center phone:h-20 phone:bg-slate-400 phone:p-2 lg:static lg:w-full lg:h-full lg:bg-white lg:flex-row lg:mb-20"
        >
          <div class="gap-4 inline-flex justify-center items-center">
            <PresentationChartLineIcon
              class="phone:h-6 phone:w-6 sm:h-6 sm:w-6 lg:h-12 lg:w-12 2xl:h-16 2xl:w-16"
            ></PresentationChartLineIcon>
            <h1
              class="phone:text-lg sm:text-xl lg:text-3xl 2xl:text-5xl font-bold"
            >
              All Topics
            </h1>
          </div>

          <div class="top-header inline-flex">
            <ul class="flex gap-3 text-slate-900 relative">
              <Transition name="slide">
                <div
                  v-if="isSeearchBtn"
                  class="absolute phone:top-1 sm:top-1.5 lg:top-0 2xl:top-2 -left-44"
                >
                  <form @submit.prevent="searchTopic">
                    <input
                      type="text"
                      id="title"
                      v-model="title.val"
                      placeholder="Search by topic's title"
                      class="block w-full phone:h-6 sm:h-6 lg:h-10 border-none bg-slate-200 mb-2 p-2 rounded-md focus:outline-none focus:bg-blue-50 text-sm"
                    />
                  </form>
                </div>
              </Transition>

              <base-button @click="isSeearchBtn = !isSeearchBtn">
                <li>
                  <MagnifyingGlassIcon class="topic-icon"></MagnifyingGlassIcon>
                </li>
              </base-button>

              <base-button @click="isUserBtn = !isUserBtn">
                <li class="relative">
                  <PhUser class="topic-icon"></PhUser>

                  <Transition name="popup">
                    <base-card
                      v-if="isUserBtn"
                      class="phone:hidden lg:block absolute w-20 lg:top-10 2xl:top-14 left-2 flex flex-col gap-1 text-xs"
                    >
                      <base-button
                        @click="logout"
                        class="border border-s-slate-200 p-1 text-slate-700 font-bold hover:bg-blue-500 hover:text-blue-50 transition-all duration-200 ease-in"
                      >
                        Log-out
                      </base-button>
                    </base-card>
                  </Transition>
                </li>
              </base-button>
            </ul>
          </div>
        </div>

        <!-- subhead add topic -->
        <div class="sm:flex sm:flex-row sm:justify-between mb-8">
          <div>
            <form class="flex gap-2 phone:mb-6 sm:mb-0">
              <base-card>
                <select
                  name="topic"
                  id="topic"
                  class="lg:text-base 2xl:text-xl text-slate-500 font-semibold bg-slate-50 focus:outline-none w-30"
                  v-model="topicStatus.val"
                >
                  <option value="Show All">Show All</option>
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </select>
              </base-card>

              <base-card>
                <base-button>
                  <ArrowPathRoundedSquareIcon
                    class="w-6 h-6"
                  ></ArrowPathRoundedSquareIcon>
                </base-button>
              </base-card>
            </form>
          </div>

          <base-button
            class="md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
            mode="my-base-button-inline-block"
            @click="changeAddItemToTrue"
          >
            <span
              class="bg-gradient-to-r from-sky-500 to-indigo-500 p-2 text-blue-50 rounded-md font-semibold lg:text-base 2xl:text-xl shadow-sm"
              >+ New Topic
            </span>
          </base-button>
        </div>

        <div class="font-bold p-2 flex">
          <h2 class="inline-block mr-2 lg:text-base 2xl:text-xl">
            {{ topicStatus.val }}
          </h2>
          <p
            class="inline-block w-5 h-5 text-center text-sm rounded-full bg-orange-500 text-orange-50"
          >
            {{ topicsByStatus.length }}
          </p>
        </div>
        <div>
          <div
            v-for="topic in topicsByStatus"
            :key="topic.id"
            class="xl:p-6 2xl:p-8"
          >
            <base-card class="my-card-container-topics" draggable="true">
              <h2 class="justify-self-center">{{ topic.emoji }}</h2>
              <base-button link :to="topicRoute(topic)">
                <div
                  class="flex justify-center items-center font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
                >
                  <h2
                    class="phone:text-base sm:text-lg lg:text-xl 2xl:text-2xl"
                  >
                    {{ topic.datail }}
                  </h2>
                </div>
              </base-button>

              <div class="flex justify-center items-center gap-2">
                <div
                  class="overflow-hidden h-2 text-xs flex rounded bg-teal-200 w-1/2"
                >
                  <div
                    :style="{ width: `${topic.progression}%` }"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                  ></div>
                </div>
                <p
                  class="justify-self-center phone:text-sm sm:text-base lg:text-lg 2xl:text-xl font-semibold text-slate-400"
                >
                  {{ topic.progression }}%
                </p>
              </div>

              <div class="flex gap-2 justify-center items-center">
                <p class="justify-self-center">{{ topic.status }}</p>
                <FlagIcon
                  class="phone:h-2 phone:w-2 sm:h-3 sm:w-3 xl:h-4 xl:w-4"
                  :class="{
                    myTopicStatusComplete: isStatusComplete(topic),
                    myTopicStatusPending: isStatusPending(topic),
                  }"
                ></FlagIcon>
              </div>

              <!-- edite menu button -->
              <div class="justify-self-center">
                <base-button
                  class="h-5 w-5 fill-slate-500 opacity-70"
                  @click="toggleEditMenu(topic)"
                >
                  <EllipsisHorizontalIcon></EllipsisHorizontalIcon>
                </base-button>
              </div>

              <base-dialog
                :show="topic.editStatus"
                @close="closeMenu(topic)"
                mode2="my-edit-dialog"
                title="Adjust topic"
              >
                <div class="flex mb-2">
                  <base-button
                    class="text-xs flex justify-center items-center gap-2"
                    mode="my-basic-style-edit"
                    @click="openEditItem(topic)"
                  >
                    <PencilSquareIcon class="h-4 w-4"></PencilSquareIcon>
                    Edit
                  </base-button>
                  <base-button
                    class="text-xs flex justify-center items-center gap-2"
                    mode="my-basic-style-remove"
                    @click="openRemoveItem(topic)"
                  >
                    <TrashIcon class="h-4 w-4"></TrashIcon>
                    Remove
                  </base-button>
                  <base-button
                    class="text-xs flex justify-center items-center gap-2"
                    mode="my-basic-style-addUser"
                    @click="openAddUser(topic)"
                  >
                    <PhUserPlus class="h-4 w-4"></PhUserPlus>
                    Add user
                  </base-button>
                </div>

                <!-- import component -->

                <EditTopic v-if="isEditItem" :topic-id="topic.id"></EditTopic>

                <RemoveTopic
                  v-if="isRemoveItem"
                  :topic-id="topic.id"
                ></RemoveTopic>

                <AddTopicUser
                  v-if="isAddUser"
                  :topic-id="topic.id"
                ></AddTopicUser>
              </base-dialog>
            </base-card>
          </div>
        </div>
      </main>

      <the-header></the-header>

      <base-dialog
        :show="isAddItem"
        @close="changeAddItemToFalse"
        title="Add new Topic"
      >
        <RegisTopic></RegisTopic>
      </base-dialog>

      <!-- <RouterView></RouterView> -->
    </section>
  </div>
</template>

<style scoped>
.my-section-topics {
  @apply relative;
}

.my-card-container-topics {
  @apply items-center 
  phone:grid phone:grid-cols-myTopicTemplate
  phone:text-sm sm:text-base phone:mb-6
  lg:text-lg lg:mb-8
  2xl:text-xl 2xl:mb-6;
}

.my-button-test {
  @apply cursor-pointer bg-black text-slate-50;
}

.topic-icon {
  @apply phone:h-8 phone:w-8 sm:h-10 sm:w-10 lg:h-10 lg:w-10 2xl:h-14 2xl:w-14 bg-slate-900 p-2 bg-opacity-10 text-slate-900 rounded-full;
}

/* Topic status */
.myTopicStatusComplete {
  @apply fill-blue-600;
}

.myTopicStatusPending {
  @apply fill-orange-600;
}

/* Trasition */
.popup-enter-active,
.popup-leave-active {
  @apply transition-all duration-300 ease-linear;
}

.popup-enter-from,
.popup-leave-to {
  @apply opacity-0 scale-0;
}

.popup-enter-to,
.popup-leave-from {
  @apply opacity-100 scale-100;
}

.slide-enter-active,
.slide-leave-active {
  @apply transition-all duration-300 ease-linear;
}

.slide-enter-from,
.slide-leave-to {
  @apply opacity-0 w-0;
}

.slide-enter-to,
.slide-leave-from {
  @apply opacity-100 w-full;
}
</style>
