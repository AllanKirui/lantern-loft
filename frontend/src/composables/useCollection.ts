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
    max_price: null,
    rating: null
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

  // Internal sort options for API requests, not shown in URL
  const sort = ref<string>("newest")
  const perPage = ref<number>(12)

  // Check for stored sort options when the composable initializes
  const storedSort = localStorage.getItem("sort")
  if (storedSort) sort.value = storedSort

  const storedPerPage = localStorage.getItem("perPage")
  if (storedPerPage) perPage.value = Number(storedPerPage)

  // API params
  const params = computed(() => ({
    ...query.value,
    ...filters.value,
    sort: sort.value,
    per_page: perPage.value
  }))

  const hasFilters = computed(() => {
    // Check category from URL
    const hasCategory = !!route.query.category

    // Check internal filters
    const hasPrice =
      filters.value.min_price !== null || filters.value.max_price !== null

    const hasRating = filters.value.rating !== null

    return hasCategory || hasPrice || hasRating
  })

  const hasItems = computed(() => items.value.length > 0)

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
    applyChanges({
      filters: {
        min_price: null,
        max_price: null,
        rating: null
      },
      query: {
        category: null,
        page: 1
      }
    })
  }

  function removeFilter(type: "category" | "price" | "rating") {
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

      case "rating":
        applyChanges({
          filters: { rating: null },
          query: { category: route.query.category ?? null, page: 1 }
        })
    }
  }

  // Batch updates to avoid sending multiple requests when filters and the query changes
  function applyChanges({
    query: newQuery,
    filters: newFilters,
    sort: newSort,
    perPage: newPerPage
  }: {
    query?: Record<string, any>
    filters?: Record<string, any>
    sort?: string
    perPage?: number
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

    // Handle sort
    if (newSort !== undefined) {
      sort.value = newSort
    }

    // Handle per page
    if (newPerPage !== undefined) {
      perPage.value = newPerPage
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

  // Watch filters and sort options for changes and persist to local storage
  watch(
    filters,
    (f) => {
      if (!isHydrated) return
      localStorage.setItem("filters", JSON.stringify(f))
    },
    { deep: true }
  )

  watch(sort, (value) => {
    localStorage.setItem("sort", value)
    applyChanges({ sort: value, query: { page: 1 } })
  })

  watch(perPage, (value) => {
    localStorage.setItem("perPage", String(value))
  })

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
    sort,
    perPage,
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
