<template>
  <div
    class="floating-bulbs-wrapper absolute top-0 left-0 w-full h-full hidden sm_plus:block"
  >
    <span v-for="n in 10" :key="n" class="absolute w-20 h-auto animate-float">
      <img
        src="@/assets/img/floating-bulb.png"
        width="256px"
        height="350.7px"
        alt=" "
      />
    </span>
  </div>
</template>

<style scoped>
.floating-bulbs-wrapper span:nth-child(1) {
  top: 10%;
  left: 2%;
  width: 6rem;
  animation-delay: 1.2s;
}

.floating-bulbs-wrapper span:nth-child(2) {
  top: 35%;
  left: 13%;
  width: 7rem;
  animation-delay: 1.7s;
}

.floating-bulbs-wrapper span:nth-child(3) {
  top: 15%;
  left: 22%;
  animation-delay: 0.8s;
}

.floating-bulbs-wrapper span:nth-child(4) {
  top: 60%;
  left: 6%;
  animation-delay: 2s;
}

.floating-bulbs-wrapper span:nth-child(5) {
  top: 70%;
  left: 24%;
  width: 6rem;
  animation-delay: 1s;
}

.floating-bulbs-wrapper span:nth-child(6) {
  top: 70%;
  right: 2%;
  animation-delay: 1s;
}

.floating-bulbs-wrapper span:nth-child(7) {
  top: 45%;
  right: 13%;
  animation-delay: 2s;
}

.floating-bulbs-wrapper span:nth-child(8) {
  top: 65%;
  right: 22%;
  width: 6rem;
  animation-delay: 0.8s;
}

.floating-bulbs-wrapper span:nth-child(9) {
  top: 15%;
  right: 6%;
  width: 7rem;
  animation-delay: 1.7s;
}

.floating-bulbs-wrapper span:nth-child(10) {
  top: 25%;
  right: 24%;
  width: 6rem;
  animation-delay: 1.2s;
}

/* Floating Animations For Floating Bulb Images */
@keyframes floating {
  50% {
    transform: translateY(1rem);
  }
}

.animate-float {
  animation: floating 6s ease-in-out infinite;
}
</style>
