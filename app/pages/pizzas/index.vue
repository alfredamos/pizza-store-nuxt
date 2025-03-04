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
      <span class="flex justify-end mr-1 text-rose-900 font-bold hover:text-indigo-900"><NuxtLink :to="`/pizzas/detail/${pizza?.id}`" @click="detailPizza(pizza)">Detail</NuxtLink></span>
      <div class="card-body">
        <h2 class="card-title">
          <NuxtLink :to="`/pizzas/{{ pizza.id }}/detail`">{{
            pizza.name
          }}</NuxtLink>
        </h2>
        <p>${{ pizza.price }}</p>
         <p>
        <span class="text-muted mr-4">{{isShowMore ? pizza.description : pizza.description.substring(0,40) }}</span>
        <button class="bg-zinc-200 text-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center hover:bg-indigo-900 hover:text-zinc-200 font-semibold" @click="showMoreText(pizza.id)" type="button">{{isShowMore ? "Less" : "More"}}</button>
         </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary hover:text-indigo-900 hover:bg-zinc-200" @click="addToCart(pizza)">
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

//----> State.
const isShowMore = ref(false);

//----> Meta.
definePageMeta({
  middleware: ["authenticated", "admin"]
})

const url = `${pizzaBaseUrl}`;

//----> Stores
const cartItemStore = useCartItemStore();
const { cartItems, isAddToCart } = storeToRefs(cartItemStore);

const cartUtilStore = useCartUtilStore()

const pizzaStore = usePizzaStore();

//----> Fetch pizzas
const {data: pizzas} = await useFetch<Pizza[]>(url);

const router = useRouter();

//----> Life cycle
onMounted(() => {
  loadPizza();
});

//----> Actions
const loadPizza = async () => {
  pizzaStore.editAllPizzas(pizzas.value!);
};

const addToCart = (pizza: Pizza) => {
  console.log("Add to cart");
  cartItemStore.changeIsAddToCart(true);

  cartUtilStore.makeCartItems(pizza, cartItems.value);
};

/* const backToList = () => {
  console.log("You must close now!!!");
  cartItemStore.changeIsAddToCart(false);
}; */

const detailPizza = (pizza: Pizza) => {

}

const showMoreText = (pizzaId: string) => {
  console.log("pizza-id : ", pizzaId);
  pizzas.value?.forEach(pizza =>  {
    if(pizza.id === pizzaId){
      console.log("loop-id : ", pizza.id , " , ", "given-id : ", pizzaId)
      isShowMore.value = !isShowMore.value;
    }
  })
}

const toCart = (carts: CartItem[]) => {
  console.log("The cart-items to cart : ", { carts });

  const newCartItems = carts?.filter((cart) => cart?.quantity !== 0);

  cartItemStore.editAllCatItems(newCartItems);
  cartItemStore.setLocalStorageCartItems(newCartItems);

  console.log({ carts });

  cartItemStore.changeIsAddToCart(false);

  router.push("/orders/cart");
};
</script>

<style lang="scss" scoped></style>
