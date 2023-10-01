<script setup>
import { RouterView } from "vue-router";
import { onBeforeUnmount, onMounted } from "vue";
import { useRefreshToken } from "./components/hooks/fetchTopicData";

const time = 3600 * 1000;
// const time = 5000;

const refreshTokenInterval = setInterval(async () => {
  await useRefreshToken();
}, time);

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

if (!isAuthenticated()) {
  clearInterval(refreshTokenInterval);
}

// onBeforeUnmount(() => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userId");
//   localStorage.removeItem("username");
//   localStorage.removeItem("refreshToken");
// });
</script>

<template>
  <main-store>
    <RouterView></RouterView>
  </main-store>
</template>

<style scoped></style>
