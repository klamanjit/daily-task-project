<script setup>
const props = defineProps({
  to: {
    type: String,
    required: false,
    default: "/",
  },

  link: {
    type: Boolean,
    required: false,
    default: false,
  },

  mode: {
    type: String,
    required: false,
    default: "my-base-button",
  },
});
</script>

<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>

  <RouterLink :to="to" v-else :class="mode">
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
.my-base-button {
  @apply block active:bg-black;
}
</style>
