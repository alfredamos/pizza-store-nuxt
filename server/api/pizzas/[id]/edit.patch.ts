import { Pizza, Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { editPizzaByIdAction } from "~~/actions/pizza.action";
import { PizzaModel } from "~~/models/auth/pizza.model";
import { pizzaSchema } from "~~/validations/pizza.validation";

export default defineEventHandler(async(event) =>{
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      const isAdmin = user?.role === Role.Admin
      if (!isAdmin){
        return sendError(event,createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"}));
      }
    
  
  const body = await readValidatedBody(event, (body) => pizzaSchema.parse(body));

  const response = await editPizzaByIdAction(body);

  return response;
})