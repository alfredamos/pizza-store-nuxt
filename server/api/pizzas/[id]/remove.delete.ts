import { deletePizzaByIdAction } from "~~/actions/pizza.action"

export default defineEventHandler(async(event) => {
  const id = (event.context.params?.id) as string

  const response = await deletePizzaByIdAction(id);

  return response
})