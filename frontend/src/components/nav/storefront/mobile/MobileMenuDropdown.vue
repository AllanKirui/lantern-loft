<script setup lang="ts">
import BaseMobileDropdown from "./BaseMobileDropdown.vue"

const menuLinks = [
  {
    href: "/collections",
    text: "Shop All Lamps"
  },
  {
    href: "/collections?category=floor-lamps",
    text: "Floor Lamps"
  },
  {
    href: "/collections?category=table-lamps",
    text: "Table Lamps"
  },
  {
    href: "#",
    text: "About Us"
  },
  {
    href: "#",
    text: "Contact"
  },
  {
    href: "#",
    text: "Reviews"
  },
  {
    href: "#",
    text: "FAQs"
  }
]

const DELAY = 40 // Transition delay
</script>

<template>
  <BaseMobileDropdown>
    <ul class="mt-[18px]">
      <li
        v-for="(link, index) in menuLinks"
        :key="index"
        :id="index === 0 ? 'target' : ''"
        :style="{ transitionDelay: `${index * DELAY}ms` }"
      >
        <RouterLink
          class="btn-hover block p-3 text-lg leading-snug font-semibold hover:after:bg-cream"
          :to="link.href"
          >{{ link.text }}</RouterLink
        >
      </li>
    </ul>

    <!-- Mobile Menu Footer -->
    <div
      class="mt-auto"
      :style="{ transitionDelay: `${menuLinks.length * DELAY}ms` }"
    >
      <RouterLink
        to="/account/admin/sign-in"
        class="btn-hover flex gap-2 mt-3 px-3 py-[14px] font-medium hover:after:bg-cream"
      >
        <BaseIcon name="bulb-off" class="w-5 h-5 -mx-[3px]" :stroke-width="2" />
        <span>The Workshop</span></RouterLink
      >

      <!-- Horizontal divider -->
      <span class="block w-full h-[1px] bg-bone" />

      <div class="flex items-center justify-between mt-[14px]">
        <!-- Social Links -->
        <div class="flex gap-2">
          <a href="#" class="btn-rounded hover:after:bg-cream">
            <BaseIcon
              name="facebook"
              icon-type="social"
              class="w-7 h-7"
              :stroke-width="3.5"
            />
          </a>
          <a href="#" class="btn-rounded hover:after:bg-cream">
            <BaseIcon
              name="instagram"
              icon-type="social"
              class="w-7 h-7"
              :stroke-width="3.5"
            />
          </a>
        </div>

        <!-- Legal Links -->
        <div class="relative flex items-center gap-[10px]">
          <RouterLink
            to="#"
            data-replace="Privacy Policy"
            class="link-hover text-sm font-medium"
            ><span>Privacy Policy</span></RouterLink
          >

          <!-- Vertical divider -->
          <span class="w-[1px] h-5 bg-pale-brown" />

          <RouterLink
            to="#"
            data-replace="Conditions of Use"
            class="link-hover text-sm font-medium"
            ><span>Conditions of Use</span></RouterLink
          >
        </div>
      </div>
    </div>
  </BaseMobileDropdown>
</template>
