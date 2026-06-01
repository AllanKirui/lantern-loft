<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification"
import AuthMain from "@/components/authview/AuthMain.vue"
import AuthSectionHeader from "@/components/authview/AuthSectionHeader.vue"
import AuthFormInput from "@/components/authview/AuthFormInput.vue"
import AuthFormSection from "@/components/authview/AuthFormSection.vue"
import AuthAuxiliaryLink from "@/components/authview/AuthAuxiliaryLink.vue"

const notificationStore = useNotificationStore()

const sectionHeaderData = {
  title: "Create a Lantern Loft Account",
  text: "Join the Lanterneer family and start your glow journey. Access your wishlist and cart anywhere, track orders with ease, and enjoy faster checkouts every time."
}

function handleSubmit() {
  // TODO: hook into your register API
  notificationStore.notify(
    "Can't do that right now. Feature coming soon.",
    "info",
    3000
  )
}
</script>

<template>
  <AuthMain :make-wider="true">
    <AuthSectionHeader :section-header-data="sectionHeaderData" />

    <form @submit.prevent="handleSubmit" autocomplete="off" class="space-y-7">
      <div class="space-y-7 md:space-y-0 md:flex md:gap-7">
        <!-- Personal Information -->
        <AuthFormSection title="Personal Information">
          <!-- First Name -->
          <AuthFormInput
            id="firstName"
            name="firstName"
            label="first name"
            required
          />

          <!-- Last Name -->
          <AuthFormInput
            id="lastName"
            name="lastName"
            label="last name"
            required
          />
        </AuthFormSection>

        <!-- Sign In Information -->
        <AuthFormSection title="Sign-in Information">
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

          <!-- Confirm Password -->
          <AuthFormInput
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            label="confirm password"
            required
          />

          <!-- Submit -->
          <button
            type="submit"
            class="btn-primary w-full bg-crayola text-black"
          >
            Join the Lanterneers
          </button>
        </AuthFormSection>
      </div>

      <!-- Sign In link -->
      <AuthAuxiliaryLink to="/account/sign-in" title="Sign in">
        Already have an account?
      </AuthAuxiliaryLink>
    </form>
  </AuthMain>
</template>
