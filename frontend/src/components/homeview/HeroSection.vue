<template>
  <!-- Hero Section -->
  <section class="text-cosmic-latte md:text-bone bg-black">
    <div
      class="wrapper relative flex flex-col md:flex-row md:items-center pb-24 sm:pb-0"
    >
      <!-- Hero Image -->
      <div class="relative w-full md:max-w-[480px]">
        <span class="absolute top-0 left-0 w-full h-full"></span>
        <span
          class="absolute top-0 w-full h-full z-10 linear-gradient md:hidden"
        ></span>
        <img
          src="@/assets/img/storefront/hero.webp"
          alt="Hero"
          class="w-full h-auto object-cover"
        />
      </div>

      <!-- Hero Text -->
      <div
        class="absolute bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/3 md:relative md:top-auto md:-translate-y-0 w-full py-4 sp-px-hero-text z-20"
      >
        <h1
          class="fs-hero-h1 font-birthstone font-medium text-center leading-none text-shadow"
        >
          Welcome
        </h1>
        <div
          class="fs-hero-body max-w-xl mx-auto sp-mt-hero-about-wrapper text-center"
        >
          <p class="text-shadow">
            At <span class="font-semibold">Lantern Loft</span>, we believe that
            lighting is more than just a necessity - it's a way to transform
            your space, set the mood, and bring warmth into every room.
          </p>
          <p class="sp-mt-hero-about-text text-shadow">
            Our collection of thoughtfully designed lamps combines style,
            functionality, and innovation to help you create the perfect
            atmosphere, whether you're working, relaxing, or entertaining.
          </p>
          <p class="sp-mt-hero-about-text text-shadow">
            From sleek modern desk lamps to statement floor pieces, we offer
            lighting solutions for every corner of your home.
          </p>
          <p class="sp-mt-hero-about-text italic text-crayola">
            Because every home deserves a little glow.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.linear-gradient {
  background: linear-gradient(#02010100 40%, #020101ff);
}
.text-shadow {
  text-shadow: 1px 1px 1px #020101;
}
</style>
