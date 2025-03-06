<template>
  <div class="bg-white p-12 max-width-2xl text-black rounded-2xl shadow-2xl w-1/2">
    <span className="flex justify-end items-center">
    <button type="button" className=" text-rose-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" @click="backToList">Close</button>
  </span>
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
  <p>
        <span class="font-light mr-5">Description</span>
        <span class="text-muted mr-4">{{isShowMore ? props?.pizza.description : props?.pizza.description.substring(0,40) }}</span>
          <button type="button" className=" text-indigo-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" @click="showMoreText">{{isShowMore ? "Less" : "More"}}</button>
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

//----> State
const isShowMore = ref(false);

//----> Props
const props = defineProps<{pizza: Pizza}>();

//----> Emits
const emit = defineEmits(['onBackToList', 'onDelete']);

//----> Handlers
const backToList = () =>{
    console.log("Back to list!!!")
    emit('onBackToList');
  }

const deletePizza = (pizzaId: string) =>{
    emit('onDelete', pizzaId);
}

const showMoreText = () => {
  isShowMore.value = !isShowMore.value
}
</script>
