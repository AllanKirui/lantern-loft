<script setup lang="ts">
import BaseDropdown from "./BaseDropdown.vue"

const emit = defineEmits(["close"])
</script>

<template>
  <BaseDropdown
    id="recent-items-dropdown"
    title="Recent Items"
    manage-href="/recent-items"
    @close="emit('close')"
  >
    <!-- Empty list -->
    <div class="mt-5 text-center">
      <BaseIcon
        name="history"
        class="w-24 h-24 text-pale-brown"
        :stroke-width="3"
      />
      <p class="mt-5 fs-nav-lg">
        Looks like we don't have anything recent for you.
      </p>
      <!-- TODO there're some reusable styles here from block... -->
      <a
        href="/collections"
        class="block py-[10px] font-medium text-center bg-eerie-black custom-shadow text-crayola rounded-md mt-5 mx-auto max-w-96"
        >Go Shopping</a
      >
      <!-- TODO should not be underlined -->
      <p class="mt-5 mb-3">
        <a href="/account/sign-in" class="font-medium underline">Sign in</a>
        or
        <a href="/account/create" class="font-medium underline"
          >create an account</a
        >
        to see your stuff on all your devices.
      </p>
    </div>
  </BaseDropdown>
</template>
