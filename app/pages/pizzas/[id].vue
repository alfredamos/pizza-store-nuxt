<template>
  <div class="flex p-2 min-h-screen text-zinc-300">
  <div class="flex-1 min-h-screen m-4 rounded-3xl">
    <div
    class="card card-compact bg-base-100 w-full shadow-xl text-stone-700 m-2"
  >
    <figure>
      <img
        :src="pizza.image"
        :alt="pizza.name"
        height="500"
        width="500"
        class="object-fit w-full min-h-screen"
      />
    </figure>
  </div>
  </div>
<div class="flex-1 my-4 mx-8">
  <div class="flex flex-col">
    <h1 class="text-5xl">{{pizza.name}}</h1>
    <p class="text-xl mt-12">{{pizza.description}}</p>
    <p class="text-xl font-bold mt-12">${{pizza.price }}</p>
    <p class="flex justify-between items-center mt-6 font-bold">
      <NuxtLink to="/" class="bg-zinc-400 border border-rose-900 hover:bg-rose-900 hover:text-zinc-200 text-rose-900 px-6 py-2 rounded-lg text-xl">Back</NuxtLink>
      <button class="bg-zinc-400 border border-indigo-900 hover:bg-indigo-900 hover:text-zinc-200 text-indigo-900 px-6 py-2 rounded-lg text-xl" @click="addToCart(pizza)">Buy</button>
    </p>
  </div>
</div>
</div>
<PizzaAddItem v-if="isAddToCart" @onAddToCart="toCart($event)" />
</template>

<script lang="ts" setup>
//import AddPizzaItem from "@/components/pizza/AddItem.vue"
import type { CartItem, Pizza } from '@prisma/client';
import { pizzaBaseUrl } from '../../../constants/pizzaBaseUrl';

//----> constants.
const url = pizzaBaseUrl

//----> Stores and composables.
  const cartUtil = useCartUtilStore();
  const pizzaStore = usePizzaStore();
  const route = useRoute()
  const router = useRouter()

  //----> Computed values
  const {pizza} = storeToRefs(pizzaStore);
  const cartItemStore = useCartItemStore();
  const { cartItems, isAddToCart } = storeToRefs(cartItemStore);

  
  //----> Life cycle
  onMounted(async () => {
    await loadPizza()
  })

  //----> Actions
  const pizzaId = route.params?.id as string;
  const {getResource} = useGetResource<Pizza>(`${url}/${pizzaId}`, 'GET')

  const loadPizza = async () => {
    
    console.log("pizzaId : ", pizzaId);
    const {data: detailedPizza} = await getResource();
    pizzaStore.updatePizza(detailedPizza);
  }

  const addToCart = (pizza: Pizza) => {
      console.log('Add to cart');
      cartItemStore.changeIsAddToCart(true);
      //this.cartUtilService.
      cartUtil.makeCartItems(pizza, cartItems.value)
    }

    const backToList = () => {
      console.log('You must close now!!!');
      cartItemStore.changeIsAddToCart(false);
    }

    const toCart = (carts: CartItem[]) => {
  console.log("The cart-items to cart : ", { carts });

  const newCartItems = carts?.filter((cart) => cart?.quantity !== 0) as CartItem[];

  cartItemStore.editAllCatItems(newCartItems);
  cartItemStore.setLocalStorageCartItems(newCartItems);

  console.log({ carts });

  cartItemStore.changeIsAddToCart(false);

  router.push("/orders/cart");
};
</script>
