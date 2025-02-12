import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { deletePizzaByIdAction } from "~~/actions/pizza.action"

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      const isAdmin = user?.role === Role.Admin
      
      console.log("In admin-middleware, isAdmin: ", isAdmin)
      if (!isAdmin){
        return sendError(event,createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"}));
      }
    
  
  const id = getRouterParam(event, 'id')!;

  const response = await deletePizzaByIdAction(id);

  return response
})