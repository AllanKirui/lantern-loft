<script setup lang="ts">
import Logo from "@/components/common/Logo.vue"
import FooterLinks from "@/components/footer/storefront/FooterLinks.vue"

const footerLinks = [
  {
    title: "Customer Services",
    links: [
      {
        href: "#",
        text: "Contact Us"
      },
      {
        href: "#",
        text: "Shipping"
      },
      {
        href: "#",
        text: "Pricing Policy"
      },
      {
        href: "#",
        text: "Feedback"
      },
      {
        href: "#",
        text: "FAQs"
      }
    ]
  },
  {
    title: "Legal",
    links: [
      {
        href: "#",
        text: "Privacy Policy"
      },
      {
        href: "#",
        text: "Conditions of Use"
      }
    ]
  }
]
</script>

<template>
  <footer
    role="contentinfo"
    aria-label="Footer"
    class="sp-mt-footer bg-black text-crayola"
  >
    <div class="wrapper sp-pt-footer sp-px-footer pb-10">
      <!-- Footer Top -->
      <div>
        <h2 class="fs-h2 font-bold text-center">
          Designed by us. <br class="md:hidden" />
          Built for you.
        </h2>
        <div class="sp-mt-footer-about-wrapper max-w-3xl mx-auto text-center">
          <p class="fs-footer-about">
            At the heart of our craft is a simple promise: to design with care
            and build with purpose.
          </p>
          <p class="sp-mt-footer-about fs-footer-about">
            Each lamp we create is a blend of artistry and functionality,
            thoughtfully crafted to bring warmth and character to your home.
            Whether it's a statement floor lamp or an elegant desk lamp, our
            designs are inspired by the belief that lighting should do more than
            illuminate - it should transform spaces and reflect your unique
            style.
          </p>
          <p class="sp-mt-footer-about fs-footer-about">
            We're here to help you to turn your house into a home, one
            beautifully crafted piece at a time.
          </p>
        </div>
      </div>

      <!-- Horizontal divider -->
      <span
        class="sp-mt-footer-divider block md:hidden w-full h-[1px] bg-eerie-black"
      />

      <!-- Footer Bottom -->
      <div class="sp-mt-footer-bottom">
        <div class="md:flex items-start justify-between">
          <!-- Footer Links -->
          <!-- Only show these links for screens between 480px and 768px  -->
          <div class="hidden sm:flex gap-14 w-fit mx-auto md:hidden">
            <div v-for="linkGroup in footerLinks" :key="linkGroup.title">
              <FooterLinks :group="linkGroup" />
            </div>
          </div>

          <!-- Only show these links for screens below 480px and those above 768px  -->
          <div
            v-for="(linkGroup, index) in footerLinks"
            :key="linkGroup.title"
            :class="[
              index > 0 ? 'sp-mt-footer-legal' : '',
              'sm:hidden md:block md:mt-0'
            ]"
          >
            <FooterLinks :group="linkGroup" />
          </div>

          <!-- Global Ratings -->
          <div class="mt-8 md:mt-0 flex flex-col items-center">
            <p class="fs-footer-reviews">
              Check out our
              <a
                href="/reviews"
                data-replace="1,234"
                class="link-hover font-semibold text-bone"
                ><span>1,234</span></a
              >
              reviews
            </p>

            <!-- Stars -->
            <div class="mt-3 flex gap-1">
              <span
                v-for="(_, index) in Array.from({ length: 5 }, (_, i) => i)"
                :key="index"
                class="relative flex items-center justify-center w-8 h-8 bg-pastel-yellow"
              >
                <BaseIcon name="full-star" class="w-6 h-6 text-black z-10" />
                <span
                  v-if="index === 4"
                  class="absolute top-0 right-0 w-1/2 h-full bg-cosmic-latte"
                ></span>
              </span>
            </div>

            <p class="sp-mt-footer-sign-in fs-footer-sign-in">
              Already a customer?
              <a
                href="/account/sign-in"
                data-replace="Sign in"
                class="link-hover text-bone"
                ><span>Sign in</span></a
              >
            </p>
          </div>

          <!-- Horizontal divider -->
          <span
            class="sp-mt-footer-divider block md:hidden w-full h-[1px] bg-eerie-black"
          />

          <!-- Logo -->
          <!-- Only show this logo for screens above 976px -->
          <div class="hidden lg:flex flex-col items-center">
            <div class="storefront-footer-logo-wrapper">
              <Logo href="/" />
            </div>
            <p class="storefront-footer-logo-slogan">
              Every Home Deserves a Little Glow
            </p>
          </div>

          <!-- Only show this logo for screens below 768px -->
          <div class="flex flex-col items-center md:hidden">
            <div class="storefront-footer-logo-wrapper">
              <Logo href="/" />
            </div>
            <p class="storefront-footer-logo-slogan">
              Every Home Deserves a Little Glow
            </p>
          </div>
        </div>

        <!-- Only show this logo for screens between 768px and 976px -->
        <div class="hidden md:flex flex-col items-center md:mt-8 lg:hidden">
          <div class="storefront-footer-logo-wrapper">
            <Logo href="/" />
          </div>
          <p class="storefront-footer-logo-slogan">
            Every Home Deserves a Little Glow
          </p>
        </div>

        <p class="sp-mt-footer-copy fs-footer-copy text-center">
          © 2026, Lantern Loft. All Rights Reserved.
        </p>

        <!-- TODO add attribution -->
      </div>
    </div>
  </footer>
</template>
