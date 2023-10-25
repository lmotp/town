<template>
  <div class="character">
    <div class="character__sun">
      <MainImageFrame img-src="/images/sun-neutral.jpg" />
    </div>
    <div class="character__traveler">
      <MainImageFrame img-src="/images/traveler.jpg" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.character {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: transparent;

  pointer-events: none;

  &__sun {
    position: absolute;
    top: -96px;
    right: -106px;
  }

  &__traveler {
    position: absolute;
    bottom: -72px;
    left: -96px;
  }
}
</style>
