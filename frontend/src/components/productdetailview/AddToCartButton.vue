<script setup lang="ts">
import ComingSoonLink from "../common/ComingSoonLink.vue"

interface Props {
  showPrice?: boolean
  price?: number
}

withDefaults(defineProps<Props>(), {
  showPrice: false
})
</script>

<template>
  <ComingSoonLink
    type="button"
    class="btn-primary flex justify-center gap-2.5 w-full mx-auto sm_plus:max-w-96"
  >
    Add to Cart

    <div v-if="showPrice && price" class="flex items-center gap-2.5">
      <!-- Vertical Divider -->
      <span class="w-[1px] h-5 bg-crayola/75" />

      <div>
        <span class="mr-[2px] text-sm leading-none">kes</span>
        <span class="leading-none">{{ price.toLocaleString() }}</span>
      </div>
    </div>
  </ComingSoonLink>
</template>
