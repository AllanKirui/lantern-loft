import { ref, computed } from "vue"
import type {
  LaravelPaginatedResponse,
  LaravelPaginationMeta,
  LaravelPaginationLinks
} from "@/types/api/laravel"

export function usePagination<T>() {
  const items = ref<T[]>([])
  const meta = ref<LaravelPaginationMeta | null>(null)
  const links = ref<LaravelPaginationLinks | null>(null)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = computed(() => meta.value?.currentPage ?? 1)
  const lastPage = computed(() => meta.value?.lastPage ?? 1)

  const totalItems = computed(() => meta.value?.total ?? 0)

  const from = computed(() => meta.value?.from ?? 0)
  const to = computed(() => meta.value?.to ?? 0)

  const hasNextPage = computed(() => !!links.value?.next)
  const hasPrevPage = computed(() => !!links.value?.prev)

  async function fetchPage(
    fetcher: (page: number) => Promise<LaravelPaginatedResponse<T>>,
    page = 1
  ) {
    try {
      isLoading.value = true
      error.value = null

      const response = await fetcher(page)

      items.value = response.data
      meta.value = response.meta
      links.value = response.links
    } catch (err: any) {
      error.value = err.message ?? "Failed to fetch data"
    } finally {
      isLoading.value = false
    }
  }

  return {
    items,
    meta,
    links,
    isLoading,
    error,
    currentPage,
    lastPage,
    totalItems,
    from,
    to,
    hasNextPage,
    hasPrevPage,
    fetchPage
  }
}
