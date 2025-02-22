import { deletePizzaByIdAction } from "~~/actions/pizza.action"

export default defineEventHandler(async(event) => {
  //----> Get the user param.
  const id = getRouterParam(event, 'id')!;

  //----> delete the pizza with this given id from database.
  const response = await deletePizzaByIdAction(id);

  return response
})