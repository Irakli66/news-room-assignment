import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '@/views/ProductView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products?page=1',
    },
    {
      path: '/products',
      name: 'products',
      component: HomeView,
      query: {
        page: '1',
      },
    },
    { path: '/products/:id', component: ProductView },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue'),
    },
    {
      path: '/buynow/:id',
      name: 'buynow',
      component: () => import('../views/BuyNow.vue'),
    },
  ],
});

export default router;
