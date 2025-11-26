<script setup lang="ts">
import BaseMobileDropdown from "./BaseMobileDropdown.vue"

const accountLinks = [
  {
    title: "My Orders",
    about: "Track, review, or revisit your past purchases",
    icon: "package"
  },
  {
    title: "My Wishlist",
    about: "Your saved favorites, all in one place",
    icon: "wishlist"
  },
  {
    title: "Recently Viewed",
    about: "Take another look at what caught your eye",
    icon: "history"
  },
  {
    title: "Account Settings",
    about: "Update your details, preferences, and password",
    icon: "key"
  }
]

const DELAY = 40 // Transition delay
</script>

<template>
  <BaseMobileDropdown>
    <ul class="mt-[18px]">
      <li
        v-for="(link, index) in accountLinks"
        :key="index"
        :style="{ transitionDelay: `${index * DELAY}ms` }"
      >
        <a
          href="#"
          class="btn-hover flex items-center gap-3 py-[10px] px-3 leading-none hover:after:bg-cream"
        >
          <BaseIcon :name="link.icon" class="w-6 h-6" :stroke-width="3.5" />

          <div class="flex flex-col gap-2">
            <span class="fs-mobile-account-link-title font-semibold">{{
              link.title
            }}</span>
            <span
              class="fs-mobile-account-link-about font-semibold text-pale-brown"
              >{{ link.about }}</span
            >
          </div>
        </a>

        <!-- Horizontal divider -->
        <span
          v-if="index !== accountLinks.length - 1"
          class="block w-full h-[1px] bg-bone"
        />
      </li>
    </ul>

    <!-- Mobile Account Menu Footer -->
    <div
      class="mt-auto"
      :style="{ transitionDelay: `${accountLinks.length * DELAY}ms` }"
    >
      <!-- Auth Links -->
      <a
        href="/account/create"
        class="btn-primary sm:max-w-96 sm:mx-auto fs-mobile-account-auth-link"
        >Create Account</a
      >
      <a
        href="/account/sign-in"
        data-replace="Sign In"
        class="link-hover block my-3 mx-auto w-fit font-medium fs-mobile-account-auth-link"
        ><span>Sign In</span></a
      >
    </div>
  </BaseMobileDropdown>
</template>
