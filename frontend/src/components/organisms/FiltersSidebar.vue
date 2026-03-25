<script setup lang="ts">
import { useFiltersStore } from "@/stores/filters"
import FiltersHeader from "../common/FiltersHeader.vue"

const filtersStore = useFiltersStore()
</script>

<template>
  <aside
    v-if="filtersStore.sidebarVisible"
    class="fixed left-0 top-0 w-96 h-screen bg-cosmic-latte z-[101] overflow-y-auto"
  >
    <FiltersHeader />
  </aside>
</template>
