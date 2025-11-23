<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const isVisible = ref(false)
const SHOW_AT = 300 // Shows after scrolling the viewport X pixels

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

const handleScroll = () => {
  isVisible.value = window.scrollY > SHOW_AT
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <button
    @click="scrollToTop"
    class="group btn-rounded w-11 h-11 fixed bottom-6 right-6 z-50 bg-bone/75 hover:after:bg-jet shadowed"
    :class="[isVisible ? 'text-black animate-scale-up' : 'animate-scale-down']"
    aria-label="Back to top"
  >
    <BaseIcon
      name="chevron"
      class="w-[14px] h-[8.7px] group-hover:text-bone duration-200 rotate-180"
      :stroke-width="5"
    />
  </button>
</template>

<style scoped>
.shadowed {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
