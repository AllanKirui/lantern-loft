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
  let pendingFilters: Record<string, any>
  let isHydrated = false

  // Check for stored filters when the composable initializes
  const stored = localStorage.getItem("filters")
  if (stored) filters.value = JSON.parse(stored)

  // Sync pending filters
  pendingFilters = { ...filters.value }

  // Enable persistence after hydration
  isHydrated = true

  // API params
  const params = computed(() => ({
    ...query.value,
    ...filters.value
  }))

  const hasFilters = computed(() => {
    // Check category from URL
    const hasCategory = !!route.query.category

    // Check internal filters
    const hasPrice =
      filters.value.min_price !== null || filters.value.max_price !== null

    // TODO add rating

    return hasCategory || hasPrice
  })

  const hasItems = computed(() => (items.value.length > 0 ? true : false))

  let currentRequest = 0

  async function load() {
    const requestId = ++currentRequest

    try {
      isLoading.value = true
      error.value = null

      const res = await fetcher(params.value)

      // Ignore stale responses
      if (requestId !== currentRequest) return

      items.value = res.data
      meta.value = res.meta
    } catch (e: any) {
      error.value = e.message
    } finally {
      if (requestId === currentRequest) {
        isLoading.value = false
      }
    }
  }

  function resetFilters() {
    // TODO add rating
    applyChanges({
      filters: {
        min_price: null,
        max_price: null
      },
      query: {
        category: null,
        page: 1
      }
    })
  }

  function removeFilter(type: "category" | "price") {
    switch (type) {
      case "category":
        applyChanges({ query: { category: null, page: 1 } })
        break

      case "price":
        applyChanges({
          filters: { min_price: null, max_price: null },
          query: { category: route.query.category ?? null, page: 1 }
        })
        break

      // TODO add rating
    }
  }

  // Batch updates to avoid sending multiple requests when filters and the query changes
  function applyChanges({
    query: newQuery,
    filters: newFilters
  }: {
    query?: Record<string, any>
    filters?: Record<string, any>
  }) {
    const nextQuery: Record<string, any> = {}

    const category =
      newQuery && "category" in newQuery
        ? newQuery.category
        : route.query.category

    const page =
      newQuery && "page" in newQuery
        ? newQuery.page
        : Number(route.query.page ?? 1)

    if (category) nextQuery.category = category
    if (page && page !== 1) nextQuery.page = page

    // Prepare filters
    if (newFilters) {
      pendingFilters = {
        ...filters.value,
        ...newFilters
      }
    }

    // Avoid unnecessary router pushes by comparing the current and next queries
    const current = JSON.stringify(route.query)
    const next = JSON.stringify(nextQuery)

    // Handle the case where the route doesn't change, but there are pending filters
    if (current === next) {
      // Manually update filters and call load
      filters.value = { ...pendingFilters }
      load()
      return
    }

    // Then update the route
    router.push({ query: nextQuery })
  }

  // Watch filters for changes and persist to local storage
  watch(
    filters,
    (f) => {
      if (!isHydrated) return
      localStorage.setItem("filters", JSON.stringify(f))
    },
    { deep: true }
  )

  function setPage(page: number) {
    if (page === query.value.page) return
    applyChanges({ query: { category: route.query.category, page } })
  }

  watch(
    () => route.query,
    () => {
      if (route.name !== "collections") return

      filters.value = { ...pendingFilters }
      load()
    },
    { immediate: true }
  )

  const filterCount = ref(0)

  function setFilterCount(count: number) {
    filterCount.value = count
  }

  return {
    items,
    meta,
    isLoading,
    error,
    query,
    filters,
    hasFilters,
    hasItems,
    filterCount,
    resetFilters,
    removeFilter,
    setPage,
    applyChanges,
    setFilterCount
  }
}
