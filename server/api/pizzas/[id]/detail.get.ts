import { getPizzaByIdAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) => {
  const id = getRouterParam(event, 'id')!;

  const response = await getPizzaByIdAction(id);

  return response
})