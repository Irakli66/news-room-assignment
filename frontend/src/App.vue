<script setup></script>

<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
