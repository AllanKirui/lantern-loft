<script setup lang="ts">
defineProps<{
  label: string
  hideLabel?: boolean
  selectId: string
  sortOptions: { value: string | number; label: string }[]
}>()

const emit = defineEmits(["change"])

const modelValue = defineModel<string | number>()

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit("change", target.value)
}
</script>

<template>
  <div>
    <label :for="selectId" class="mr-1" :class="{ 'sr-only': hideLabel }"
      >{{ label }}:</label
    >

    <select
      :id="selectId"
      class="p-1 font-medium rounded bg-transparent cursor-pointer"
      v-model="modelValue"
      @change="onChange"
    >
      <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
