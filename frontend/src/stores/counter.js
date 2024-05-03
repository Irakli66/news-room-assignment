import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// user-ის არსებობის შემთხვევაში უკეთესია კალათის ნივთები ინახებოდეს მონაცემთა ბაზაში, შესაძლებელია ასევე local storage-ში შენახვაც,
// რადგან საიტის დარეფრეშების შემთხვევაშიც ინახებოდეს კალათის მონაცემები.

export const useCounterStore = defineStore({
  id: 'newsRoom',
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addProductToCart(id, amount, price) {
      const index = this.cartItems.findIndex((item) => item.productId === id);
      if (index >= 0) {
        this.cartItems[index] = {
          productId: id,
          amount: amount,
          totalPrice: amount * price,
        };
      } else {
        this.cartItems.push({
          productId: id,
          amount: amount,
          totalPrice: amount * price,
        });
      }
      this.removeCartItems();
    },
    removeCartItems() {
      this.cartItems = this.cartItems.filter((item) => item.amount > 0);
    },
    removeCartItemById(id) {
      this.cartItems = this.cartItems.filter((item) => item.productId != id);
    },
    getCartTotalPrice() {
      return this.cartItems.reduce(
        (accumulator, currentItem) => accumulator + currentItem.totalPrice,
        0
      );
    },
    getProductAmount(id) {
      return this.cartItems.find((item) => item.productId === id)?.amount;
    },
  },
});
