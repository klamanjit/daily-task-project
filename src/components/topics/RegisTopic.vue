<script setup>
import useValidateTopic from "../hooks/validateTopic";

// Form section
const { emojis, title, emoji, isForm, validationForm, error, clearInvalid } =
  useValidateTopic();

// user
const token = localStorage.getItem("token");

// fetch post topic
async function registerTopic() {
  try {
    validationForm();
    if (!isForm.value) {
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", `${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", title.value.val);
    urlencoded.append("emoji", emoji.value.val);
    urlencoded.append("include", "true");

    const requestOptions = {
      method: "POST",
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
      throw new Error(responseData.error.message || "fail to fetch");
    }

    // clear after fetch
    location.reload();
  } catch (err) {
    error.value = err.message || "Something went wrong";
  }
}
</script>

<template>
  <form @submit.prevent="registerTopic">
    <div class="my-form-container">
      <label for="title" class="my-label">Title</label>
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

    <div class="my-form-container">
      <label for="emoji" class="my-label">Emoji</label>
      <select
        name="emoji"
        id="emoji"
        class="my-input"
        :class="{ invalid: !emoji.isValid }"
        v-model="emoji.val"
        @blur="clearInvalid(emoji)"
      >
        <option v-for="emoji in emojis" :key="emoji" :value="emoji">
          {{ emoji }}
        </option>
      </select>
      <p v-if="!emoji.isValid" class="invalid-p">Please select eomoji</p>
    </div>

    <p class="invalid-p" v-if="error">{{ error }}</p>

    <base-button mode="my-basic-style-black" class="mt-6">Submit</base-button>
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
