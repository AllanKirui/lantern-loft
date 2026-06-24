import { ref } from "vue"

/**
 * Reusable data-fetching composable for carousel-based sections.
 *
 * Handles:
 * - loading state
 * - error state
 * - fetched items
 *
 * By default, data is fetched immediately when the composable
 * is created. This behavior can be disabled to support
 * viewport-triggered or user-triggered loading strategies.
 */

// Example use cases for options:
//
// immediate: true  -> Featured Products, New Arrivals
// immediate: false -> Below-the-fold sections that load
//                     when approaching the viewport
export function useCarouselFetch<T>(
  fetcher: () => Promise<T[]>,
  errorMessage = "Failed to load items",
  options: { immediate?: boolean } = {}
) {
  const items = ref<T[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Tracks whether a successful fetch has already been initiated.
  //
  // This prevents duplicate requests when load() is triggered
  // multiple times, such as from an Intersection Observer.
  let hasLoaded = false

  /**
   * Fetch carousel data.
   *
   * Safe to call multiple times because repeated invocations
   * after the initial load are ignored.
   */
  async function load() {
    if (hasLoaded) return

    hasLoaded = true

    isLoading.value = true
    error.value = null

    try {
      items.value = await fetcher()
    } catch (err) {
      error.value = errorMessage
    } finally {
      isLoading.value = false
    }
  }

  // Automatically fetch data unless explicitly configured
  // for manual loading.
  if (options.immediate !== false) load()

  return {
    items,
    isLoading,
    error,
    load
  }
}
