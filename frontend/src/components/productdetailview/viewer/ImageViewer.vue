<script setup lang="ts">
import BaseModal from "@/components/base/BaseModal.vue"
import ImageViewerContent from "./ImageViewerContent.vue"
</script>

<template>
  <BaseModal name="imageViewer" :coverFullScreenOnMobile="true">
    <ImageViewerContent />
  </BaseModal>
</template>
