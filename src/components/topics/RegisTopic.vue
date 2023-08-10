<script setup>
import { ref, computed, inject } from "vue";

const props = defineProps({
  show: Boolean,
  required: true,
});
const emit = defineEmits(["close"]);

const topics = inject("topics");

const emojis = ref(["✔️", "🤝", "📝", "🗓️", "🗂️", "📥", "🧠"]);

const title = ref({
  val: "",
  isValid: true,
});

const emoji = ref({
  val: "",
  isValid: true,
});

const isForm = ref(true);

function validationForm() {
  isForm.value = true;
  if (!title.value.val) {
    title.value.isValid = false;
    isForm.value = false;
  }

  if (!emoji.value.val) {
    emoji.value.isValid = false;
    isForm.value = false;
  }
}

function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function registerTopic() {
  validationForm();
  if (!isForm.value) {
    return;
  }
  console.log(topics.value.length + 1);

  // {
  //   id: "4",
  //   emoji: "🗓️",
  //   datail: "Availibity",
  // },

  const newTopic = {
    // id: getRandomArbitary(10, 20),
    id: ` ${topics.value.length + 1}`,
    emoji: emoji.value.val,
    datail: title.value.val,
    tasks: ref([
      {
        id: "1",
        emoji: "✌️",
        title: "[Memoji]",
        detail: "- Create Prototype Mobile for Get Notification in Principle",
        month: "Mar",
        date: "26",
        status: "InProgress",
      },
      {
        id: "2",
        emoji: "✌️",
        title: "[Lux]",
        detail: "- Design Lux Pet Shop Product Page Responsive Website",
        month: "Mar",
        date: "29",
        status: "NextUp",
      },
    ]),
  };

  console.log(newTopic.id);
  topics.value.push(newTopic);
}

function clearInvalid(input) {
  input.isValid = true;
}

function tryClos2() {
  emit("close");
}
</script>

<template>
  <base-dialog :show="show" title="Add new Topic" @close="tryClos2">
    <form @submit.prevent="registerTopic">
      <div>
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

      <div>
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

      <base-button mode="my-basic-style">Submit</base-button>
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
