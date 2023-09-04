<script setup>
import useValidateTopic from "../hooks/validateTopic";

// Prop
const props = defineProps({
  topicId: {
    type: String,
    required: true,
  },
});

console.log(props.topicId);

// Form section
const { title, isForm, validationRemoveForm, error, clearInvalid } =
  useValidateTopic();

// clear input after fetch
function clear() {
  location.reload();
}

// Fetch delete
async function deleteData() {
  validationRemoveForm();
  if (!isForm.value) {
    return;
  }

  try {
    console.log("valid");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("topic_id", `${props.topicId}`);
    urlencoded.append("title", title.value.val);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const urlMain = `https://emerging-hawk-entirely.ngrok-free.app
`;
    let url = `${urlMain}/topic`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("fali to delete");
    }

    // clear after fetch
    clear();
  } catch (err) {
    error.value = err.message || "Something went wrong";
  }
}
</script>

<template>
  <form @submit.prevent="deleteData">
    <div class="my-form-container">
      <label for="title" class="my-label">Confirm "Title" to delete</label>
      <input
        type="text"
        id="title"
        class="my-input"
        :class="{ invalid: !title.isValid }"
        v-model.trim="title.val"
        @blur="clearInvalid(title)"
      />
      <p v-if="!title.isValid" class="invalid-p">Invalid title</p>
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
