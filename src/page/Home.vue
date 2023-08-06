<script setup>
import TheHeaderStore from "../store/TheHeaderStore.vue";
</script>

<template>
  <section class="my-section-home">
    <TheHeaderStore>
      <the-header></the-header>
    </TheHeaderStore>
    <h2 class="ml-56">Home</h2>
  </section>
</template>

<style scoped>
.my-section-home {
  @apply relative 
  
  
  xl:mx-36
  2xl:mx-64;
}
</style>
