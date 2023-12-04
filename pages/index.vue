<template>
  <ul class="lists">
    <NuxtLink to="/">메인</NuxtLink>
    <NuxtLink to="/box">박스</NuxtLink>
    <NuxtLink to="/character">캐릭터</NuxtLink>
  </ul>
</template>

<script setup></script>

<style lang="scss" scoped>
.lists {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
</style>
