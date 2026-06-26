<script setup lang="ts">
import Notifications from "./components/common/Notifications.vue"
import DemoBanner from "./components/app/DemoBanner.vue"
</script>

<template>
  <DemoBanner />
  <RouterView />
  <Notifications />
</template>
