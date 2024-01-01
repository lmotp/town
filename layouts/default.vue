<template>
  <TheHeader />
  <main role="'main'">
    <slot />
  </main>
</template>

<script setup>
import TheHeader from "./TheHeader.vue";
</script>

<style lang="scss" scoped>
main {
}
</style>
