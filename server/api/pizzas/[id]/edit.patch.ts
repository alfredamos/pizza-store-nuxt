import { Pizza, Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { editPizzaByIdAction } from "~~/actions/pizza.action";
import { PizzaModel } from "~~/models/auth/pizza.model";
import { pizzaSchema } from "~~/validations/pizza.validation";

export default defineEventHandler(async(event) =>{
  //----> Get and validate pizza-payload.
  const body = await readValidatedBody(event, (body) => pizzaSchema.parse(body));

  //----> edit pizza-data in the database.
  const response = await editPizzaByIdAction(body);

  return response;
})