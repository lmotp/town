<template>
  <header>
    <ul class="lists">
      <NuxtLink to="/">메인</NuxtLink>
      <NuxtLink to="/character">캐릭터</NuxtLink>
    </ul>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.lists {
  position: relative;
  display: flex;
  gap: 20px;
  padding: 20px;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: 0 5px 5px rgba(185, 185, 185, 0.25);
    border-bottom: 1px solid rgba(185, 185, 185, 0.5);
  }
}
</style>
