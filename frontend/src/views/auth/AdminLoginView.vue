<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification"
import AuthMain from "@/components/authview/AuthMain.vue"
import AuthSectionHeader from "@/components/authview/AuthSectionHeader.vue"
import AuthFormInput from "@/components/authview/AuthFormInput.vue"
import AuthAuxiliaryLink from "@/components/authview/AuthAuxiliaryLink.vue"

const notificationStore = useNotificationStore()

function handleSubmit() {
  // TODO create an authService to handle form submission
  notificationStore.notify(
    "Can't do that right now. Feature coming soon.",
    "info",
    3000
  )
}

const sectionHeaderData = {
  title: "Welcome Back, Keeper of the Glow",
  text: "Enter your credentials to step behind the curtain and manage the magic of the Lantern Loft."
}
</script>

<template>
  <AuthMain>
    <AuthSectionHeader :section-header-data="sectionHeaderData" />

    <form
      @submit.prevent="handleSubmit"
      autocomplete="off"
      class="space-y-7 mt-5 md:mt-8"
    >
      <div class="space-y-7">
        <!-- Email -->
        <AuthFormInput
          id="email"
          name="email"
          type="email"
          label="email"
          required
        />

        <!-- Password -->
        <AuthFormInput
          id="password"
          name="password"
          type="password"
          label="password"
          required
        />
      </div>

      <!-- Submit -->
      <button type="submit" class="btn-primary w-full bg-crayola text-black">
        Sign In
      </button>

      <!-- Reset password link -->
      <AuthAuxiliaryLink
        to="/account/forgot-password"
        title="Forgot your password?"
      />
    </form>
  </AuthMain>
</template>
