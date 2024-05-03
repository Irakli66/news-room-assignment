<script setup>
import ProductsAPI from '../services/ProductsAPI';
import { useCounterStore } from '@/stores/counter';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const store = useCounterStore();

const cartData = ref([]);
const getProducts = async () => {
  try {
    const response = await ProductsAPI.getProductsByIds(store?.cartItems);
    cartData.value = response?.data;
  } catch (err) {
    console.log(err);
  }
};

const handleProductRemove = (id) => {
  cartData.value = cartData.value.filter((item) => item._id != id);
};
getProducts();
</script>

<template>
  <div class="cart-cont">
    <div class="product-cont" v-for="data in cartData" :key="data._id">
      <div class="images-cont">
        <img :src="data.photos[0]" alt="car" :key="data" />
      </div>
      <div class="detail">
        <h2 class="title">{{ data.name }}</h2>
        <p class="description">{{ data.description }}</p>
        <!-- <input :value="store.getProductAmount(data._id)" type="number" /> -->

        <div style="display: flex; align-items: center; gap: 20px">
          <label>Quantity:</label>
          <div class="quantity-btns">
            <button
              class="decrement-btn"
              @click="
                () => {
                  if (store.getProductAmount(data._id) > 1) {
                    store.addProductToCart(
                      data._id,
                      store.getProductAmount(data._id) - 1,
                      data.price * (store.getProductAmount(data._id) - 1)
                    );
                  } else
                    store.removeCartItemById(data._id),
                      handleProductRemove(data._id);
                }
              "
            >
              -
            </button>
            <!-- <input
              type="number"
              class="amount"
              :value="store.getProductAmount(data._id)"
              min="0"
            /> -->
            <p class="s">{{ store.getProductAmount(data._id) }}</p>
            <button
              class="increment-btn"
              @click="
                () =>
                  store.addProductToCart(
                    data._id,
                    store.getProductAmount(data._id) + 1,
                    data.price * (store.getProductAmount(data._id) + 1)
                  )
              "
            >
              +
            </button>
          </div>
        </div>
        <p class="price">
          Total Price: {{ data.price * store.getProductAmount(data._id) }}$
        </p>
      </div>
      <div class="remove-cont">
        <button
          class="remove-btn"
          @click="
            store.removeCartItemById(data._id), handleProductRemove(data._id)
          "
        >
          <Icon icon="ph:trash-bold" color="red" />
        </button>
      </div>
    </div>
    <div class="checkout" v-if="cartData.length > 0">
      <p class="total">Grand Total: {{ store.getCartTotalPrice() }}$</p>
      <button
        class="checkout-btn"
        @click="
          () => {
            $router.push({
              path: '/checkout',
              query: {
                page: page,
              },
            });
          }
        "
      >
        Checkout
      </button>
    </div>
    <div
      v-else
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80vh;
      "
    >
      <h1>Your cart is empty...</h1>
      <RouterLink
        style="
          color: green;
          text-decoration: underline;
          font-size: 24px;
          text-transform: uppercase;
        "
        to="/?page=1"
        >Shop Here</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.cart-cont {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 250px;
  @media (max-width: 1624px) {
    padding: 50px 50px;
  }
  @media (max-width: 900px) {
    padding: 50px 25px;
  }
  @media (max-width: 500px) {
    padding: 50px 10px;
  }
}
.product-cont {
  width: 100%;
  padding: 20px;
  display: flex;
  gap: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
}
.images-cont {
  display: flex;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: fill;
    background-repeat: no-repeat;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 1150px) {
    img {
      width: 100%;
    }
  }
}
.detail {
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 1150px) {
    width: 80%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
}
.title {
  font-size: 24px;
  color: #0f4c75;
}
.description {
  font-size: 16px;
  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    overflow-x: scroll;
    height: 150px;
  }
}
.amount {
  width: 20%;
  border: solid 1px #bbe1fa;
  border-radius: 5px;
}
.amount:focus {
  outline: none;
}
.price {
  color: #1b262c;
}
.remove-cont {
  @media (max-width: 800px) {
    width: 100%;
  }
}
.remove-btn {
  display: flex;
  border: none;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  padding: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    width: 100%;
    display: flex;

    height: 30px;
  }
}
.quantity-btns {
  display: flex;
  gap: 5px;
  align-items: center;
}
.decrement-btn,
.increment-btn {
  /* width: 100%; */
  /* height: 30px;   */
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
.remove-btn:hover {
  cursor: pointer;
}
.checkout {
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.total {
  margin-left: auto;
}
.checkout-btn {
  border: solid 1px #1b262c;
  padding: 10px;
  background-color: #fff;
  transition: ease-in-out 0.5s;
  border-radius: 10px;
  color: #1b262c;
  font-size: 18px;
  letter-spacing: 2px;
  width: 20%;
  margin-left: auto;
  @media (max-width: 800px) {
    width: 100%;
  }
}
.checkout-btn:hover {
  cursor: pointer;
  background-color: #33b249;
  border: solid 1px #33b249;
  color: #fff;
}
</style>
