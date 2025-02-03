import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { orderDelivered } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      if (Boolean(user?.role === Role.Admin)){
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
    
  
  const orderId = getRouterParam(event, 'orderId')!;

  const response = await orderDelivered(orderId);

  return response;
})