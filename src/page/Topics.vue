<script setup>
import TheHeaderStore from "../store/TheHeaderStore.vue";
</script>

<template>
  <section class="grid grid-cols-myTemplate h-screen w-screen">
    <the-top-header></the-top-header>
    <TheHeaderStore>
      <the-header></the-header>
    </TheHeaderStore>

    <TheHeaderStore>
      <RouterView class="col-start-2"></RouterView>
    </TheHeaderStore>
  </section>
</template>
