<script setup>
const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: "my-base-card",
  },
});
</script>

<template>
  <div :class="mode">
    <slot></slot>
  </div>
</template>

<style scoped>
.my-base-card {
  @apply px-2 py-4 shadow-md bg-slate-50 rounded-lg -z-0;
}

.my-base-card-for-the-header {
  @apply px-2 py-4 lg:shadow-md lg:bg-slate-50 lg:rounded-lg -z-10;
}
</style>
