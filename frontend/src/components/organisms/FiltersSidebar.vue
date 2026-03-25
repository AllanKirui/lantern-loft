<script setup lang="ts">
import { reactive } from "vue"
import { useFiltersStore } from "@/stores/filters"
import FiltersHeader from "../common/FiltersHeader.vue"
import FilterAccordion from "../common/FilterAccordion.vue"
import FilterAccordionToggle from "../common/FilterAccordionToggle.vue"

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
</script>

<template>
  <aside
    v-if="filtersStore.sidebarVisible"
    class="fixed left-0 top-0 w-96 h-screen bg-cosmic-latte z-[101] overflow-y-auto"
  >
    <FiltersHeader />

    <!-- Accordion filter groups -->
    <FilterAccordion v-for="(group, index) in filterGroups" :key="group.key">
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
          Category: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Impedit dignissimos, excepturi rem distinctio molestias nulla quod,
          accusamus officiis temporibus nesciunt adipisci illum repellendus!
          Officia magni voluptas quo corrupti officiis animi.
        </template>
      </div>
    </FilterAccordion>
  </aside>
</template>
