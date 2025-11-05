<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  type: "link" | "button"
  text: string
  href?: string
}>()

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void
}>()
</script>

<template>
  <component
    :is="type === 'link' ? 'a' : 'button'"
    :href="type === 'link' ? href : undefined"
    :type="type === 'button' ? 'button' : undefined"
    class="relative -bottom-1 flex flex-col items-center gap-2 hover:text-bone duration-200"
    v-bind="$attrs"
    @click="type === 'button' && $emit('click', $event)"
  >
    <slot />
    <span class="fs-nav-sm uppercase leading-none">
      {{ text }}
    </span>
  </component>
</template>
