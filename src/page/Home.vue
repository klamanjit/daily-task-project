<script setup>
import TheHeaderStore from "../store/TheHeaderStore.vue";
</script>

<template>
  <section class="grid grid-cols-myTemplate h-screen w-screen">
    <TheHeaderStore>
      <the-header></the-header>
    </TheHeaderStore>
    <h2 class="col-start-2">Home</h2>
  </section>
</template>
