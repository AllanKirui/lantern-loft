<script setup lang="ts">
import { ref, computed } from "vue"

interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: "page-change", page: number): void
}>()

const showRipple = ref(false)

function handleClick(ev: PointerEvent, page: number) {
  const btn = ev.target as HTMLButtonElement
  const rippleEl = document.createElement("span")
  rippleEl.classList.add("circle")
  btn.appendChild(rippleEl)

  showRipple.value = !showRipple.value

  setTimeout(() => {
    showRipple.value = false
    btn.removeChild(rippleEl)
  }, 320) // Set it to the duration of the circle-scale-up animation in index.css

  emit("page-change", page)
}

// Condensed pagination
const paginationPages = computed(() =>
  getPaginationPages(props.currentPage, props.totalPages)
)

// Function returns an array with condensed pagination e.g [1, "...", 4, 5, 6, "...", 10]
function getPaginationPages(currentPage: number, lastPage: number, delta = 1) {
  const range = []
  const rangeWithDots = []
  let l: number | null = null

  for (let i = 1; i <= lastPage; i++) {
    if (
      i === 1 ||
      i === lastPage ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (l !== null) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push("...")
      }
    }

    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}
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
      @click="($event) => handleClick($event, currentPage - 1)"
    >
      <span class="sr-only">Previous</span>
      <BaseIcon
        name="chevron"
        class="relative top-[1px] right-[1px] w-[12px] h-[7.4px] z-10 rotate-90"
        :stroke-width="6.5"
      />
    </button>

    <!-- Page Buttons -->
    <template v-for="page in paginationPages" :key="page">
      <!-- Ellipsis -->
      <span
        v-if="page === '...'"
        class="grid place-items-center w-8 h-8 font-bold text-pale-brown pointer-events-none"
      >
        ...
      </span>

      <button
        v-else
        @click="($event) => handleClick($event, page as number)"
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
      @click="($event) => handleClick($event, currentPage + 1)"
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
