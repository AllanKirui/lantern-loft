<script setup lang="ts">
import BaseDropdown from "./BaseDropdown.vue"
</script>

<template>
  <BaseDropdown
    id="recent-items-dropdown"
    title="Recent Items"
    manage-href="/recent-items"
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

      <RouterLink to="/collections" class="btn-primary mt-5 mx-auto max-w-96"
        >Go Shopping</RouterLink
      >

      <p class="mt-5 mb-3">
        <RouterLink
          to="/account/sign-in"
          data-replace="Sign in"
          class="link-hover font-medium"
          ><span>Sign in</span></RouterLink
        >
        or
        <RouterLink
          to="/account/create"
          data-replace="create an account"
          class="link-hover font-medium"
          ><span>create an account</span></RouterLink
        >
        to see your stuff on all your devices.
      </p>
    </div>
  </BaseDropdown>
</template>
