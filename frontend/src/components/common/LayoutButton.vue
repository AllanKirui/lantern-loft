<script setup lang="ts">
import { computed } from "vue"
import { useLayoutStore } from "@/stores/layout"

const layoutStore = useLayoutStore()
const layout = computed(() => layoutStore.layout)

function toggleLayout() {
  if (layoutStore.layout === "grid") layoutStore.setLayout("list")
  else layoutStore.setLayout("grid")
}
</script>

<template>
  <button
    class="flex items-center justify-center btn-secondary w-[34px] h-[34px]"
    @click="toggleLayout"
    :title="layout === 'grid' ? 'Show list layout' : 'Show grid layout'"
  >
    <BaseIcon
      v-show="layout === 'list'"
      name="grid"
      class="w-5 h-5 animate-scale-up"
    />
    <BaseIcon
      v-show="layout === 'grid'"
      name="list"
      class="w-[22px] h-[22px] animate-scale-up"
    />
  </button>
</template>
