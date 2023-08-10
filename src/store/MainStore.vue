<template>
  <slot></slot>
</template>

<script setup>
import { ref, provide } from "vue";

// users
import user1 from "../assets/header/1.jpg";
import user2 from "../assets/header/2.jpg";
import user3 from "../assets/header/3.jpg";

// Users
const users = ref([
  {
    id: "1",
    imgUrl: user1,
  },
  {
    id: "2",
    imgUrl: user2,
  },
  {
    id: "3",
    imgUrl: user3,
  },
]);

provide("users", users);

// Topics

const topics = ref([
  {
    id: "1",
    emoji: "✔️",
    datail: "Daily Task",
    tasks: ref([
      {
        id: "1",
        emoji: "✌️",
        title: "[Memoji]",
        detail: "- Create Prototype Mobile for Get Notification in Principle",
        month: "Mar",
        date: "26",
        status: "InProgress",
        teamesMember: [users.value[0], users.value[1], users.value[2]],
      },
      {
        id: "2",
        emoji: "✌️",
        title: "[Lux]",
        detail: "- Design Lux Pet Shop Product Page Responsive Website",
        month: "Mar",
        date: "29",
        status: "NextUp",
        teamesMember: [users.value[0], users.value[1], users.value[2]],
      },
      {
        id: "3",
        emoji: "🔥",
        title: "[OWW]",
        detail: "- Learn SVGator for creating OWW Animation Part 1",
        month: "Mar",
        date: "26",
        status: "Complete",
        teamesMember: [users.value[0], users.value[1], users.value[2]],
      },

      {
        id: "4",
        emoji: "🎉",
        title: "[OWW]",
        detail: "- Draw & animate illustration for OWW 4th aniversary",
        month: "Mar",
        date: "30",
        status: "NextUp",
        teamesMember: [users.value[0], users.value[1], users.value[2]],
      },

      {
        id: "5",
        emoji: "🔥",
        title: "[OWW]",
        detail: "- Learn SVGator for creating OWW Animation Part 2",
        month: "Mar",
        date: "26",
        status: "InProgress",
        teamesMember: [users.value[0], users.value[1], users.value[2]],
      },

      {
        id: "6",
        emoji: "🎮",
        title: "[Metaco]",
        detail: "- Benchmark Mobile Legend on Earning Diamond",
        month: "Mar",
        date: "25",
        status: "Unknown",
        teamesMember: [users.value[0], users.value[1], users.value[2]],
      },

      {
        id: "7",
        emoji: "🎮",
        title: "[Metaco]",
        detail: "- Create draft design for User Journey earning coin on Apps",
        month: "Apr",
        date: "1",
        status: "NextUp",
        teamesMember: [users.value[0], users.value[1], users.value[2]],
      },
    ]),
  },
  {
    id: "2",
    emoji: "🤝",
    datail: "Meeting",
    tasks: ref([]),
  },
  {
    id: "3",
    emoji: "📝",
    datail: "Resources",
    tasks: ref([]),
  },
  {
    id: "4",
    emoji: "🗓️",
    datail: "Availibity",
    tasks: ref([]),
  },
  {
    id: "5",
    emoji: "🗂️",
    datail: "All Projects",
    tasks: ref([]),
  },
  {
    id: "6",
    emoji: "📥",
    datail: "Archive",
    tasks: ref([]),
  },
  {
    id: "7",
    emoji: "🧠",
    datail: "Brain",
    tasks: ref([]),
  },
]);

provide("topics", topics);

// Daily task (topic1)

const dailyTasks = ref([
  {
    id: "1",
    emoji: "✌️",
    title: "[Memoji]",
    detail: "- Create Prototype Mobile for Get Notification in Principle",
    month: "Mar",
    date: "26",
    status: "InProgress",
    teamesMember: [users.value[0], users.value[1], users.value[2]],
  },
  {
    id: "2",
    emoji: "✌️",
    title: "[Lux]",
    detail: "- Design Lux Pet Shop Product Page Responsive Website",
    month: "Mar",
    date: "29",
    status: "NextUp",
    teamesMember: [users.value[0], users.value[1], users.value[2]],
  },
  {
    id: "3",
    emoji: "🔥",
    title: "[OWW]",
    detail: "- Learn SVGator for creating OWW Animation Part 1",
    month: "Mar",
    date: "26",
    status: "Complete",
    teamesMember: [users.value[0], users.value[1], users.value[2]],
  },

  {
    id: "4",
    emoji: "🎉",
    title: "[OWW]",
    detail: "- Draw & animate illustration for OWW 4th aniversary",
    month: "Mar",
    date: "30",
    status: "NextUp",
    teamesMember: [users.value[0], users.value[1], users.value[2]],
  },

  {
    id: "5",
    emoji: "🔥",
    title: "[OWW]",
    detail: "- Learn SVGator for creating OWW Animation Part 2",
    month: "Mar",
    date: "26",
    status: "InProgress",
    teamesMember: [users.value[0], users.value[1], users.value[2]],
  },

  {
    id: "6",
    emoji: "🎮",
    title: "[Metaco]",
    detail: "- Benchmark Mobile Legend on Earning Diamond",
    month: "Mar",
    date: "25",
    status: "Unknown",
    teamesMember: [users.value[0], users.value[1], users.value[2]],
  },

  {
    id: "7",
    emoji: "🎮",
    title: "[Metaco]",
    detail: "- Create draft design for User Journey earning coin on Apps",
    month: "Apr",
    date: "1",
    status: "NextUp",
    teamesMember: [users.value[0], users.value[1], users.value[2]],
  },
]);

provide("dailyTasks", dailyTasks);
</script>
