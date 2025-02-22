import { getAllPizzaAction } from "~~/actions/pizza.action"

export default defineEventHandler(async (event) => {
 //----> Get all pizzas. 
  const response = await getAllPizzaAction();

  return response;
})