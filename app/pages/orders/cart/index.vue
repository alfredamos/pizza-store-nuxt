<template>
  <div
    v-if="!carts.length"
    class="bg-white p-12 shadow-xl rounded-lg max-w-lg flex justify-center items-center font-bold mx-auto mt-80"
    @click="$event.stopPropagation()"
  >
    <p class="flex flex-col gap-10">
      <span class="text-4xl">No order to display</span>
      <span class="flex justify-end items-center">
        <a routerLink="/pizzas" class="text-indigo-500">
          <span class="flex gap-2 justify-center items-center">
            <FaArrowLeft size="20px" />
            <span class="text-2xl">Home</span>
          </span>
        </a>
      </span>
    </p>
  </div>
  <div
    v-else
    class="bg-white p-12 overflow-y-auto scrollbar max-w-2xl max-h-80 text-black rounded-xl shadow-2xl mx-auto mt-20"
  >
    <h2 class="font-semibold border-b-2 text-3xl">
      <span>Order Details</span>
    </h2>
    <template v-for="cart in carts" :key="cart.id">
      <p class="flex justify-between items-center py-2 mt-2">
        <span class="font-light">Product</span>
        <span class="font-semibold text-end">{{ cart.name }}</span>
        <button
          type="button"
          class="border border-none text-end"
          @click="increaseQuantity(cart)"
        >
          <FaPlus size="20px" class="text-indigo-700 font-extrabold" />
        </button>
      </p>
      <p class="flex justify-between items-center py-2 mt-2">
        <span class="font-light">Price </span>
        <span class="font-semibold text-end">${{ cart.price }}</span>
        <button
          type="button"
          class="border border-none text-end"
          @click="decreaseQuantity(cart)"
        >
          <FaMinus size="20px" class="text-amber-700 font-extrabold" />
        </button>
      </p>
      <p class="flex justify-between items-center py-2 mt-2 mb-2">
        <span class="font-light">Quantity </span>
        <span class="font-semibold text-end">{{ cart.quantity }}</span>
        <button
          type="button"
          class="border border-none text-end"
          @click="removePizza(cart.id)"
        >
          <FaTrash size="20px" class="cursor-pointer text-rose-700" />
        </button>
      </p>

      <p class="flex justify-between items-center py-2 border-t-2 border-b-2">
        <span class="font-semibold">Sub Total</span>
        <span class="font-semibold text-wrap">{{ subTotal(cart) }}</span>
      </p>
    </template>

    <p class="flex justify-between items-center py-2 border-b-2 mt-8">
      <span class="font-semibold">Total</span>
      <span class="font-semibold text-wrap">{{ total() }}</span>
    </p>
    <div class="flex gap-2 justify-center items-center w-full mt-8">
      <button
        type="button"
        class="border-indigo-900 border-2 bg-white text-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
        @click="makeCheckout"
      >
        Checkout
      </button>
      <button
        type="button"
        @click="backToPizzas"
        class="border-rose-900 border-2 bg-white text-rose-900 hover:bg-rose-900 hover:text-rose-100 rounded-lg px-2 py-4 font-semibold w-1/2 flex justify-center items-center"
      >
        Back To Pizza
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from "vue3-icons/fa";
import type { CartItem } from "~~/models/cartItems/cartItem.model";

definePageMeta({
  middleware: ["authenticated"]
})

const cartUtilStore = useCartUtilStore();

const cartItemStore = useCartItemStore();
const { cartItems: carts } = storeToRefs(cartItemStore);

const router = useRouter();

const increaseQuantity = (cart: CartItem) => {
  console.log("Increase quantity of cart-id : ", cart.id);
  //----> Increase the quantity of the cart-item.
  cartUtilStore.quantityIncrease(cart);
 
};

const decreaseQuantity = (cart: CartItem) => {
  console.log("Decrease quantity of cart-id : ", cart.id);
  //----> Decrease the quantity of the cart-item.
  cartUtilStore.quantityDecrease(cart);
  
};

const removePizza = (cartId: string) => {
  console.log("Increase quantity of cart-id : ", cartId);
  //----> Remove cart-item.
  cartUtilStore.removeCartItem(cartId, carts.value);
  
}
const makeCheckout = () => {
  router.push("/orders/checkout");
};

const backToPizzas = () => {
  router.push("/");
};

const subTotal = (cart: CartItem) => {
  return cartItemStore.subTotal(cart);
};

const total = () => {
  return cartItemStore.totalPrice;
};

</script>
