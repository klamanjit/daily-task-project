<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { BellIcon } from "@heroicons/vue/24/solid";
import { computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
import useValidateLogin from "../hooks/validateLogin";

import { PhUser } from "@phosphor-icons/vue";

const route = useRoute();

// emit function
const emit = defineEmits(["search"]);
function trySearch() {
  emit("search", title.value.val, isSeearchBtn.value);
}

// Topic section
const topics = inject("topics");

const topicSelected = computed(() => {
  const selectedTopic = topics.value.find(
    (topic) => topic.id === route.params.topicId
  );
  return selectedTopic || {};
});

const nextUpTask = computed(() => {
  return (topicSelected.value.tasks || []).filter(
    (task) => task.status === "NextUp"
  );
});

const nextUpTaskLength = computed(() => {
  return nextUpTask.length;
});

// Bell Button
const isBellBtn = ref(false);
// Search button
const isSeearchBtn = ref(false);
const title = ref({
  val: "",
  isValid: false,
});

// User button
const isUserBtn = ref(false);

const { logout } = useValidateLogin();

// function logout() {
//   localStorage.removeItem("token");
//   router.replace("/");
// }
</script>

<template>
  <ul
    class="phone:flex phone:items-center lg:justify-center phone:gap-3 text-slate-900 relative lg:h-full lg:bg-white"
  >
    <Transition name="slide">
      <div
        v-if="isSeearchBtn"
        class="absolute phone:top-0 lg:top-3 2xl:top-3 -left-44"
      >
        <form @submit.prevent="trySearch">
          <input
            type="text"
            id="title"
            v-model="title.val"
            placeholder="Search for title"
            class="block w-full h-10 border-none bg-slate-200 mb-2 p-2 rounded-md focus:outline-none focus:bg-blue-50 text-sm"
          />
        </form>
      </div>
    </Transition>

    <base-button @click="isSeearchBtn = !isSeearchBtn">
      <li>
        <MagnifyingGlassIcon
          class="phone:h-8 phone:w-8 sm:h-10 sm:w-10 lg:h-10 lg:w-10 2xl:h-14 2xl:w-14 bg-slate-900 p-2 bg-opacity-10 text-slate-900 rounded-full"
        ></MagnifyingGlassIcon>
      </li>
    </base-button>

    <li class="relative">
      <span
        class="absolute -top-2 -right-1 bg-red-600 text-red-50 rounded-full w-5 h-5 py-0.5 text-xs text-center"
        >{{ nextUpTask.length }}</span
      >
      <base-button @click="isBellBtn = !isBellBtn">
        <BellIcon class="my-bell-icon"></BellIcon>
      </base-button>
      <Transition name="popup">
        <base-card
          v-if="isBellBtn"
          class="absolute phone:-top-16 sm:-top-16 lg:top-10 2xl:top-14 left-2 flex flex-col gap-1 text-xs"
        >
          <p
            v-for="next in nextUpTask"
            :key="next"
            class="border border-s-slate-200 font-bold p-1 bg-green-500 text-green-50 text-center"
          >
            {{ next.title }}
          </p>
        </base-card>
      </Transition>
    </li>

    <base-button @click="isUserBtn = !isUserBtn">
      <li class="relative">
        <PhUser class="my-bell-icon"></PhUser>
        <!-- <img
          src="../../assets/header/1.jpg"
          alt="cat-profile"
          class="sm:h-10 sm:w-10 lg:h-10 lg:w-10 2xl:h-14 2xl:w-14 rounded-full object-cover"
        /> -->

        <Transition name="popup">
          <base-card
            v-if="isUserBtn"
            class="absolute w-20 phone:hidden lg:block lg:top-10 2xl:top-14 left-2 flex flex-col gap-1 text-xs"
          >
            <base-button
              class="border border-s-slate-200 p-1 text-slate-700 font-bold hover:bg-blue-500 hover:text-blue-50 transition-all duration-200 ease-in"
              @click="logout"
            >
              Log-out
            </base-button>
          </base-card>
        </Transition>
      </li>
    </base-button>
  </ul>
</template>

<style scoped>
.my-bell-icon {
  @apply phone:h-8 phone:w-8 sm:h-10 sm:w-10 lg:h-10 lg:w-10 2xl:h-14 2xl:w-14 bg-slate-900 p-2 bg-opacity-10 text-slate-900 rounded-full;
}

/* Trasition */
.popup-enter-active,
.popup-leave-active {
  @apply transition-all duration-200 ease-linear;
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
  @apply transition-all duration-200 ease-linear;
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
