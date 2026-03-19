<script setup lang="ts">
interface Props {
  price: number
  salePrice: number | null
  makeLarger?: boolean
}

withDefaults(defineProps<Props>(), {
  makeLarger: false
})
</script>

<template>
  <div>
    <!-- Previous price -->
    <div v-if="salePrice" class="flex items-center gap-2 flex-wrap mt-1">
      <div
        class="flex items-baseline whitespace-nowrap mt-[1px] font-semibold text-pale-brown"
      >
        <span class="mr-0.5 text-sm leading-none">Was kes</span>
        <span
          :class="['leading-none', makeLarger ? 'fs-pdp-original-price' : '']"
          >{{ price.toLocaleString() }}</span
        >
      </div>

      <!-- Savings -->
      <div
        :class="[
          'flex items-baseline whitespace-nowrap px-1 rounded font-semibold text-cosmic-latte bg-red-pigment',
          makeLarger ? 'py-[3px]' : 'py-0.5'
        ]"
      >
        <span class="mr-0.5 text-sm leading-none">Save kes</span>
        <span :class="['leading-none', makeLarger ? 'fs-pdp-savings' : '']">{{
          (price - salePrice).toLocaleString()
        }}</span>
      </div>
    </div>

    <!-- Current Price -->
    <div class="mt-1 font-semibold">
      <span
        :class="[
          'mr-0.5 leading-none',
          makeLarger ? 'fs-pdp-currency' : 'fs-product-card-currency'
        ]"
        >kes</span
      >
      <span
        :class="[
          'leading-none',
          makeLarger ? 'fs-pdp-current-price' : 'text-[22px]'
        ]"
        >{{ (salePrice || price).toLocaleString() }}</span
      >
    </div>
  </div>
</template>
