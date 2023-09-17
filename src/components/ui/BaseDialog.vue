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

  mode: {
    type: String,
    required: false,
    default: "my-header-dialog",
  },

  mode2: {
    type: String,
    required: false,
    default: "my-dialog",
  },
});

const emit = defineEmits(["close"]);

function tryClose() {
  emit("close");
}
</script>

<template>
  <teleport to="body">
    <div class="my-backdrop z-40" v-if="show" @click="tryClose"></div>

    <Transition name="popup">
      <dialog open :class="mode2" v-if="show">
        <header :class="mode">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>

          <menu v-if="!fixed" class="my-menu-dialog">
            <slot name="actions">
              <base-button @click="tryClose">
                <XMarkIcon
                  class="p-1 h-6 w-6 text-slate-50 rounded-full bg-slate-950"
                ></XMarkIcon>
              </base-button>
            </slot>
          </menu>
        </header>

        <section class="p-7">
          <slot></slot>
        </section>
      </dialog>
    </Transition>
  </teleport>
</template>

<style scoped>
.my-backdrop {
  @apply fixed top-0 left-0 bg-slate-800 h-full w-full bg-opacity-40 z-40;
}

.my-dialog {
  @apply fixed w-96 max-h-96  top-1/3  z-40  rounded-md shadow-sm;
}

.my-edit-dialog {
  @apply text-xs w-96 max-h-96  text-slate-800 fixed top-1/3  flex flex-col gap-1 z-40 rounded-md shadow-sm;
}

.my-header-dialog {
  @apply text-slate-800 p-2 text-lg font-bold rounded-t-md flex justify-between;
}

.my-header-dialog-red {
  @apply bg-red-700  text-red-50 p-2 text-lg font-bold  rounded-t-md;
}

.my-menu-dialog {
}

/* Trasition */
.popup-enter-active,
.popup-leave-active {
  @apply transition-all duration-300 ease-linear;
}

.popup-enter-from,
.popup-leave-to {
  @apply opacity-0 scale-0;
}

.popup-enter-to,
.popup-leave-from {
  @apply opacity-100 scale-100;
}
</style>

<!-- h-35 w-30 text-xs text-blue-50 absolute top-0 right-0 flex flex-col gap-1 z-50 -->
