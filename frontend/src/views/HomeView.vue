<script setup>
import ProductsAPI from '../services/ProductsAPI';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const route = useRoute();

const products = ref();

const page = ref(parseInt(route.query.page));

const handlePagePrev = () => {
  if (page.value > 1) {
    page.value--;
    getProducts();
  }
};
const handlePageNext = () => {
  if (page.value < products.value.totalPage) {
    page.value++;
  }
  getProducts();
};

const getProducts = async () => {
  try {
    const response = await ProductsAPI.getProducts(page.value);
    products.value = response?.data;
  } catch (err) {
    console.log(err);
  }
};

getProducts();
// console.log(route);
</script>

<template>
  <div>
    <div class="grid-container">
      <div
        class="product-container"
        v-for="data in products?.data"
        :key="data._id"
        @click="() => $router.push({ path: `/products/${data._id}` })"
      >
        <img class="img" v-bind:src="data?.photos[0]" alt="car" />
        <h2>{{ data.name }}</h2>
        <p style="color: #33b249; font-size: 16px">Price: {{ data.price }}$</p>
      </div>
    </div>
    <div class="pagination">
      <button
        class="prev-btn btn"
        @click="
          () => {
            handlePagePrev();
            $router.push({
              path: '/products',
              query: {
                page: page,
              },
            });
          }
        "
      >
        <Icon icon="ph:arrow-left" />
      </button>
      <button
        class="next-btn btn"
        @click="
          () => {
            handlePageNext();
            $router.push({
              path: '/products',
              query: {
                page: page,
              },
            });
          }
        "
      >
        <Icon icon="ph:arrow-right" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  /* min-height: 100vh; */
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  /* flex-direction: column; */
  /* gap: 20px; */
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 20px;
  row-gap: 20px;
  padding: 50px 300px 30px 300px;

  @media (max-width: 1424px) {
    padding: 50px 100px 30px 100px;
  }
  @media (max-width: 1024px) {
    padding: 50px 50px 30px 50px;
  }
  @media (max-width: 884px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 650px) {
    grid-template-columns: auto;
    padding: 50px 10px 30px 10px;
  }
}
.product-container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  @media (max-width: 650px) {
    max-width: 100%;
  }
}
.product-container:hover {
  transform: scale(1.02);
}
.img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  object-fit: fill;
  background-repeat: no-repeat;
}
.pagination {
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}
.btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(195, 193, 193, 0.794),
    0 6px 10px 0 rgba(195, 193, 193, 0.794);
  border: none;
  border-radius: 5px;
  padding: 10px;
  transition: ease-in-out 0.5s;
}
.btn:hover {
  cursor: pointer;
  background-color: #bbe1fa;
}
</style>
