<script setup>
import { ref, inject, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const emit = defineEmits(["close2"]);

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const topics = inject("topics");

function tryClose2() {
  emit("close2");
}

// valiation

const title = ref({
  val: "",
  isValid: true,
});

const emoji = ref({
  val: "",
  isValid: true,
});

const detail = ref({
  val: "",
  isValid: true,
});

const date = ref({
  val: "",
  isValid: true,
});

const month = ref({
  val: "",
  isValid: true,
});

const status = ref({
  val: "",
  isValid: true,
});

const isForm = ref(true);

const dateSet = computed(() => {
  const date = [];
  for (let i = 1; i < 32; i++) {
    date.push(i);
  }

  return date;
});

const monthSet = ref([
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]);

function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function clearInvalid(input) {
  input.isValid = true;
}

function validationForm() {
  isForm.value = true;
  if (!title.value.val) {
    isForm.value = false;
    title.value.isValid = false;
  }
  if (!emoji.value.val) {
    isForm.value = false;
    emoji.value.isValid = false;
  }
  if (!detail.value.val) {
    isForm.value = false;
    detail.value.isValid = false;
  }
  if (!date.value.val) {
    isForm.value = false;
    date.value.isValid = false;
  }
  if (!month.value.val) {
    isForm.value = false;
    month.value.isValid = false;
  }
  if (!status.value.val) {
    isForm.value = false;
    status.value.isValid = false;
  }
}

const topicSelected = computed(() => {
  const selectedTopic = topics.value.find(
    (topic) => topic.id === route.params.topicId
  );
  return selectedTopic;
});

function registerTask() {
  validationForm();
  if (!isForm.value) {
    return;
  }

  const newTask = {
    id: getRandomArbitary(10, 20),
    emoji: emoji.value.val,
    title: `[${title.value.val}]`,
    detail: `-${detail.value.val}`,
    month: month.value.val,
    date: date.value.val,
    status: status.value.val,
  };
  topicSelected.value.tasks.push(newTask);
}
</script>

<template>
  <base-dialog
    title="Add new task"
    :fixed="false"
    :show="show"
    @close="tryClose2"
  >
    <form @submit.prevent="registerTask">
      <div>
        <label for="title" class="my-label">Title</label>
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

      <div>
        <label for="detail" class="my-label">Detail</label>
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

      <div>
        <label for="emoji" class="my-label">Emoji</label>
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

      <div>
        <label for="status" class="my-label">Status</label>
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

      <div>
        <label for="date" class="my-label">Date</label>
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

      <div>
        <label for="month" class="my-label">Month</label>
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

      <base-button mode="my-basic-style " class="mr-2">Submit</base-button>
    </form>
  </base-dialog>
</template>

<style scoped>
.my-label {
  @apply block font-bold mb-0.5 text-base;
}

.my-input {
  @apply block w-full border-none  bg-slate-200  mb-2 p-2 rounded-sm focus:outline-none focus:bg-slate-50 text-sm;
}

.invalid {
  @apply border border-solid border-red-700;
}

.invalid-p {
  @apply text-red-700;
}
</style>
