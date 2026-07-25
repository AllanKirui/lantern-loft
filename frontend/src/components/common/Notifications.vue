<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification"
import BaseCloseButton from "../base/BaseCloseButton.vue"

const notificationStore = useNotificationStore()
</script>

<template>
  <transition-group
    name="notification"
    tag="div"
    class="fixed top-4 right-4 left-4 sm_plus:left-auto sm_plus:min-w-80 z-[150] space-y-2"
  >
    <div
      v-for="note in notificationStore.notifications"
      :key="note.id"
      class="notification custom-shadow duration-150"
      :class="{
        'bg-green-400 text-black': note.type === 'success',
        'bg-red-pigment text-cosmic-latte': note.type === 'error',
        'bg-cream text-chestnut-brown': note.type === 'info'
      }"
      @mouseenter="notificationStore.pause(note.id)"
      @mouseleave="notificationStore.resume(note.id)"
    >
      {{ note.message }}

      <BaseCloseButton
        class="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8"
        :class="[
          note.type === 'success' && 'hover:after:bg-green-200/65',
          note.type === 'error' && ' hover:after:bg-jet/65',
          note.type === 'info' && 'text-pale-brown hover:after:bg-bone/75'
        ]"
        @click="notificationStore.remove(note.id)"
      >
        <BaseIcon name="close" class="w-[18px] h-[18px]" :stroke-width="2.5" />
      </BaseCloseButton>

      <!-- Progress Bar -->
      <div
        v-if="note.duration"
        :class="[
          'notification-progress',
          note.type === 'success' && 'bg-green-200',
          note.type === 'error' && 'bg-red-200',
          note.type === 'info' && 'bg-chestnut-brown'
        ]"
        :style="{ animationDuration: `${note.duration}ms` }"
      />
    </div>
  </transition-group>
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.notification-enter-to,
.notification-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.notification-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
@media (min-width: 640px) {
  .notification-enter-from {
    transform: translateX(50px);
  }
  .notification-enter-to,
  .notification-leave-from {
    transform: translateX(0);
  }
  .notification-leave-to {
    transform: translateX(50px);
  }
}
/* Smoothly animate other notifications shifting position */
.notification-move {
  transition: transform 0.3s ease;
}
.notification {
  position: relative;
  padding: 14px 16px;
  padding-right: 48px;
  border-radius: 0.25rem;
  overflow: hidden;
}
.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  transform-origin: left center;
  animation-name: shrinkProgress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
.notification:hover .notification-progress {
  animation-play-state: paused;
}
@keyframes shrinkProgress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
