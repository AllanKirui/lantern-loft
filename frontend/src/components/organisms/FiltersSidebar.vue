<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue"
import { useFiltersStore } from "@/stores/filters"
import { productService } from "@/services/productService"
import { useCollection } from "@/composables/useCollection"
import type { ProductFilters } from "@/types/products/product-filters"
import FiltersHeader from "../common/FiltersHeader.vue"
import FilterAccordion from "../common/FilterAccordion.vue"
import FilterAccordionToggle from "../common/FilterAccordionToggle.vue"
import FilterCategory from "../common/FilterCategory.vue"
import FilterPrice from "../common/FilterPrice.vue"
import FiltersFooter from "../common/FiltersFooter.vue"

const filtersStore = useFiltersStore()

// Accordion controls
const filterGroups = [
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "rating", label: "Customer rating" }
]

const openAccordions = reactive<boolean[]>(filterGroups.map(() => true))
function toggleAccordion(i: number) {
  openAccordions[i] = !openAccordions[i]
}

const isLoading = ref(false)
const error = ref<string | null>(null)
const filtersMeta = ref<ProductFilters | null>(null)

async function loadFilters() {
  try {
    isLoading.value = true
    error.value = null
    filtersMeta.value = await productService.fetchFilters()
  } catch (err) {
    error.value = "Failed to load filters"
  } finally {
    isLoading.value = false
  }
}

onMounted(loadFilters)

const { query, updateQuery } = useCollection()

const draftFilters = reactive({
  category: query.value.category ?? undefined,
  min_price: query.value.min_price ?? (undefined as number | undefined),
  max_price: query.value.max_price ?? (undefined as number | undefined)
})

// Number of filters applied
const appliedCount = computed(() => {
  let count = 0

  if (draftFilters.category !== query.value.category) count++
  if (draftFilters.min_price !== query.value.min_price) count++
  if (draftFilters.max_price !== query.value.max_price) count++

  return count
})

function applyFilters() {
  updateQuery({
    category: draftFilters.category || undefined,
    min_price: draftFilters.min_price || undefined,
    max_price: draftFilters.max_price || undefined
  })
}

const hasFilters = computed(() => {
  const selectedFilters = Object.values(draftFilters).map((val) =>
    val ? true : false
  )

  if (selectedFilters.includes(true)) return true
  else return false
})

function clearFilters() {
  draftFilters.category = undefined
  draftFilters.min_price = undefined
  draftFilters.max_price = undefined

  updateQuery({
    category: undefined,
    min_price: undefined,
    max_price: undefined
  })
}
</script>

<template>
  <aside
    v-if="filtersStore.sidebarVisible"
    class="fixed left-0 top-0 w-96 h-screen bg-cosmic-latte z-[101] overflow-y-auto"
  >
    <FiltersHeader />

    <!-- Accordion filter groups -->
    <FilterAccordion
      v-if="filtersMeta"
      v-for="(group, index) in filterGroups"
      :key="group.key"
    >
      <FilterAccordionToggle
        :label="group.label"
        @toggle="() => toggleAccordion(index)"
      >
        <BaseIcon
          name="chevron-alt"
          :class="[
            'w-[22px] h-[22px] duration-200',
            openAccordions[index] ? 'rotate-0' : 'rotate-180'
          ]"
        />
      </FilterAccordionToggle>

      <div v-show="openAccordions[index]" class="px-5 pb-4">
        <template v-if="group.key === 'category'">
          <FilterCategory
            :categories="filtersMeta.categories"
            :draft-filters="draftFilters"
            @click="(value) => (draftFilters.category = value)"
          />
        </template>

        <template v-if="group.key === 'price'">
          <FilterPrice
            :price="filtersMeta.price"
            :query="query"
            @price-change="(price) => updateQuery(price)"
          />
        </template>
      </div>
    </FilterAccordion>

    <!-- TODO handle v-else case -->

    <FiltersFooter
      :applied-count="appliedCount"
      :has-filters="hasFilters"
      @apply="applyFilters"
      @clear="clearFilters"
    />
  </aside>
</template>
