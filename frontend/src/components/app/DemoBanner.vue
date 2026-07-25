<script setup lang="ts">
import { useDemoBanner } from "@/composables/useDemoBanner"
import BaseCloseButton from "../base/BaseCloseButton.vue"

const { isVisible, dismiss } = useDemoBanner()
</script>

<template>
  <transition name="slide-down">
    <aside
      v-if="isVisible"
      class="bg-black border-b border-jet text-sm text-cream"
    >
      <div
        class="container mx-auto flex flex-col sm_plus:flex-row items-center justify-between gap-5 px-4 py-3"
      >
        <span
          class="px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-crayola/15 text-crayola text-center rounded-full"
        >
          Portfolio Demo
        </span>

        <div class="flex items-center gap-4">
          <p class="leading-relaxed">
            <span class="font-medium">Demo Mode:</span>

            You're viewing the static GitHub Pages version. This demo faithfully
            recreates the Laravel API using generated data. The full
            Laravel-powered application will be available once hosting is in
            place.

            <a
              href="https://github.com/AllanKirui/lantern-loft"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center rounded-full border border-emerald-500/30 bg-esmerald/10 px-3 py-1 text-xs font-medium text-esmerald transition hover:bg-esmerald/20 hover:text-esmerald duration-200"
            >
              View Laravel backend on GitHub →
            </a>
          </p>

          <BaseCloseButton
            class="flex-shrink-0 hover:after:bg-jet"
            @click="dismiss"
          >
            <BaseIcon name="close" class="w-4 h-4" :stroke-width="2.5" />
          </BaseCloseButton>
        </div>
      </div>
    </aside>
  </transition>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
