<script setup lang="ts">
import { useRoute } from "vue-router"
import { computed, type Ref } from "vue"
import { capitalizeWords } from "@/utils/capitalizeWords"

interface BreadcrumbItem {
  label: string
  to?: string // Route path optional for the current page
}

const route = useRoute()

const breadcrumbs: Ref<BreadcrumbItem[]> = computed(() => {
  const meta = route.meta.breadcrumb
  return typeof meta === "function" ? meta(route) : meta || []
})
</script>

<template>
  <nav aria-label="breadcrumb" class="text-sm">
    <ol class="flex flex-wrap gap-1.5">
      <li v-for="(item, index) in breadcrumbs" :key="index">
        <!-- Link for all except last -->
        <RouterLink
          v-if="item.to"
          :to="item.to"
          :data-replace="item.label"
          class="link-hover mr-1.5"
        >
          <span>{{ item.label }}</span>
        </RouterLink>

        <!-- Last item -->
        <span v-else class="font-medium text-wrap">
          {{ capitalizeWords(item.label) }}
        </span>

        <!-- Separator -->
        <BaseIcon
          v-if="index < breadcrumbs.length - 1"
          name="chevron"
          class="w-[9px] h-[6px] -rotate-90 text-chestnut-brown"
          :stroke-width="7"
        />
      </li>
    </ol>
  </nav>
</template>
