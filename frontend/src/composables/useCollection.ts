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
    category: route.query.category
  }))

  async function load() {
    try {
      isLoading.value = true
      error.value = null

      const res = await fetcher(query.value)

      items.value = res.data
      meta.value = res.meta
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  function updateQuery(newQuery: Record<string, any>) {
    router.push({
      query: {
        ...route.query,
        ...newQuery,
        page: 1 // reset page on filter change
      }
    })
  }

  function setPage(page: number) {
    if (page === query.value.page) return

    router.push({
      query: {
        ...route.query,
        page
      }
    })
  }

  // When the query changes, fetch items
  watch(query, load, { immediate: true })

  return {
    items,
    meta,
    isLoading,
    error,
    query,
    setPage,
    updateQuery
  }
}
