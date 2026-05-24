<script setup lang="ts">
import AuthMain from "@/components/authview/AuthMain.vue"
import AuthSectionHeader from "@/components/authview/AuthSectionHeader.vue"
import AuthFormInput from "@/components/authview/AuthFormInput.vue"
import AuthAuxiliaryLink from "@/components/authview/AuthAuxiliaryLink.vue"

function handleSubmit() {
  // TODO: hook into your register API
}

const sectionHeaderData = {
  title: "Sign In",
  text: "Hey there! Sign in to access saved carts, wishlists, account information and more."
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

      <!-- Create account link -->
      <AuthAuxiliaryLink to="/account/create" title="Create account">
        New Customer?
      </AuthAuxiliaryLink>
    </form>
  </AuthMain>
</template>
