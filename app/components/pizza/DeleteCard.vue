<template>
  <div class="bg-white p-12 max-width-2xl text-black rounded-2xl shadow-2xl">
  <h2 class="font-semibold border-b-2 text-3xl">
    <span>User Delete Confirmation!</span>
  </h2>
  <p class="flex justify-between items-center py-2 mt-2">
    <span class="font-light">Name</span>
    <span class="font-semibold">{{ props?.pizza?.name }}</span>
  </p>
  <p class="flex justify-between items-center py-2">
    <span class="font-light">Price </span>
    <span class="font-semibold">${{ props?.pizza?.price }}</span>
  </p>
  <p class="flex justify-between items-center py-2">
    <span class="font-light">Quantity </span>
    <span class="font-semibold">{{ props?.pizza?.quantity }}</span>
  </p>
  <p class="flex justify-between items-center py-2">
    <span class="block mr-6 text-wrap font-light">Toppings </span>
    <span class="font-semibold w-full text-end">{{ props?.pizza?.topping }}</span>
  </p>
  <p class="flex justify-between items-center py-2">
    <span class="font-light">Description</span>
    <span class="font-semibold text-wrap">{{ props?.pizza?.description }}</span>
  </p>
  <h4 class="mb-4 mt-4 border-b-2 border-t-2 font-semibold py-4 text-xl">
    <span> Do you really want to delete this user? </span>
  </h4>
  <div class="flex justify-between items-center w-full mt-2">
    <button
      type="button"
      class="bg-violet-500 hover:bg-violet-700 text-slate-100 w-full rounded-lg mr-2 font-medium uppercase py-4"
      @click="backToList"
    >
      Cancel
    </button>
    <button
      type="button"
      class="bg-red-500 hover:bg-red-700 text-slate-100 w-full rounded-lg font-medium uppercase py-4"
      @click="deletePizza(pizza.id)"
    >
      Delete
    </button>
  </div>
</div>

</template>

<script lang="ts" setup>
import type { Pizza } from '@prisma/client';



const props = defineProps<{pizza: Pizza}>();
const emit = defineEmits(['onBackToList', 'onDelete']);

const backToList = () =>{
    console.log("Back to list!!!")
    emit('onBackToList');
  }

const deletePizza = (pizzaId: string) =>{
    emit('onDelete', pizzaId);
  }
</script>
