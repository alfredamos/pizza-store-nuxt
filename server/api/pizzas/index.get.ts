import { getAllPizzaAction } from "~~/actions/pizza.action"

export default defineEventHandler(async () => {
  const response = await getAllPizzaAction();

  return response;
})