<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from "vue"
import { useModalStore } from "@/stores/modal"

const modalStore = useModalStore()

interface Props {
  name: string
  coverFullScreenOnMobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  coverFullScreenOnMobile: false
})

const isOpen = computed(() => modalStore.activeModal === props.name)

const modalClasses = computed(() => {
  let classes = "fixed z-[102] "

  if (props.coverFullScreenOnMobile) {
    classes +=
      "top-0 left-0 w-full h-full sm_plus:w-auto sm_plus:h-auto sm_plus:left-1/2 sm_plus:-translate-x-1/2 sm_plus:top-1/2 sm_plus:-translate-y-1/2 "
  } else {
    classes += "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
  }

  return classes
})

// close on escape
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") modalStore.close()
}

onMounted(() => document.addEventListener("keydown", onKey))
onBeforeUnmount(() => document.removeEventListener("keydown", onKey))
</script>

<template>
  <Teleport to="body">
    <transition name="modal-scale">
      <div v-if="isOpen" :class="modalClasses">
        <slot />
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all 0.2s ease;
}

/* mobile transform */
.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.modal-scale-enter-to,
.modal-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* desktop transform */
@media (min-width: 640px) {
  .modal-scale-enter-from,
  .modal-scale-leave-to {
    transform: translate(-50%, -50%) scale(0.95);
  }

  .modal-scale-enter-to,
  .modal-scale-leave-from {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
