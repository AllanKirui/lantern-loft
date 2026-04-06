<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import CollectionsToolbar from "./CollectionsToolbar.vue"
import LayoutButton from "../common/LayoutButton.vue"
import FiltersSidebarToggle from "../common/FiltersSidebarToggle.vue"
import type { LaravelPaginationMeta } from "@/types/api/laravel"

interface Props {
  meta: LaravelPaginationMeta | null
  isLoading: boolean
  error: string | null
  hasProducts: boolean
}

const props = defineProps<Props>()

const message = computed(() => {
  if (props.isLoading) return "Good things take time to shine…"
  if (props.error) return "Something dimmed the glow. Refresh to retry."
})

const route = useRoute()

const totalItems = computed(() => Number(props.meta?.total))

const subHeading = computed(() => {
  let heading = `${totalItems.value} `
  const category = route.query.category as string

  if (category) {
    // replace slug's hyphens with spaces
    const catString = category.split("-").join(" ")

    // handle singular/plural forms e.g table lamp(s)
    return (heading +=
      totalItems.value > 1 ? catString : catString.slice(0, -1))
  } else {
    return (heading += totalItems.value > 1 ? "products" : "product")
  }
})

const displayText = computed(() =>
  totalItems.value > 1
    ? `Displaying ${props.meta?.from}-${props.meta?.to} of ${totalItems.value} products`
    : `Displaying ${totalItems.value} product`
)
</script>

<template>
  <header class="sp-mt-collections-header">
    <div class="text-center">
      <div class="flex gap-1 justify-center items-center">
        <span
          class="inline-block w-[14px] h-[1px] md:w-6 md:h-[1.5px] bg-pale-brown"
        ></span>
        <p class="text-xs uppercase font-semibold">
          Have you seen these future favorites?
        </p>
      </div>

      <h1 class="fs-h2 font-bold max-w-xs mx-auto leading-snug">
        Explore our <br />
        ever-growing collection
      </h1>

      <p
        class="sp-mt-section-sub-heading fs-collections-header-about max-w-xl mx-auto"
      >
        Browse our collection of lamps and a wide range of finishes to find the
        lamp, pattern and color that's 100% right for you.
      </p>
    </div>

    <div
      class="sp-mt-section-sub-heading flex flex-col justify-center flex-wrap md:flex-row md:justify-between md:items-center min-h-[34px]"
    >
      <!-- Loading & error message -->
      <div v-if="isLoading || error">
        <h3 class="fs-h3 font-semibold leading-none">
          {{ message }}
        </h3>
      </div>

      <!-- Products meta -->
      <div v-else-if="hasProducts">
        <h3 class="fs-h3 font-semibold leading-none">
          {{ subHeading }}
        </h3>
        <span
          class="fs-items-count text-pale-brown block mt-2 md:mt-[10px] font-medium leading-none"
          >{{ displayText }}</span
        >
      </div>

      <!-- No products found message for filters  -->
      <div v-else>
        <h3 class="fs-h3 font-semibold leading-none">
          No matches, but great taste!
        </h3>
      </div>

      <!-- Sort & filter controls -->
      <CollectionsToolbar v-show="!isLoading && !error">
        <div class="flex items-center gap-3">
          <FiltersSidebarToggle />
          <LayoutButton />
        </div>
      </CollectionsToolbar>
    </div>
  </header>
</template>
