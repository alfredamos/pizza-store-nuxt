<template>
  <main
    class="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500"
  >
    <div class="mb-10">
      <h1 class="text-4xl font-extrabold mb-2">Thank you!</h1>
      <h2 class="text-2xl">Payment made successful!</h2>
      <div
        class="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold curs"
      >
        Total amount : ${{ totalPrice }} and total quantity :
        {{ totalQuantity }}
      </div>
      <button
        @click="backToPizzas"
        class="text-indigo-100 mt-6 font-bold float-end"
      >
        Back To Pizzas
      </button>
    </div>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["authenticated"]
})

const cartItemStore = useCartItemStore();
const router = useRouter();

const { cartItems: carts } = storeToRefs(cartItemStore);

const totalPrice = computed(() => cartItemStore.totalPrice);
const totalQuantity = computed(() => cartItemStore.totalQuantity);


const backToPizzas = () => {
  cartItemStore.removeLocalStorageCartItems();
  cartItemStore.editAllCatItems([]);
  router.push("/");
};
</script>
