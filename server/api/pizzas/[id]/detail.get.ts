import { StatusCodes } from "http-status-codes";
import { getPizzaByIdAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      if (!user){
        return sendError(event,createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials!"}));
      }
     
  
  const id = getRouterParam(event, 'id')!;

  const response = await getPizzaByIdAction(id);

  return response
})