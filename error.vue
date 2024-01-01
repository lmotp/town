<template>
  <div class="error">
    <h1 class="error__text">IT'S ERROR PAGE</h1>
    <NuxtLink to="/" class="error__link"> GO TO MAIN </NuxtLink>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100vh;

  &__text {
    margin: 0;
    font-size: 4rem;
    font-weight: bold;
  }

  &__link {
    transition: color 500ms ease-in-out;

    &:hover {
      color: #0068ff;
    }
  }
}
</style>
