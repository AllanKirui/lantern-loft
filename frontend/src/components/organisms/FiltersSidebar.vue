<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { useFiltersStore } from "@/stores/filters"
import { productService } from "@/services/productService"
import type { ProductFilters } from "@/types/products/product-filters"
import FiltersHeader from "../common/FiltersHeader.vue"
import FilterAccordion from "../common/FilterAccordion.vue"
import FilterAccordionToggle from "../common/FilterAccordionToggle.vue"
import FilterCategory from "../common/FilterCategory.vue"

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
          class="w-[22px] h-[22px] duration-200 rotate-180"
          :class="{ 'rotate-0': openAccordions[index] }"
        />
      </FilterAccordionToggle>

      <div v-show="openAccordions[index]" class="px-5 pb-4">
        <template v-if="group.key === 'category'">
          <FilterCategory :categories="filtersMeta.categories" />
        </template>
      </div>
    </FilterAccordion>

    <!-- TODO handle v-else case -->
  </aside>
</template>
