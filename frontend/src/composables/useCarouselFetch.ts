import { ref, onMounted } from "vue"

export function useCarouselFetch<T>(
  fetcher: () => Promise<T[]>,
  errorMessage = "Failed to load items"
) {
  const items = ref<T[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchItems() {
    try {
      isLoading.value = true
      error.value = null

      items.value = await fetcher()
    } catch (err) {
      console.error(err)
      error.value = errorMessage
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchItems)

  return {
    items,
    isLoading,
    error,
    fetchItems
  }
}
