<script setup lang="ts">
defineProps<{ linkColor: string }>()
</script>

<template>
  <p>
    Designed and built by
    <a
      class="link-hover"
      :class="linkColor"
      href="https://allankirui.github.io"
      target="_blank"
      rel="noreferrer"
      data-replace="Allan Kirui"
      ><span>Allan Kirui</span></a
    >.
  </p>
</template>
