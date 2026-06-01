<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification"

withDefaults(defineProps<{ type?: "link" | "button" }>(), {
  type: "link"
})

const notificationStore = useNotificationStore()

function handleClick(event: MouseEvent) {
  event.preventDefault()

  notificationStore.notify("Feature coming soon", "info", 3000)
}
</script>

<template>
  <template v-if="type === 'link'">
    <a href="#" @click="handleClick">
      <slot />
    </a>
  </template>

  <template v-else>
    <button @click="handleClick">
      <slot />
    </button>
  </template>
</template>
