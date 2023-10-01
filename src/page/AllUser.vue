<script setup>
import { PhMagnifyingGlass, PhUsersThree, PhUser } from "@phosphor-icons/vue";
import { ref } from "vue";
import useValidateLogin from "../components/hooks/validateLogin";
import { useSearchUser } from "../components/hooks/fetchTopicData";

const isUserBtn = ref(false);
const { logout } = useValidateLogin();

const token = localStorage.getItem("token");

const userName = ref({
  val: "",
  isValid: true,
});

const user = ref({
  name: "",
  firstName: "",
  lastName: "",
  userId: null,
  isValid: false,
});

const error = ref({
  val: "",
  isValid: false,
});
</script>

<template>
  <section></section>
  <div class="2xl:container 2xl:mx-auto">
    <section class="relative">
      <div>
        <form
          class="fixed top-40 phone:left-1/2 phone:-translate-x-1/2 lg:-translate-x-0"
          :class="{ absoluteSearchBtn: true }"
          @submit.prevent="useSearchUser(userName, error, user)"
        >
          <div
            class="p-2 w-72 rounded-md flex items-start justify-center gap-0"
          >
            <input
              type="text"
              placeholder="Search for users by name..."
              class="input-allusers"
              v-model="userName.val"
            />
            <base-button
              class="px-2 py-2 h-16 rounded-r-md font-bold bg-slate-900 text-slate-50 transition-all duration-300"
            >
              <PhMagnifyingGlass class="h-8 w-8 p-0"></PhMagnifyingGlass>
            </base-button>
          </div>

          <p class="text-red-700" v-if="error.isValid">*{{ error.val }}</p>
        </form>
      </div>

      <main
        class="py-10 px-20 text-slate-800 sm:mt-20 lg:mt-0 lg:ml-72"
        v-if="true"
      >
        <!-- header -->
        <div
          class="phone:fixed phone:inline-flex phone:bottom-0 phone:left-0 phone:w-screen phone:justify-between phone:items-center phone:h-20 phone:bg-slate-400 phone:p-2 lg:static lg:w-full lg:h-full lg:bg-white lg:flex-row lg:mb-20"
        >
          <div class="gap-4 inline-flex justify-center items-center">
            <PhUsersThree
              class="phone:h-6 phone:w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 2xl:h-16 2xl:w-16"
            ></PhUsersThree>
            <h1 class="phone:text-xl lg:text-3xl 2xl:text-5xl font-bold">
              All users
            </h1>
          </div>

          <div class="top-header inline-flex">
            <ul class="flex gap-3 text-slate-900 relative">
              <base-button @click="isUserBtn = !isUserBtn">
                <li class="relative">
                  <PhUser class="user-icon"></PhUser>

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

        <!-- main -->
        <div
          class="phone:grid phone:grid-cols-myAlluserTemplate gap-1 place-content-center items-center text-slate-800 sm:mt-60 lg:mt-24 p-2 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md mb-2"
          v-if="user.isValid"
        >
          <h2 class="header-allusers">Name</h2>
          <h2 class="header-allusers">First Name</h2>
          <h2 class="header-allusers">Last Name</h2>
          <h2 class="header-allusers">User ID</h2>
        </div>

        <div
          class="phone:grid phone:grid-cols-myAlluserTemplate gap-1 place-content-center items-center text-slate-800 p-2 shadow-md"
          v-if="user.isValid"
        >
          <h2 class="header-allusers">{{ user.name }}</h2>
          <h2 class="header-allusers">{{ user.firstName }}</h2>
          <h2 class="header-allusers">{{ user.lastName }}</h2>
          <h2 class="header-allusers">{{ user.userId }}</h2>
        </div>
      </main>

      <the-header></the-header>
    </section>
  </div>
</template>

<style scoped>
.header-allusers {
  @apply text-center font-bold phone:text-sm;
}

.input-allusers {
  @apply h-16 w-full border-none  bg-slate-400  mb-2 p-2 rounded-l-md 
  focus:outline-none focus:bg-slate-700 focus:text-slate-50 
  placeholder:text-slate-100 placeholder:font-semibold 
  font-semibold text-sm text-slate-100
  transition-all duration-300;
}

.user-icon {
  @apply phone:h-10 phone:w-10 sm:h-12 sm:w-12 lg:h-10 lg:w-10 2xl:h-14 2xl:w-14 bg-slate-900 p-2 bg-opacity-10 text-slate-900 rounded-full;
}

.absoluteSearchBtn {
  @apply absolute;
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
</style>
