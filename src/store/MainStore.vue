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
const store = ref([
  {
    userId: "1",
    topics: [
      {
        id: "1",
        emoji: "✔️",
        datail: "Daily Task",
        editStatus: false,
        status: "Pending",
        progression: 14.2,
        tasks: ref([
          {
            id: "1",
            emoji: "✌️",
            title: "[Memoji]",
            detail:
              "- Create Prototype Mobile for Get Notification in Principle",
            month: "Mar",
            date: "26",
            status: "InProgress",
            editStatus: false,
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
            editStatus: false,
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
            editStatus: false,
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
            editStatus: false,
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
            editStatus: false,
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
            editStatus: false,
            teamesMember: [users.value[0], users.value[1], users.value[2]],
          },
          {
            id: "7",
            emoji: "🎮",
            title: "[Metaco]",
            detail:
              "- Create draft design for User Journey earning coin on Apps",
            month: "Apr",
            date: "1",
            status: "NextUp",
            editStatus: false,
            teamesMember: [users.value[0], users.value[1], users.value[2]],
          },
        ]),
      },
    ],
  },
]);

const topics = ref([
  // {
  //   id: "1",
  //   emoji: "✔️",
  //   datail: "Daily Task",
  //   editStatus: false,
  //   status: "Pending",
  //   progression: 14.2,
  //   tasks: ref([
  //     {
  //       id: "1",
  //       emoji: "✌️",
  //       title: "[Memoji]",
  //       detail: "- Create Prototype Mobile for Get Notification in Principle",
  //       month: "Mar",
  //       date: "26",
  //       status: "InProgress",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "2",
  //       emoji: "✌️",
  //       title: "[Lux]",
  //       detail: "- Design Lux Pet Shop Product Page Responsive Website",
  //       month: "Mar",
  //       date: "29",
  //       status: "NextUp",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "3",
  //       emoji: "🔥",
  //       title: "[OWW]",
  //       detail: "- Learn SVGator for creating OWW Animation Part 1",
  //       month: "Mar",
  //       date: "26",
  //       status: "Complete",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "4",
  //       emoji: "🎉",
  //       title: "[OWW]",
  //       detail: "- Draw & animate illustration for OWW 4th aniversary",
  //       month: "Mar",
  //       date: "30",
  //       status: "NextUp",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "5",
  //       emoji: "🔥",
  //       title: "[OWW]",
  //       detail: "- Learn SVGator for creating OWW Animation Part 2",
  //       month: "Mar",
  //       date: "26",
  //       status: "InProgress",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "6",
  //       emoji: "🎮",
  //       title: "[Metaco]",
  //       detail: "- Benchmark Mobile Legend on Earning Diamond",
  //       month: "Mar",
  //       date: "25",
  //       status: "Unknown",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "7",
  //       emoji: "🎮",
  //       title: "[Metaco]",
  //       detail: "- Create draft design for User Journey earning coin on Apps",
  //       month: "Apr",
  //       date: "1",
  //       status: "NextUp",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //   ]),
  // },
  // {
  //   id: "2",
  //   emoji: "🤝",
  //   datail: "Meeting",
  //   editStatus: false,
  //   status: "Complete",
  //   progression: 100,
  //   tasks: ref([]),
  // },
  // {
  //   id: "3",
  //   emoji: "📝",
  //   datail: "Resources",
  //   editStatus: false,
  //   status: "Pending",
  //   progression: 20,
  //   tasks: ref([
  //     {
  //       id: "1",
  //       emoji: "🔥",
  //       title: "[OWW]",
  //       detail: "- Learn SVGator for creating OWW Animation Part 1",
  //       month: "Mar",
  //       date: "26",
  //       status: "Complete",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "2",
  //       emoji: "🎉",
  //       title: "[OWW]",
  //       detail: "- Draw & animate illustration for OWW 4th aniversary",
  //       month: "Mar",
  //       date: "30",
  //       status: "NextUp",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "3",
  //       emoji: "🔥",
  //       title: "[OWW]",
  //       detail: "- Learn SVGator for creating OWW Animation Part 2",
  //       month: "Mar",
  //       date: "26",
  //       status: "InProgress",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "4",
  //       emoji: "🎮",
  //       title: "[Metaco]",
  //       detail: "- Benchmark Mobile Legend on Earning Diamond",
  //       month: "Mar",
  //       date: "25",
  //       status: "Unknown",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //     {
  //       id: "5",
  //       emoji: "🎮",
  //       title: "[Metaco]",
  //       detail: "- Create draft design for User Journey earning coin on Apps",
  //       month: "Apr",
  //       date: "1",
  //       status: "NextUp",
  //       editStatus: false,
  //       teamesMember: [users.value[0], users.value[1], users.value[2]],
  //     },
  //   ]),
  // },
]);

// Add topic

provide("topics", topics);
provide("store", store);
</script>
