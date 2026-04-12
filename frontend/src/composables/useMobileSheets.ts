import { ref } from "vue"

const sortOpen = ref(false)
const perPageOpen = ref(false)

export function useMobileSheets() {
  return {
    sortOpen,
    perPageOpen,
    openSort: () => (sortOpen.value = true),
    closeSort: () => (sortOpen.value = false),
    openPerPage: () => (perPageOpen.value = true),
    closePerPage: () => (perPageOpen.value = false)
  }
}
