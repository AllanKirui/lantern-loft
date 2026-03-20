import { defineStore } from "pinia"
import { ref, watch } from "vue"

type Layout = "grid" | "list"

export const useLayoutStore = defineStore("layout", () => {
  // Load initial state from localStorage providing a fallback
  const layout = ref<Layout>(
    (localStorage.getItem("layout") as Layout) || "grid"
  )

  function setLayout(option: Layout) {
    layout.value = option
  }

  // Persist to localStorage when layout changes
  watch(layout, (newVal) => {
    localStorage.setItem("layout", newVal)
  })

  return { layout, setLayout }
})
