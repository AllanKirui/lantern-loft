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
  <div class="flex items-center gap-1.5 text-[15px]">
    <label :for="selectId" :class="{ 'sr-only': hideLabel }"
      >{{ label }}:</label
    >

    <div class="relative">
      <select
        :id="selectId"
        class="px-2 py-1 pr-7 appearance-none font-medium rounded bg-transparent cursor-pointer"
        v-model="modelValue"
        @change="onChange"
      >
        <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <!-- Custom arrow -->
      <div
        class="pointer-events-none absolute inset-y-0 right-1 flex items-center"
      >
        <BaseIcon
          name="chevron-alt"
          class="w-5 h-5 rotate-180 text-chestnut-brown"
        />
      </div>
    </div>
  </div>
</template>
