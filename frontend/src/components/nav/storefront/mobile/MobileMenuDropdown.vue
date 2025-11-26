<script setup lang="ts">
import BaseMobileDropdown from "./BaseMobileDropdown.vue"

const menuLinks = [
  {
    href: "/collections",
    text: "Shop All Lamps"
  },
  {
    href: "#",
    text: "Floor Lamps"
  },
  {
    href: "#",
    text: "Desk Lamps"
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
        <a
          class="btn-hover block p-3 fs-mobile-menu-link font-semibold hover:after:bg-cream"
          :href="link.href"
          >{{ link.text }}</a
        >
      </li>
    </ul>

    <!-- Mobile Menu Footer -->
    <div
      class="mt-auto"
      :style="{ transitionDelay: `${menuLinks.length * DELAY}ms` }"
    >
      <a
        href="#"
        class="btn-hover flex gap-2 mt-3 px-3 py-[14px] fs-mobile-menu-workshop-link font-medium hover:after:bg-cream"
      >
        <BaseIcon name="bulb-off" class="w-5 h-5" :stroke-width="2" />
        <span>The Workshop</span></a
      >

      <!-- Horizontal divider -->
      <span class="block w-full h-[1px] bg-bone" />

      <div class="flex items-center justify-between mt-[14px]">
        <!-- Social Links -->
        <div class="flex gap-2">
          <a
            href="#"
            class="btn-hover flex items-center justify-center w-8 h-8 rounded-full hover:after:bg-cream"
          >
            <BaseIcon
              name="facebook"
              icon-type="social"
              class="w-7 h-7"
              :stroke-width="3.5"
            />
          </a>
          <a
            href="#"
            class="btn-hover flex items-center justify-center w-8 h-8 rounded-full hover:after:bg-cream"
          >
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
          <a
            href="#"
            data-replace="Privacy Policy"
            class="link-hover fs-mobile-menu-legal-link font-medium"
            ><span>Privacy Policy</span></a
          >

          <!-- Vertical divider -->
          <span class="w-[1px] h-5 bg-pale-brown" />

          <a
            href="#"
            data-replace="Conditions of Use"
            class="link-hover fs-mobile-menu-legal-link font-medium"
            ><span>Conditions of Use</span></a
          >
        </div>
      </div>
    </div>
  </BaseMobileDropdown>
</template>
