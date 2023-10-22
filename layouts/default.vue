<template>
  <TheHeader />
  <main role="'main'">
    <slot />
  </main>
  <TheFooter />
</template>

<script setup>
import TheFooter from "./TheFooter.vue";
import TheHeader from "./TheHeader.vue";
</script>

<style lang="scss" scoped>
:deep(main) {
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
  overflow-x: hidden;
}
</style>
