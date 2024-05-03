<script setup>
import ProductsAPI from '../services/ProductsAPI';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';

const route = useRoute();
const store = useCounterStore();
const singlePorduct = ref([]);

const amount = ref(store.getProductAmount(route.params.id) || 1);

const getProducts = async (id) => {
  try {
    const response = await ProductsAPI.getProductById(id);
    singlePorduct.value = response.data;
  } catch (err) {
    console.log(err);
  }
};

getProducts(route.params.id);
</script>

<template>
  <div class="checkout-cont">
    <div class="checkout">
      <div>
        <div class="product-cont" v-for="data in singlePorduct" :key="data._id">
          <div class="images-cont">
            <img :src="data.photos[0]" alt="car" :key="data" />
          </div>
          <div class="detail">
            <h2 class="title">{{ data.name }}</h2>
            <div style="display: flex; align-items: center; gap: 20px">
              <p>Quantity: {{ amount }}</p>
            </div>
            <p class="price">
              Total Price:
              {{ data.price * amount }}$
            </p>
          </div>
        </div>
      </div>
      <hr
        style="border: 1px dashed #0f4c75; margin: 15px 0px"
        v-if="singlePorduct.length > 0"
      />
      <div class="purchase" v-if="singlePorduct.length > 0">
        <div style="display: flex; flex-direction: column; gap: 20px">
          <div>
            <h2>Shipping Address</h2>
            <p>6881 Dietrich Cliff, East Elaina, WA 06793</p>
          </div>
          <div>
            <h2>Payment method</h2>
            <select>
              <option>Visa</option>
              <option>Mastercard</option>
              <option>American express</option>
            </select>
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 20px;
          "
        >
          <!-- <p class="total">
            Grand Total: {{ data.price * store.getProductAmount(data._id) }}
          </p> -->
          <button class="pay">Pay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-cont {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  /* box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19); */
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
.checkout {
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  display: flex;
  flex-direction: row;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column !important;
    width: 100%;
  }
}
.detail {
  width: 100%;
}
.product-cont {
  width: 100%;
  padding: 10px 20px;
  height: 100%;
  display: flex;
  gap: 50px;
  border-radius: 10px;
  /* box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19); */
  @media (max-width: 800px) {
    gap: 10px;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
}
.images-cont {
  display: flex;
  width: 300px;
  height: 100%;
  img {
    width: 250px;
    height: 100%;
    border-radius: 10px;
    object-fit: fill;
    background-repeat: no-repeat;
  }
  @media (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 1150px) {
    img {
      width: 100%;
    }
  }
}
.purchase {
  width: 30%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  /* margin-top: auto; */
  justify-content: space-between;
  @media (max-width: 800px) {
    width: 100%;
  }
}
.pay {
  width: 100%;
  border: solid 1px #1b262c;
  padding: 5px;
  background-color: #fff;
  transition: ease-in-out 0.5s;
  border-radius: 10px;
  color: #1b262c;
  font-size: 18px;
  letter-spacing: 2px;
}
.pay:hover {
  cursor: pointer;
  background-color: #33b249;
  border: solid 1px #33b249;
  color: #fff;
}
</style>
