<script setup>
import { ref } from "vue";

import useValidateTopic from "../hooks/validateTopic";

const userId = localStorage.getItem("userId");

const props = defineProps({
  topicId: String,
  required: true,
});

console.log(props.topicId);

const { userType, numOfUserId, error } = useValidateTopic();

const token = localStorage.getItem("token");

async function addTopicUser() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const urlencoded = new URLSearchParams();
    urlencoded.append("user_id", numOfUserId.value.val);
    urlencoded.append("role", `${userType.value.val}`);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const urlMain = `https://emerging-hawk-entirely.ngrok-free.app
`;

    let url = `${urlMain}/topic/${props.topicId}/contribute`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      error.value = `Something went wrong, try again later`;
      throw new Error(responseData.error.message || "fail to add new user");
    }

    location.reload();

    console.log(props.topicId);
    console.log(responseData);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <form @submit.prevent="addTopicUser">
    <div class="my-form-container">
      <label for="title" class="my-label">Select user type</label>
      <select
        name="topic"
        id="topic"
        class="lg:text-base 2xl:text-xl text-slate-500 font-semibold bg-slate-50 focus:outline-none w-30"
        :class="{ invalid: !userType.isValid }"
        v-model="userType.val"
      >
        <option value="user">User</option>
        <option value="moderator">Moderator</option>
      </select>
    </div>
    <div class="my-form-container">
      <label for="userId" class="my-label"
        >Please provide the user ID you wish to add.</label
      >
      <input
        type="number"
        id="userId"
        class="my-input"
        :class="{ invalid: !numOfUserId.isValid }"
        v-model="numOfUserId.val"
      />
    </div>

    <p class="invalid-p" v-if="error">{{ error }}</p>
    <base-button mode="my-basic-style-black" class="mt-6">Confirm</base-button>
  </form>
</template>

<style scoped>
.my-form-container {
  @apply mb-2 p-2 rounded-md bg-blue-300 bg-opacity-20;
}
.my-label {
  @apply block font-medium mb-0.5 text-base text-slate-500;
}

.my-input {
  @apply block w-full border-none  bg-blue-50  mb-2 p-2 rounded-sm focus:outline-none focus:bg-white text-sm;
}

.invalid {
  @apply border border-solid border-red-700;
}

.invalid-p {
  @apply text-red-700;
}
</style>
