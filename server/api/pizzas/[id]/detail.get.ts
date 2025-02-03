import { StatusCodes } from "http-status-codes";
import { getPizzaByIdAction } from "~~/actions/pizza.action";

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      if (!!user){
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
     
  
  const id = getRouterParam(event, 'id')!;

  const response = await getPizzaByIdAction(id);

  return response
})