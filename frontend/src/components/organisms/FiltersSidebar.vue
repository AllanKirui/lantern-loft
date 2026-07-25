<script setup lang="ts">
import { computed, reactive, ref, watch, inject, onMounted } from "vue"
import { useFiltersStore } from "@/stores/filters"
import { useNotificationStore } from "@/stores/notification"
import type { CollectionContext } from "@/types/collection"
import type { FiltersMetaContext } from "@/types/filters-meta"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import FiltersHeader from "../common/FiltersHeader.vue"
import FilterAccordion from "../common/FilterAccordion.vue"
import FilterAccordionToggle from "../common/FilterAccordionToggle.vue"
import FilterCategory from "../common/FilterCategory.vue"
import FilterPrice from "../common/FilterPrice.vue"
import FilterRating from "../common/FilterRating.vue"
import FiltersFooter from "../common/FiltersFooter.vue"

const filtersStore = useFiltersStore()
const notificationStore = useNotificationStore()

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

// Inject the filtersMeta instance coming from parent (StorefrontLayout.vue)
const filtersMeta = inject<FiltersMetaContext>("filtersMeta")!
const { meta, roundedMax, roundedMin, sliderStep, loadFilters } = filtersMeta

onMounted(loadFilters)

// Inject the collection instance coming from parent (StorefrontLayout.vue)
const collection = inject<CollectionContext<ProductCardExtended>>("collection")!

const { query, filters, hasFilters, resetFilters, applyChanges } = collection

const draftFilters = reactive({
  category: query.value.category ?? null,
  min_price: filters.value.min_price,
  max_price: filters.value.max_price,
  rating: filters.value.rating
})

// Update local filters state if the query or filters changes
watch([query, filters], ([q, f]) => {
  draftFilters.category = q.category ?? null
  draftFilters.min_price = f.min_price
  draftFilters.max_price = f.max_price
  draftFilters.rating = f.rating
})

function handlePriceChange(price: Record<string, number>) {
  hasCleared.value = false // reset state

  draftFilters.min_price = price.min_price ?? draftFilters.min_price
  draftFilters.max_price = price.max_price ?? draftFilters.max_price
}

// Number of filters applied
const appliedCount = computed(() => {
  let count = 0

  if (draftFilters.category !== query.value.category) count++
  if (draftFilters.min_price !== filters.value.min_price) count++
  if (draftFilters.max_price !== filters.value.max_price) count++
  if (draftFilters.rating !== filters.value.rating) count++

  return count
})

function checkPriceFiltersValidity() {
  // prevent filters from being applied if the the min price value
  // is greater than max price or min-max prices match
  const minPrice = draftFilters.min_price ?? roundedMin.value
  const maxPrice = draftFilters.max_price ?? roundedMax.value

  if (minPrice > maxPrice) {
    notificationStore.notify(
      "Can't apply filters. Minimum Price should be less than Maximum Price.",
      "info",
      5000
    )
    return false
  }

  if (minPrice === maxPrice) {
    notificationStore.notify(
      "Can't apply filters. Try adjusting the Price ranges.",
      "info",
      5000
    )
    return false
  }

  return true
}

function applyFilters() {
  if (!checkPriceFiltersValidity()) return

  filtersStore.close()

  const hasDefaultPriceRange =
    draftFilters.min_price === roundedMin.value &&
    draftFilters.max_price === roundedMax.value

  // return if the draft min-max prices equal the min-max prices from the API
  if (!draftFilters.category && !draftFilters.rating && hasDefaultPriceRange) {
    clearDraftFilters()
    return
  }

  // pass `null` as the filters price values if the draft min-max prices equal the min-max prices from the API
  applyChanges({
    filters: {
      min_price:
        draftFilters.min_price === roundedMin.value
          ? null
          : draftFilters.min_price,

      max_price:
        draftFilters.max_price === roundedMax.value
          ? null
          : draftFilters.max_price,

      rating: draftFilters.rating
    },
    query: { category: draftFilters.category, page: 1 }
  })
}

const hasDraftFilters = computed(() => {
  const selectedFilters = Object.values(draftFilters).map((val) =>
    val ? true : false
  )

  if (selectedFilters.includes(true)) return true
  else return false
})

const hasCleared = ref(false)

function clearFilters() {
  hasCleared.value = true

  if (!hasFilters.value) {
    clearDraftFilters()
    return
  }

  resetFilters()
  filtersStore.close()
}

function clearDraftFilters() {
  draftFilters.category = null
  draftFilters.min_price = null
  draftFilters.max_price = null
  draftFilters.rating = null
}

// animate accordion height
function onEnter(el: Element) {
  const element = el as HTMLElement

  element.style.height = "0"
  element.style.opacity = "0"
  element.style.transform = "translateY(-8px)"

  requestAnimationFrame(() => {
    element.style.height = element.scrollHeight + "px"
    element.style.opacity = "1"
    element.style.transform = "translateY(0)"
  })
}

function onLeave(el: Element) {
  const element = el as HTMLElement

  element.style.height = element.scrollHeight + "px"
  element.style.opacity = "1"

  requestAnimationFrame(() => {
    element.style.height = "0"
    element.style.opacity = "0"
    element.style.transform = "translateY(-8px)"
  })
}

// reset the height after animation finishes
function onAfterEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = "auto"
}
</script>

<template>
  <transition name="filters-sidebar">
    <aside
      v-if="filtersStore.sidebarVisible"
      class="fixed left-0 top-0 w-5/6 sm:w-96 h-screen bg-cosmic-latte z-[101] overflow-y-auto"
    >
      <FiltersHeader />

      <!-- Accordion filter groups -->
      <FilterAccordion
        v-if="meta"
        v-for="(group, index) in filterGroups"
        :key="group.key"
      >
        <FilterAccordionToggle
          :label="group.label"
          :aria-expanded="openAccordions[index]"
          :aria-controls="`accordion-panel-${index}`"
          @toggle="() => toggleAccordion(index)"
        >
          <BaseIcon
            name="chevronAlt"
            :class="[
              'w-[22px] h-[22px] duration-200',
              openAccordions[index] ? 'rotate-0' : 'rotate-180'
            ]"
          />
        </FilterAccordionToggle>

        <transition
          name="accordion"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @leave="onLeave"
        >
          <div
            :id="`accordion-panel-${index}`"
            v-if="openAccordions[index]"
            class="accordion-content"
          >
            <template v-if="group.key === 'category'">
              <FilterCategory
                :categories="meta.categories"
                :draft-filters="draftFilters"
                @click="(value) => (draftFilters.category = value)"
              />
            </template>

            <template v-if="group.key === 'price'">
              <FilterPrice
                :roundedMin="roundedMin"
                :roundedMax="roundedMax"
                :step="sliderStep"
                :draft-filters="draftFilters"
                :has-cleared="hasCleared"
                @price-change="handlePriceChange"
              />
            </template>

            <template v-if="group.key === 'rating'">
              <FilterRating v-model="draftFilters.rating" />
            </template>
          </div>
        </transition>
      </FilterAccordion>

      <!-- TODO handle v-else case -->

      <FiltersFooter
        :applied-count="appliedCount"
        :has-filters="hasDraftFilters"
        @apply="applyFilters"
        @clear="clearFilters"
      />
    </aside>
  </transition>
</template>

<style scoped>
.filters-sidebar-leave-to,
.filters-sidebar-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.filters-sidebar-leave-from,
.filters-sidebar-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.filters-sidebar-enter-active {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}
.filters-sidebar-leave-active {
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}
.accordion-content {
  overflow: hidden;
}
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
