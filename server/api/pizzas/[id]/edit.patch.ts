import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { editPizzaByIdAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) =>{
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      if (Boolean(user?.role === Role.Admin)){
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
    
  
  const body = await readBody(event);

  const response = await editPizzaByIdAction(body);

  return response;
})