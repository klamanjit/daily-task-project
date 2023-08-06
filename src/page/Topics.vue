<script setup>
import TheHeaderStore from "../store/TheHeaderStore.vue";
</script>

<template>
  <section class="my-section-topics">
    <!-- <the-top-header></the-top-header> -->
    <TheHeaderStore>
      <the-header></the-header>
    </TheHeaderStore>

    <TheHeaderStore>
      <RouterView></RouterView>
    </TheHeaderStore>
  </section>
</template>

<style scoped>
.my-section-topics {
  @apply relative 
  
  
  xl:mx-36
  2xl:mx-64;
}
</style>
