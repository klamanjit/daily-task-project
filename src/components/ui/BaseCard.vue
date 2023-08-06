<template>
  <div class="my-base-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.my-base-card {
  @apply px-2 py-4 shadow-md bg-slate-50 rounded-lg;
}
</style>
