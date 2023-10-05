<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

// Icon
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
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

const {
  title,
  emoji,
  detail,
  date,
  month,
  status,
  isForm,
  dateSet,
  monthSet,
  validationForm,
  clearInvalid,
} = useValidateTask();

// Section
const isSection1 = ref(true);
const isSection2 = ref(false);
const isSection3 = ref(false);

const section = ref(1);
function openNextSection() {
  section.value++;
  if (section.value > 3) {
    section.value = 3;
  }

  if (section.value === 2) {
    isSection1.value = false;
    isSection2.value = true;
    isSection3.value = false;
  }

  if (section.value === 3) {
    isSection1.value = false;
    isSection2.value = false;
    isSection3.value = true;
  }
}

function openPrevSection() {
  section.value--;
  if (section.value < 1) {
    section.value = 1;
  }

  if (section.value === 3) {
    isSection1.value = false;
    isSection2.value = false;
    isSection3.value = true;
  }

  if (section.value === 2) {
    isSection1.value = false;
    isSection2.value = true;
    isSection3.value = false;
  }

  if (section.value === 1) {
    isSection1.value = true;
    isSection2.value = false;
    isSection3.value = false;
  }
}

// clear input after fetch
function clear() {
  location.reload();
}

// user
const token = localStorage.getItem("token");

// Fetch put
async function editTask() {
  try {
    validationForm();
    if (!isForm.value) {
      return;
    }

    const dueTime = new Date(
      `${date.value.val} ${month.value.val} 2023 00:00 UTC`
    ).toISOString();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", token);

    const urlencoded = new URLSearchParams();
    urlencoded.append("task_id", props.taskId);
    urlencoded.append("title", `${title.value.val}`);
    urlencoded.append("detail", `-${detail.value.val}`);
    urlencoded.append("emoji", emoji.value.val);
    urlencoded.append("due_time", dueTime);
    urlencoded.append("status", status.value.val);
    urlencoded.append("include", "true");

    const requestOptions = {
      method: "PUT",
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
      throw new Error("fali to delete");
    }
    // Clear input after fetch
    clear();
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <form @submit.prevent="editTask" class="relative">
    <base-button type="button" @click="openPrevSection">
      <ChevronLeftIcon
        class="h-6 w-6 absolute top-1/3 -left-6 my-left-right-btn"
      ></ChevronLeftIcon>
    </base-button>

    <base-button type="button" @click="openNextSection">
      <ChevronRightIcon
        class="h-6 w-6 absolute top-1/3 -right-6 my-left-right-btn"
      ></ChevronRightIcon>
    </base-button>

    <section v-if="isSection1">
      <div class="my-form-container">
        <label for="title" class="my-label">Change "Title" to ...</label>
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

      <div class="my-form-container">
        <label for="detail" class="my-label">Change "Detail" to ...</label>
        <input
          type="text"
          id="detail"
          v-model.trim="detail.val"
          class="my-input"
          :class="{ invalid: !detail.isValid }"
          @blur="clearInvalid(detail)"
        />
        <p v-if="!detail.isValid" class="invalid-p">Detail is invalid</p>
      </div>
    </section>

    <section v-if="isSection2">
      <div class="my-form-container">
        <label for="emoji" class="my-label">Change "Emoji" to ...</label>
        <select
          name="emoji"
          id="emoji"
          v-model="emoji.val"
          class="my-input"
          :class="{ invalid: !emoji.isValid }"
          @blur="clearInvalid(emoji)"
        >
          <option value="✌️">✌️</option>
          <option value="🔥">🔥</option>
          <option value="🎉">🎉</option>
          <option value="🎮">🎮</option>
        </select>
        <p v-if="!emoji.isValid" class="invalid-p">Please select the emoji</p>
      </div>

      <div class="my-form-container">
        <label for="status" class="my-label">Change "Status" to ...</label>
        <select
          name="status"
          id="status"
          v-model="status.val"
          class="my-input"
          :class="{ invalid: !status.isValid }"
          @blur="clearInvalid(status)"
        >
          <option value="NextUp">Next up</option>
          <option value="InProgress">In Progress</option>
          <option value="Complete">Complete</option>
          <option value="Unknown">Unknown</option>
        </select>

        <p v-if="!status.isValid" class="invalid-p">
          Please select daily task status
        </p>
      </div>
    </section>

    <section v-if="isSection3">
      <div class="my-form-container">
        <label for="date" class="my-label">Change "Date" to ...</label>
        <select
          name="date"
          id="date"
          v-model="date.val"
          class="my-input"
          :class="{ invalid: !date.isValid }"
          @blur="clearInvalid(date)"
        >
          <option v-for="date in dateSet" :key="date" :value="date">
            {{ date }}
          </option>
        </select>
        <p v-if="!date.isValid" class="invalid-p">
          Please select date of daily task
        </p>
      </div>

      <div class="my-form-container">
        <label for="month" class="my-label">Change "Month" to ...</label>
        <select
          name="month"
          id="month"
          v-model="month.val"
          class="my-input"
          :class="{ invalid: !month.isValid }"
          @blur="clearInvalid(month)"
        >
          <option v-for="month in monthSet" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
        <p v-if="!month.isValid" class="invalid-p">
          Please select month of daily task
        </p>
      </div>
    </section>

    <div class="flex gap-1 justify-center items-center text-xs mb-2">
      <div
        class="w-2 h-2 bg-slate-300 rounded-full"
        :class="{ myCircleSection: isSection1 }"
      ></div>
      <div
        class="w-2 h-2 bg-slate-300 rounded-full"
        :class="{ myCircleSection: isSection2 }"
      ></div>
      <div
        class="w-2 h-2 bg-slate-300 rounded-full"
        :class="{ myCircleSection: isSection3 }"
      ></div>
    </div>

    <base-button mode="my-basic-style-black" class="mt-2">Confirm</base-button>
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

.my-left-right-btn {
  @apply fill-slate-400 hover:fill-slate-800 transition-all duration-100 ease-linear;
}

.myCircleSection {
  @apply bg-slate-600;
}
</style>
