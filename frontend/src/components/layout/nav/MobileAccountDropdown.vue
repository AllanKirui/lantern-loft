<script setup lang="ts">
import BaseMobileDropdown from "./BaseMobileDropdown.vue"
</script>

<template>
  <BaseMobileDropdown>
    <ul class="">
      <li
        v-for="(_, index) in Array.from({ length: 5 }, (_, i) => i)"
        :key="index"
        class="px-4 py-3"
        :style="{ transitionDelay: `${index * 65}ms` }"
      >
        <a href="#">Lorem ipsum dolor sit amet consectetur</a>
      </li>
    </ul>
  </BaseMobileDropdown>
</template>
