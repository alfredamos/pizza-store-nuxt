<template>
  <ModalAlert @on-close="backToList" :isAddToCart="isAddToCart">
    <PizzaAddToCart
      v-if="isAddToCart"
      @onAddToCart="addToCart($event)"
      @click="$event.stopPropagation()"
    />
  </ModalAlert>
</template>

<script lang="ts" setup>
import type { CartItem } from "~~/models/cartItems/cartItem.model";

const cartItemStore = useCartItemStore();
const { isAddToCart } = storeToRefs(cartItemStore);

const emit = defineEmits(["onAddToCart"]);

const addToCart = (carts: CartItem[]) => {
  emit("onAddToCart", carts);
};

const backToList = () => {
  cartItemStore.changeIsAddToCart(false);
};
</script>
