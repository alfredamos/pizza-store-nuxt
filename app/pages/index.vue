<template>
  <div
    class="grid grid-cols-1 gap-2 m-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <div
      class="card card-compact bg-base-100 w-full shadow-xl text-stone-700 m-2"
      v-for="pizza in pizzas"
    >
      <figure>
        <img
          :src="pizza.image"
          alt="pizza.name"
          height="80"
          width="80"
          class="object-cover w-full h-48"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          <NuxtLink :to="`/pizzas/{{ pizza.id }}/detail`">{{
            pizza.name
          }}</NuxtLink>
        </h2>
        <p>${{ pizza.price }}</p>
        <p>{{ pizza.description }}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="addToCart(pizza)">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>

  <PizzaAddItem v-if="isAddToCart" @onAddToCart="toCart($event)" />
</template>

<script lang="ts" setup>
import { pizzaBaseUrl } from '~~/constants/pizzaBaseUrl';
import type { CartItem } from '~~/models/cartItems/cartItem.model';
import type { Pizza } from '~~/models/pizzas/pizza.model';

const url = `${pizzaBaseUrl}`;

const cartItemStore = useCartItemStore();
const { cartItems, isAddToCart } = storeToRefs(cartItemStore);

const cartUtilStore = useCartUtilStore()

const pizzaStore = usePizzaStore();
const { pizzas } = storeToRefs(pizzaStore);

const {getResource} = useGetResource<Pizza[]>(url, 'get');

const router = useRouter();

onMounted(() => {
  loadPizza();
});

const loadPizza = async () => {
  const { data: pizzas } = await getResource();
  pizzaStore.editAllPizzas(pizzas);
};

const addToCart = (pizza: Pizza) => {
  console.log("Add to cart");
  cartItemStore.changeIsAddToCart(true);

  cartUtilStore.makeCartItems(pizza, cartItems.value);
};

const backToList = () => {
  cartItemStore.changeIsAddToCart(false);
};

const toCart = (carts: CartItem[]) => {
  console.log("The cart-items to cart : ", { carts });

  const newCartItems = carts?.filter((cart) => cart?.quantity !== 0);

  cartItemStore.editAllCatItems(newCartItems);
  cartItemStore.setLocalStorageCartItems(newCartItems);

  cartItemStore.changeIsAddToCart(false);

  router.push("/orders/cart");
};
</script>

<style lang="scss" scoped></style>


