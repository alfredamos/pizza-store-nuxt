<template>
  <div
  class="bg-slate-100 max-w-lg shadow-2xl flex flex-col gap-2 rounded-2xl overflow-hidden items-center justify-center w-1/2"
>
  <div class="flex 1 w-full h-full">
    <img
      :src="props?.pizza?.image"
      :alt="props?.pizza?.name"
      width="200"
      height="200"
      class="object-cover w-full h-72"
    />
  </div>
  <span class="flex justify-end items-center">
    <button type="button" className=" text-rose-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" @click="backToList">Close</button>
  </span>
  <div class="flex 1 p-10">
    <div class="flex flex-col">
      <h2 class="card-title">
        <NuxtLink to="/pizzas">{{ props?.pizza?.name }}</NuxtLink>
      </h2>
      <p class="flex justify-between items-center">
        <span class="font-light">Price </span>
        <span class="font-semibold">${{ props?.pizza?.price }}</span>
      </p>
      <p class="flex justify-between items-center">
        <span class="font-light">Quantity </span>
        <span class="font-semibold">{{ props?.pizza?.quantity }}</span>
      </p>
      <p class="flex justify-between items-center">
        <span class="font-light mr-5">Toppings </span>
        <span class="font-semibold text-wrap">{{ props?.pizza?.topping }}</span>
      </p>
      <p>
        <span class="font-light mr-5">Description</span>
        <span class="text-muted mr-4">{{isShowMore ? props?.pizza.description : props?.pizza.description.substring(0,40) }}</span>
          <button type="button" className=" text-indigo-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold" @click="showMoreText">{{isShowMore ? "Less" : "More"}}</button>
      </p>
      <div class="flex justify-center items-center mt-4 w-full">
        <button
          class="btn btn-primary font-bold uppercase w-full"
          type="button"
          @click="backToList"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</div>

</template>

<script lang="ts" setup>
import type { Pizza } from '@prisma/client';

//----> State
const isShowMore = ref(false);

//----> Emits
const emit = defineEmits(['onCancel']);

//----> Props.
const props = defineProps<{pizza: Pizza}>();

const backToList = () =>{
    emit('onCancel');
}

const showMoreText = () => {
  isShowMore.value = !isShowMore.value;
}
</script>

