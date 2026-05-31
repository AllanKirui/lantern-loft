import { defineStore } from "pinia"
import { ref } from "vue"

type NotificationType = "success" | "error" | "info"

interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[]>([])

  function notify(
    message: string,
    type: NotificationType = "info",
    duration?: number
  ) {
    const id = crypto.randomUUID()

    notifications.value.push({ id, type, message, duration })

    // auto dismiss notification after duration
    if (duration) setTimeout(() => remove(id), duration)
  }

  function remove(id: string) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  return { notifications, notify, remove }
})
