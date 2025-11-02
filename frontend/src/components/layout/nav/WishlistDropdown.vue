<script setup lang="ts">
import BaseDropdown from "./BaseDropdown.vue"

const emit = defineEmits(["close"])
</script>

<template>
  <BaseDropdown
    id="wishlist-dropdown"
    title="Saved Items"
    manage-href="/wishlist"
    @close="$emit('close')"
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
      <a href="/collections" class="btn-primary mt-5 mx-auto max-w-96"
        >Go Shopping</a
      >
      <p class="mt-5 mb-3">
        Not seeing your saved items from other logged in devices or past visits?
        <a
          href="/account/sign-in"
          data-replace="Sign in"
          class="link-hover font-medium"
          ><span>Sign in</span></a
        >.
      </p>
    </div>
  </BaseDropdown>
</template>
