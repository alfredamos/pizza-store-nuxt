import { Pizza } from "@prisma/client";
import { createPizzaAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) => {
  const body = await readBody<Pizza>(event);

  console.log("in the server, pizza : ", body)

  const response = await createPizzaAction(body);

  return response
})