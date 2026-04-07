<script setup lang="ts">
interface Props {
  appliedCount: number
  hasFilters: boolean
}

defineProps<Props>()
defineEmits(["apply", "clear"])
</script>

<template>
  <div class="px-4 py-5">
    <div>
      <button
        :disabled="appliedCount === 0"
        class="btn-primary w-full disabled:pointer-events-none"
        @click="$emit('apply')"
      >
        Apply
        <template v-if="appliedCount > 0"> ({{ appliedCount }}) </template>
      </button>

      <span
        v-if="!hasFilters"
        class="block mt-2 text-center italic text-sm animate-fade-in-down"
        >Select some filters to apply</span
      >
    </div>

    <div class="mt-3 animate-fade-in-down">
      <button
        v-if="hasFilters"
        class="btn-secondary py-[9px] w-full"
        @click="$emit('clear')"
      >
        Clear All
      </button>
    </div>
  </div>
</template>
