<template>
  <div class="image__wrapper">
    <svg width="100%" height="100%" viewBox="0 0 374 352" fill="none" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="shape">
        <path
          fill="#0E0E0E"
          d="M197.346 35.1329L332.961 131.491C339.34 136.023 342.008 144.176 339.545 151.589L287.921 306.97C285.502 314.248 278.682 319.167 270.99 319.167H103.009C95.3177 319.167 88.4968 314.248 86.0785 306.97L34.454 151.589C31.9909 144.176 34.6592 136.023 41.0385 131.491L176.654 35.1329C182.846 30.733 191.153 30.733 197.346 35.1329Z"
        />
      </clipPath>
      <path
        d="M197.346 35.1329L332.961 131.491C339.34 136.023 342.008 144.176 339.545 151.589L287.921 306.97C285.502 314.248 278.682 319.167 270.99 319.167H103.009C95.3177 319.167 88.4968 314.248 86.0785 306.97L34.454 151.589C31.9909 144.176 34.6592 136.023 41.0385 131.491L176.654 35.1329C182.846 30.733 191.153 30.733 197.346 35.1329Z"
        stroke="#0E0E0E"
        stroke-width="6"
        fill="#0E0E0E"
      />
      <image width="100%" height="100%" clip-path="url(#shape)" href="~/assets/images/sun-neutral.jpg" />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({ imgSrc: { type: String, default: "" } });
</script>

<style lang="scss" scoped>
.image__wrapper {
  width: 375px;

  path {
    transform-origin: center center;
    rotate: 10deg;
    animation: 1s ease-in-out 0s infinite alternate none running rotate-sun;
  }
}

@keyframes rotate-sun {
  0% {
    rotate: 10deg;
  }
  100% {
    rotate: -10deg;
  }
}
</style>
