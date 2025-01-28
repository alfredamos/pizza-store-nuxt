<template>
  <div
  class="bg-slate-100 max-w-lg shadow-2xl flex flex-col gap-2 rounded-2xl overflow-hidden items-center justify-center"
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
      <p class="flex justify-between items-center">
        <span class="font-light">Description</span>
        <span class="font-semibold">{{ props?.pizza?.description }}</span>
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

const emit = defineEmits(['onCancel'])
const props = defineProps<{pizza: Pizza}>();

const backToList = () =>{
    emit('onCancel');
  }
</script>

