<template>
  <form
    @submit.prevent="SubmitPizza"
    class="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
  >
    <h4 class="font-bold text-slate-800 text-2xl mb-6">
      {{ props?.formName }} Pizza Form
    </h4>
    <div class="grid grid-cols-2 gap px-8">
      <div class="mb-6 px-2">
        <label for="name" class="flex flex-start w-full font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          v-model="pizza.name"
          class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 p-2 rounded-lg text-black w-full"
        />
      </div>
      <div class="mb-6 px-2">
        <label
          for="quantity"
          class="flex flex-start w-full font-medium tracking-wide"
        >
          Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          v-model="pizza.quantity"
          class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>

      <div class="mb-6 px-2">
        <label
          for="price"
          class="flex flex-start w-full font-medium tracking-wide"
        >
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          v-model="pizza.price"
          class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>
      <div class="mb-6 px-2">
        <label
          for="image"
          class="flex flex-start w-full font-medium tracking-wide"
        >
          Image
        </label>
        <input
          id="image"
          name="image"
          type="text"
          v-model="pizza.image"
          class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        />
      </div>

      <div class="mb-6 px-2">
        <label for="topping" class="flex flex-start w-full font-medium">
          Topping
        </label>
        <textarea
          id="topping"
          name="topping"
          v-model="pizza.topping"
          class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        ></textarea>
      </div>
      <div class="mb-5 px-2">
        <label for="description" class="flex flex-start w-full font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          v-model="pizza.description"
          class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
        ></textarea>
      </div>
    </div>
    <div class="flex w-full px-10">
      <button
        type="submit"
        class="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg flex-1 mr-4"
      >
        Submit
      </button>
      <button
        type="button"
        class="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-white text-rose-900 font-bold text-lg rounded-lg flex-1 mr-4"
        @click="backToList"
      >
        cancel
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import {Pizza } from "../../../models/pizzas/pizza.model";
const emit = defineEmits(["onCancel", "submit"]);
const props = defineProps<{ formName: string; pizza: Pizza }>();

const pizza = ref<Pizza>({
  ...props?.pizza,
});

const backToList = () => {
  emit("onCancel");
};

const SubmitPizza = () => {
  const newPizza = pizza.value;
  console.log({ newPizza });
  emit("submit", newPizza);
};
</script>
