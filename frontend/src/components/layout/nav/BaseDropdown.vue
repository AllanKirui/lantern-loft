<script setup lang="ts">
interface Props {
  id: string
  title: string
  manageHref: string
}

defineProps<Props>()

const emit = defineEmits(["close"])
</script>

<template>
  <div
    :id="id"
    class="nav-dropdown-width absolute right-0 px-4 py-3 text-chestnut-brown bg-cosmic-latte custom-shadow overflow-hidden rounded-b-md"
  >
    <!-- Header -->
    <div class="flex justify-between">
      <div class="flex items-center gap-3">
        <h2 class="fs-nav-h2 font-bold">{{ title }}</h2>

        <!-- Vertical divider -->
        <span class="w-[1px] h-5 bg-pale-brown" />

        <a :href="manageHref">Manage items</a>
      </div>

      <button
        class="btn-hover flex items-center justify-center w-8 h-8 hover:after:bg-cream rounded-full"
        @click="emit('close')"
      >
        <BaseIcon
          name="close"
          class="w-[18px] h-[18px] duration-200"
          :stroke-width="2.5"
        />
        <span class="sr-only">Close</span>
      </button>
    </div>

    <!-- Horizontal divider -->
    <span class="block mt-3 w-full h-[1px] bg-bone" />

    <!-- Slot for dynamic content (like item list or empty state) -->
    <div class="mt-5">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.nav-dropdown-width {
  width: calc(100vw - 3rem);
}

@media (min-width: 976px) {
  .nav-dropdown-width {
    width: 48rem;
  }
}
</style>
