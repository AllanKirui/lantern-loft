import { ref, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import type {
  LaravelPaginatedResponse,
  LaravelPaginationMeta
} from "@/types/api/laravel"

export function useCollection<T>(
  fetcher: (params: Record<string, any>) => Promise<LaravelPaginatedResponse<T>>
) {
  const route = useRoute()
  const router = useRouter()

  const items = ref<T[]>([])
  const meta = ref<LaravelPaginationMeta | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // URL driven query state for filters
  const query = computed(() => ({
    page: Number(route.query.page ?? 1),
    category: route.query.category ?? null
  }))

  // Internal filters for API requests, not shown in URL
  const filters = ref<Record<string, any>>({
    min_price: null,
    max_price: null
  })

  // API params
  const params = computed(() => ({
    ...query.value,
    ...filters.value
  }))

  async function load() {
    try {
      isLoading.value = true
      error.value = null

      const res = await fetcher(params.value)

      items.value = res.data
      meta.value = res.meta
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  // Update params that should be shown in URL
  function updateQuery(newQuery: Record<string, any>) {
    const next: Record<string, any> = {}

    const category = newQuery.category
    const page = newQuery.page ?? 1

    if (category) next.category = category
    if (page) next.page = page

    router.push({ query: next })
  }

  // Update internal filters used on request to API
  function setFilters(newFilters: Record<string, any>) {
    filters.value = {
      ...filters.value,
      ...newFilters
    }
  }

  function resetFilters() {
    filters.value = {
      min_price: null,
      max_price: null
    }

    updateQuery({ category: null })
  }

  function setPage(page: number) {
    if (page === query.value.page) return
    updateQuery({ page })
  }

  // When the query or internal filters change, fetch items
  watch([query, filters], load, { immediate: true })

  return {
    items,
    meta,
    isLoading,
    error,
    query,
    filters,
    setFilters,
    resetFilters,
    setPage,
    updateQuery
  }
}
