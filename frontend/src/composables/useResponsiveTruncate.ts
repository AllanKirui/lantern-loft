import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import { useLayoutStore } from "@/stores/layout"

function truncateWords(text: string, wordLimit: number, suffix = "…") {
  if (!text || wordLimit <= 0) return ""

  const words = text.trim().split(/\s+/)
  if (words.length <= wordLimit) return text

  return words.slice(0, wordLimit).join(" ") + suffix
}

const layoutStore = useLayoutStore()

export function useResponsiveTruncate(
  text: string,
  limits: {
    sm?: number
    sm_plus?: number
    md?: number
    lg?: number
    xl?: number
    default: number
  }
) {
  const width = ref(window.innerWidth)

  let timeout: number

  const updateWidth = () => {
    clearTimeout(timeout)

    timeout = window.setTimeout(() => {
      width.value = window.innerWidth
    }, 150)
  }

  watch(
    () => layoutStore.layout,
    (newLayout) => {
      if (newLayout === "grid") {
        window.removeEventListener("resize", updateWidth)
      } else {
        window.addEventListener("resize", updateWidth)
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    window.addEventListener("resize", updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth)
  })

  const wordLimit = computed(() => {
    if (width.value >= 1440 && limits.xl) return limits.xl
    if (width.value >= 976 && limits.lg) return limits.lg
    if (width.value >= 768 && limits.md) return limits.md
    if (width.value >= 640 && limits.sm_plus) return limits.sm_plus
    if (width.value >= 480 && limits.sm) return limits.sm
    return limits.default
  })

  const truncated = computed(() => truncateWords(text, wordLimit.value))

  return {
    truncated,
    wordLimit
  }
}
