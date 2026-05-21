<script setup lang="ts">
defineProps<{ modelValue: number | null }>()

defineEmits<{
  (e: "update:modelValue", value: number | null): void
}>()
</script>

<template>
  <div class="flex flex-col gap-2 mt-2 mb-4 px-5">
    <label
      v-for="r in [5, 4, 3, 2, 1]"
      :key="r"
      class="flex items-center gap-2 cursor-pointer"
    >
      <input
        type="radio"
        name="rating"
        :value="r"
        :checked="modelValue === r"
        @click="$emit('update:modelValue', modelValue === r ? null : r)"
        class="w-4 h-4 accent-chestnut-brown"
      />
      <span>{{ r }} stars & up</span>
    </label>
  </div>
</template>
