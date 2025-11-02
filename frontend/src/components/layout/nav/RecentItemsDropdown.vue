<script setup lang="ts">
import BaseDropdown from "./BaseDropdown.vue"

const emit = defineEmits(["close"])
</script>

<template>
  <BaseDropdown
    id="recent-items-dropdown"
    title="Recent Items"
    manage-href="/recent-items"
    @close="$emit('close')"
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
      <a href="/collections" class="btn-primary mt-5 mx-auto max-w-96"
        >Go Shopping</a
      >
      <!-- TODO should not be underlined -->
      <p class="mt-5 mb-3">
        <a
          href="/account/sign-in"
          data-replace="Sign in"
          class="link-hover font-medium"
          ><span>Sign in</span></a
        >
        or
        <a
          href="/account/create"
          data-replace="create an account"
          class="link-hover font-medium"
          ><span>create an account</span></a
        >
        to see your stuff on all your devices.
      </p>
    </div>
  </BaseDropdown>
</template>
