<template>
  <TheExperience />
  <main role="'main'">
    <slot />
  </main>
</template>

<script setup>
import TheExperience from "./TheExperience.vue";
</script>

<style lang="scss" scoped>
main {
}
</style>
