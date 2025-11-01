<script setup lang="ts">
const accountLinks = [
  {
    href: "/account",
    icon: "key",
    text: "Account Settings",
    description: "Update your details, preferences, and password"
  },
  {
    href: "/account/orders",
    icon: "package",
    text: "My Orders",
    description: "Track, review, or visit your past purchases"
  }
]
</script>

<template>
  <ul
    id="account-menu"
    class="absolute right-0 w-72 text-chestnut-brown custom-shadow bg-cosmic-latte overflow-hidden rounded-b-md"
  >
    <li v-for="(link, index) in accountLinks" :key="link.href">
      <a
        :href="link.href"
        class="btn-hover flex gap-2 px-4 py-2 hover:after:bg-cream"
        :style="{ transitionDelay: `${index * 50}ms` }"
      >
        <BaseIcon
          :name="link.icon"
          class="flex-shrink-0 mt-1 w-6 h-6"
          :stroke-width="3.5"
        />
        <div>
          <span class="block font-semibold">{{ link.text }}</span>
          <span class="block text-sm text-pale-brown">{{
            link.description
          }}</span>
        </div>
      </a>
    </li>
    <li class="my-2 px-[14px]">
      <a href="/account/create" class="btn-primary">Create Account</a>
    </li>
    <li class="my-2">
      <a
        href="/account/sign-in"
        data-replace="Sign In"
        class="link-hover block my-3 mx-auto w-fit font-medium"
        ><span>Sign In</span></a
      >
    </li>
  </ul>
</template>
