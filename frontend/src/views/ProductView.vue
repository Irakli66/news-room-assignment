<script setup>
import ProductsAPI from '../services/ProductsAPI';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';

const route = useRoute();
const store = useCounterStore();
const singlePorduct = ref([]);

const amount = ref(store.getProductAmount(route.params.id) || 1);

const getProducts = async (id) => {
  try {
    const response = await ProductsAPI.getProductById(id);
    singlePorduct.value = response.data[0];
  } catch (err) {
    console.log(err);
  }
};

getProducts(route.params.id);
</script>

<template>
  <div class="product-container">
    <div class="product">
      <div class="images">
        <img
          v-for="data in singlePorduct.photos"
          class="img"
          :src="data"
          alt="car"
          :key="data"
        />
      </div>
      <div class="details">
        <div style="display: flex; flex-direction: column; gap: 10px">
          <h2 style="color: #212121; font-size: 24px; font-weight: bold">
            {{ singlePorduct.name }}
          </h2>
          <p style="color: #33b249; font-size: 18px; font-weight: bold">
            Price: {{ singlePorduct.price }}$
          </p>
          <p class="description">
            {{ singlePorduct.description }}
          </p>
        </div>
        <div class="buttons">
          <div class="quantity-btns">
            <button
              class="decrement-btn"
              @click="
                () => {
                  if (amount > 0) amount--;
                }
              "
            >
              -
            </button>
            <input
              type="number"
              class="amount"
              :value="amount"
              min="0"
              @change="(e) => (amount = parseInt(e.target.value))"
            />
            <button class="increment-btn" @click="() => amount++">+</button>
          </div>
          <button
            class="button button-1"
            @click="
              () => {
                store.addProductToCart(
                  singlePorduct._id,
                  amount,
                  singlePorduct.price
                );
                $router.push({ path: `/buynow/${route.params.id}` });
              }
            "
          >
            Buy now
          </button>
          <button
            class="button button-2"
            @click="
              store.addProductToCart(
                singlePorduct._id,
                amount,
                singlePorduct.price
              )
            "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-container {
  padding: 50px 300px;
  @media (max-width: 1624px) {
    padding: 50px 100px;
  }
  @media (max-width: 900px) {
    padding: 50px 50px;
  }
  @media (max-width: 500px) {
    padding: 50px 20px;
  }
}
.product {
  display: flex;
  gap: 50px;
  width: 100%;

  justify-content: center;
  /* align-items: center; */
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 20px;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
}
.images {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 700px) {
    width: 100%;
    overflow-y: scroll;
    max-height: 199px;
  }
}
.img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  object-fit: fill;
  background-repeat: no-repeat;
}
.details {
  max-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 700px) {
    max-width: 100%;
  }
}
.description {
  @media (max-width: 700px) {
    overflow-y: scroll;
    max-height: 150px;
  }
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.quantity-btns {
  display: flex;
  width: 100%;
  gap: 5px;

  align-items: center;
  /* border: solid 1px #212121; */
  border-radius: 5px;
}
.amount {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
.amount:focus {
  outline: none;
}
.decrement-btn,
.increment-btn {
  width: 100%;
  height: 30px;
  border: none;
  background-color: #fff;
  border-radius: 5px;
  font-size: 18px;
}
.decrement-btn:hover,
.increment-btn:hover {
  background-color: #80669d;
  cursor: pointer;
  color: #fff;
}
.button {
  padding: 10px 0px;
  border-radius: 5px;
  font-size: 18px;
}
.button:hover {
  cursor: pointer;
  opacity: 0.8;
}
.button-1 {
  background-color: #80669d;
  border: none;
  color: #fff;
  transition: ease-in-out 0.5s;
}

.button-2 {
  background-color: transparent;
  border: 1px solid #80669d;
  transition: ease-in-out 0.5s;
}
.button-2:hover {
  background-color: #33b249;
  color: #fff;
}
</style>
