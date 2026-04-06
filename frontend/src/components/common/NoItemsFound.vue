<template>
  <div class="flex flex-col items-center justify-center h-[45vh]">
    <div class="animate-fade-in-down" :style="{ animationDelay: '0.1s' }">
      <BaseIcon
        name="bulb-off"
        class="w-24 h-24 text-pale-brown"
        :stroke-width="1.3"
      />
    </div>

    <div
      class="mt-5 fs-no-items-found text-center animate-fade-in-down"
      :style="{ animationDelay: '0.2s' }"
    >
      <slot name="message" />
    </div>
  </div>
</template>
