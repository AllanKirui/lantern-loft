<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: "page-change", page: number): void
}>()
</script>

<template>
  <!-- Pagination -->
  <nav
    class="mt-8 flex items-center justify-center gap-2"
    aria-label="Pagination"
  >
    <!-- Prev Button -->
    <button
      class="pagination-button disabled:pointer-events-none disabled:text-chestnut-brown/30"
      :disabled="currentPage === 1"
      @click="$emit('page-change', currentPage - 1)"
    >
      <span class="sr-only">Previous</span>
      <BaseIcon
        name="chevron"
        class="relative top-[1px] right-[1px] w-[12px] h-[7.4px] z-10 rotate-90"
        :stroke-width="6.5"
      />
    </button>

    <!-- Page Buttons -->
    <template v-for="page in totalPages" :key="page">
      <button
        @click="$emit('page-change', page)"
        class="pagination-button font-medium duration-200"
        :class="{
          'bg-chestnut-brown text-cosmic-latte hover:after:bg-chestnut-brown':
            currentPage === page
        }"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next Button -->
    <button
      class="pagination-button disabled:pointer-events-none disabled:text-chestnut-brown/30"
      :disabled="currentPage === totalPages"
      @click="$emit('page-change', currentPage + 1)"
    >
      <span class="sr-only">Next</span>
      <BaseIcon
        name="chevron"
        class="relative top-[1px] right-[1px] w-[12px] h-[7.4px] z-10 -rotate-90"
        :stroke-width="6.5"
      />
    </button>
  </nav>
</template>
