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
  @apply block;
}

.my-base-button-inline-block {
  @apply inline-block;
}

.my-basic-style {
  @apply px-2 py-1 bg-blue-600 text-blue-50 rounded-sm;
}
</style>
