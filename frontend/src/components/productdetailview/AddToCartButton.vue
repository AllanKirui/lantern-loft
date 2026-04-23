<script setup lang="ts">
withDefaults(defineProps<{ showPrice?: boolean }>(), {
  showPrice: false
})
</script>

<template>
  <button
    class="btn-primary flex justify-center gap-2.5 w-full mx-auto sm_plus:max-w-96"
  >
    Add to Cart

    <div v-if="showPrice" class="flex items-center gap-2.5">
      <!-- Vertical Divider -->
      <span class="w-[1px] h-5 bg-crayola/75" />

      <div>
        <span class="mr-[2px] text-sm leading-none">kes</span>
        <span class="leading-none">{{ (5345).toLocaleString() }}</span>
      </div>
    </div>
  </button>
</template>
