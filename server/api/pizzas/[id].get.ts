import { getPizzaByIdAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) => {
  const id = getRouterParam(event, 'id') as string;

  const response = await getPizzaByIdAction(id);

  return response;
})