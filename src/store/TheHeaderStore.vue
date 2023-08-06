<script setup>
import { ref, provide } from "vue";

const topics = ref([
  {
    id: "1",
    emoji: "✔️",
    datail: "Daily Task",
  },
  {
    id: "2",
    emoji: "🤝",
    datail: "Meeting",
  },
  {
    id: "3",
    emoji: "📝",
    datail: "Resources",
  },
  {
    id: "4",
    emoji: "🗓️",
    datail: "Availibity",
  },
  {
    id: "5",
    emoji: "🗂️",
    datail: "All Projects",
  },
  {
    id: "6",
    emoji: "📥",
    datail: "Archive",
  },
  {
    id: "7",
    emoji: "🧠",
    datail: "Brain",
  },
]);

provide("topics", topics);
</script>

<template>
  <slot></slot>
</template>
