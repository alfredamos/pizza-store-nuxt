import { StatusCodes } from "http-status-codes";
import { getAllOrdersByUserId } from "~~/actions/order.action"

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      if (!!user){
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
    

  const userId = getRouterParam(event, 'userId')!;
  const response = await getAllOrdersByUserId(userId);

  return response;
})