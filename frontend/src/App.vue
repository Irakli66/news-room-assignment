<script setup>
import { Icon } from '@iconify/vue';
import { useCounterStore } from './stores/counter';

const store = useCounterStore();
</script>

<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/?page=1" class="home"
        ><Icon icon="ic:outline-other-houses" width="20" color="#BBE1FA" />
        Home</RouterLink
      >
      <RouterLink to="/cart" class="cart"
        >Cart
        <Icon
          icon="ic:sharp-shopping-cart"
          width="20"
          color="#BBE1FA"
          class="cart-icon"
        />
        <p class="cartItemCount" v-if="store.cartItems.length > 0">
          {{ store.cartItems.length }}
        </p>
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  height: 100%;
}
.nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1b262c;
  height: 50px;
  gap: 200px;
  text-transform: uppercase;
}
.home,
.cart {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 10px;
  border-radius: 5px;
}

.home:hover {
  background-color: #0f4c75;
}
.cart:hover {
  background-color: #0f4c75;
}

.cart-icon {
  z-index: 2222;
}
.cartItemCount {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #bbe1fa;
  color: #212121;
  border-radius: 50%;
  padding: 10px;
  right: -1px;
  top: -5px;
  font-weight: bold;
  z-index: 1;
}
</style>
