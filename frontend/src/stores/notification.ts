import { defineStore } from "pinia"
import { ref } from "vue"

type NotificationType = "success" | "error" | "info"

interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number

  remaining?: number
  startedAt?: number
  timeoutId?: ReturnType<typeof setTimeout>
}

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[]>([])

  function notify(
    message: string,
    type: NotificationType = "info",
    duration?: number
  ) {
    const id = crypto.randomUUID()

    const notification: Notification = {
      id,
      type,
      message,
      duration
    }

    // auto dismiss notification after duration
    if (duration) {
      notification.remaining = duration
      notification.startedAt = Date.now()

      notification.timeoutId = setTimeout(() => {
        remove(id)
      }, duration)
    }

    notifications.value.push(notification)
  }

  function remove(id: string) {
    const notification = notifications.value.find((n) => n.id === id)

    if (notification?.timeoutId) {
      clearTimeout(notification.timeoutId)
    }

    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  function pause(id: string) {
    const notification = notifications.value.find((n) => n.id === id)

    if (
      !notification ||
      !notification.timeoutId ||
      !notification.startedAt ||
      notification.remaining === undefined
    ) {
      return
    }

    clearTimeout(notification.timeoutId)

    const elapsed = Date.now() - notification.startedAt

    notification.remaining = Math.max(0, notification.remaining - elapsed)

    notification.timeoutId = undefined
  }

  function resume(id: string) {
    const notification = notifications.value.find((n) => n.id === id)

    if (
      !notification ||
      notification.remaining === undefined ||
      notification.remaining <= 0
    ) {
      return
    }

    // prevent multiple timers
    if (notification.timeoutId) {
      return
    }

    notification.startedAt = Date.now()

    notification.timeoutId = setTimeout(() => {
      remove(id)
    }, notification.remaining)
  }

  return { notifications, notify, remove, pause, resume }
})
