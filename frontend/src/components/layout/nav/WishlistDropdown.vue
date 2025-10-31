<script setup lang="ts">
import BaseDropdown from "./BaseDropdown.vue"

const emit = defineEmits(["close"])
</script>

<template>
  <BaseDropdown
    id="wishlist-dropdown"
    title="Saved Items"
    manage-href="/wishlist"
    @close="emit('close')"
  >
    <!-- Empty list -->
    <div class="mt-5 text-center">
      <BaseIcon
        name="wishlist"
        class="w-24 h-24 text-pale-brown"
        :stroke-width="3"
      />
      <p class="mt-5 fs-nav-lg">
        Your wishlist could use a little light — keep browsing and save your
        favorites!
      </p>
      <!-- TODO there're some reusable styles here from block... -->
      <a
        href="/collections"
        class="mt-5 mx-auto max-w-96 block py-[10px] font-medium text-center bg-eerie-black custom-shadow text-crayola rounded-md"
        >Go Shopping</a
      >
      <!-- TODO should not be underlined -->
      <p class="mt-5 mb-3">
        Not seeing your saved items from other logged in devices or past visits?
        <a href="/account/sign-in" class="font-medium underline">Sign in</a>.
      </p>
    </div>
  </BaseDropdown>
</template>
