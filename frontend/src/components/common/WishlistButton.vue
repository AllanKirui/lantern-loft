<script setup lang="ts">
// TODO add complete logic for adding/removing to wishlist
import { computed, ref } from "vue"
import ComingSoonLink from "./ComingSoonLink.vue"

const props = withDefaults(
  defineProps<{
    scope?: "card" | "page"
  }>(),
  {
    scope: "card"
  }
)

const hasWishlisted = ref(false)

const btnClasses = computed(() => {
  let classes = "btn-rounded "

  if (props.scope === "page") {
    classes += "hover:after:bg-cream "
  } else {
    classes += "bg-black/75 md:bg-black/40 text-cosmic-latte "
  }

  if (props.scope === "card") {
    if (hasWishlisted.value) {
      classes += "md:bg-black/75 md:animate-scale-up "
    } else {
      classes +=
        "md:hover:after:bg-black/75 md:animate-scale-down md:group-hover:animate-scale-up "
    }
  }

  return classes
})
</script>

<template>
  <ComingSoonLink type="button" :class="btnClasses">
    <!-- Add to wishlist icon -->
    <img
      src="@/assets/icons/ui/wishlist-add.png"
      alt=""
      class="w-[16.4px] h-auto"
    />
  </ComingSoonLink>
</template>
