import { getPizzaByIdAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) => {
  //----> Get the route param.
  const id = getRouterParam(event, 'id')!;

  const response = await getPizzaByIdAction(id);

  return response
})