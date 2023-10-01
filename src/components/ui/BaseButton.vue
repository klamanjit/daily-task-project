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

/* .my-base-button-inline-block {
  @apply inline-block;
} */
.my-basic-style-black {
  @apply px-2 py-2  block w-full rounded-md  font-bold bg-slate-900 text-slate-50 transition-all duration-300;
}

.my-basic-style-blue {
  @apply px-2 py-1   font-bold bg-blue-700 text-blue-50 transition-all duration-300 rounded-sm;
}

.my-basic-style-red {
  @apply px-2 py-1   font-bold bg-red-700 text-red-50 transition-all duration-300 rounded-sm;
}

.my-basic-style-edit {
  @apply px-2 py-1 text-slate-700 border border-slate-200 font-bold hover:bg-blue-600 hover:text-blue-50 transition-all duration-300 rounded-sm;
}

.my-basic-style-remove {
  @apply px-2 py-1 text-slate-700 border border-slate-200 font-bold hover:bg-red-600 hover:text-red-50 transition-all duration-300 rounded-sm;
}

.my-basic-style-addUser {
  @apply px-2 py-1 text-slate-700 border border-slate-200 font-bold hover:bg-slate-600 hover:text-red-50 transition-all duration-300 rounded-sm;
}
</style>
