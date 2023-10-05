<script setup>
import { ref, computed, inject } from "vue";
import { useRoute } from "vue-router";
import useValidateTask from "../../hooks/validateTask";

// Prop
const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
});

// Route
const route = useRoute();

const topicId = computed(() => {
  return route.params.topicId;
});

// Form section
const { title, isForm, validationRemoveForm, clearInvalid } = useValidateTask();

// clear input after fetch
function clear() {
  location.reload();
}

// user
const token = localStorage.getItem("token");

// Fetch put
async function editTask() {
  try {
    validationRemoveForm();
    if (!isForm.value) {
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", token);

    const urlencoded = new URLSearchParams();
    urlencoded.append("task_id", props.taskId);
    urlencoded.append("title", `${title.value.val}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const urlMain = `https://emerging-hawk-entirely.ngrok-free.app
`;
    let url = `${urlMain}/topic/${topicId.value}/task
`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error.message || "fali to delete");
    }

    // clear input after fetch
    clear();
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <form @submit.prevent="editTask">
    <div class="my-form-container">
      <label for="title" class="my-label">Confirm "Title" to delete</label>
      <input
        type="text"
        id="title"
        v-model.trim="title.val"
        class="my-input"
        :class="{ invalid: !title.isValid }"
        @blur="clearInvalid(title)"
      />
      <p v-if="!title.isValid" class="invalid-p">Title is invalid</p>
    </div>

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
