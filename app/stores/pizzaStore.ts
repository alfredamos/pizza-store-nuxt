import type { Pizza } from "~~/models/pizzas/pizza.model";
import { PizzaState } from "~~/states/pizzaState";
import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", () => {
  //----> State
  const pizzaState = ref<PizzaState>({ ...new PizzaState() });

  //----> Acts like a constructor
  onMounted(() => {
    const stateOfPizza = getLocalStoragePizzas() ?? [];

    if (!!stateOfPizza) {
      pizzaState.value = { ...pizzaState.value, pizzas: stateOfPizza };
    }
  });


  //----> Getters
  const pizzas = computed(() => pizzaState.value?.pizzas ?? []);

  const addPizza = (pizza: Pizza) => {
    const newPizzas = [...pizzaState.value?.pizzas, pizza];
    pizzaState.value = { ...pizzaState.value, pizzas: newPizzas };

    setLocalStoragePizzas(newPizzas);
  };

  const deletePizza = (pizzaId: string) => {
    const newPizzas = pizzaState.value?.pizzas?.filter(
      (pizza) => pizza.id !== pizzaId
    );
    pizzaState.value = { ...pizzaState.value, pizzas: newPizzas };

    setLocalStoragePizzas(newPizzas);
  };

  const editPizza = (pizzaPayload: Pizza) => {
    const newPizzas = pizzaState.value?.pizzas?.map((pizza) =>
      pizza.id === pizzaPayload.id ? pizzaPayload : pizza
    );
    pizzaState.value = { ...pizzaState.value, pizzas: newPizzas };

    setLocalStoragePizzas(newPizzas);
  };

  const editAllPizzas = (pizzas: Pizza[]) => {
    pizzaState.value = { ...pizzaState.value, pizzas };

    setLocalStoragePizzas(pizzas);
  };

  const setLocalStoragePizzas = (pizzas: Pizza[]) => {
    localStorage.setItem("pizzas", JSON.stringify(pizzas));
  };

  const getLocalStoragePizzas = () => {
    return JSON.parse(localStorage.getItem("pizzas")!) as Pizza[];
  };

  const removeLocalStoragePizzas = () => {
    localStorage.removeItem("pizzas");
  };

  return {
    addPizza,
    deletePizza,
    editAllPizzas,
    editPizza,
    pizzas,
    getLocalStoragePizzas,
    setLocalStoragePizzas,
    removeLocalStoragePizzas,
  };
});
