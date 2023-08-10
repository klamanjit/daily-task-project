<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },

  title: {
    type: String,
    required: false,
  },

  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["close"]);

function tryClose() {
  emit("close");
}
</script>

<template>
  <teleport to="body">
    <div class="my-backdrop" v-if="show" @click="tryClose"></div>
    <dialog open class="my-dialog" v-if="show">
      <header class="my-header-dialog">
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>

      <section class="p-10">
        <slot></slot>
      </section>

      <menu v-if="!fixed" class="my-menu-dialog">
        <slot name="actions">
          <base-button @click="tryClose">
            <XMarkIcon
              class="h-6 w-6 bg-slate-950 text-slate-50 rounded-full"
            ></XMarkIcon>
          </base-button>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<style scoped>
.my-backdrop {
  @apply fixed top-0 left-0 bg-slate-700 h-full w-full bg-opacity-50 z-20;
}

.my-dialog {
  @apply fixed w-96 top-40 z-50  rounded-md shadow-sm;
}

.my-header-dialog {
  @apply bg-blue-600  text-blue-50 p-1;
}

.my-menu-dialog {
  @apply absolute -top-3 -right-2 p-1;
}
</style>
