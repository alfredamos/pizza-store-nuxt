<template>
  <FormPizza
    form-name="Create"
    :pizza="pizza"
    @on-cancel="backToList"
    @submit="submitPizza"
  />
</template>

<script lang="ts" setup>
import { pizzaBaseUrl } from '~~/constants/pizzaBaseUrl';
import { v4 as uuidv4 } from "uuid";
import {Pizza } from "../../../../models/pizzas/pizza.model";

const url = `${pizzaBaseUrl}/new`
const authStore = useAuthStore();
const pizzaStore = usePizzaStore();

const {sentDataToDb} = useSentDataToDb<Pizza>(url, 'post')

const { userId } = storeToRefs(authStore);

const pizza: Pizza = {
  id: uuidv4(),
  name: "",
  price: 0,
  quantity: 0,
  topping: "",
  description: "",
  image: "",
  userId: userId.value,
};

const backToList = () => {
  navigateTo("/");
};

const submitPizza = async (pizza: Pizza) => {
  pizza.userId = userId.value;
  console.log({ inputPizza: pizza, userId: userId.value });
  //----> Store the new pizza in the database.
   const { data: newPizza } = await sentDataToDb(pizza);

  console.log({ outputPizza: newPizza });
  //----> Store the new pizza in the client pizza-store.
  pizzaStore.addPizza(newPizza);
  console.log({ newPizza });

  navigateTo("/pizzas"); 
};
</script>
