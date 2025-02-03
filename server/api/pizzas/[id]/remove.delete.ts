import { deletePizzaByIdAction } from "~~/actions/pizza.action"

export default defineEventHandler(async(event) => {
  const id = getRouterParam(event, 'id')!;

  const response = await deletePizzaByIdAction(id);

  return response
})