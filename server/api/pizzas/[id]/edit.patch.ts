import { editPizzaByIdAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) =>{
  const body = await readBody(event);

  const response = await editPizzaByIdAction(body);

  return response;
})