import { Pizza, Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { createPizzaAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      if (Boolean(user?.role === Role.Admin)){
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
    
  
  const body = await readBody<Pizza>(event);

  console.log("in the server, pizza : ", body)

  const response = await createPizzaAction(body);

  return response
})