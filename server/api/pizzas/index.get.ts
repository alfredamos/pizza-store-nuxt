import { StatusCodes } from "http-status-codes";
import { getAllPizzaAction } from "~~/actions/pizza.action"

export default defineEventHandler(async (event) => {
  /* //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      if (!!user){
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
   */  
  
  const response = await getAllPizzaAction();

  return response;
})