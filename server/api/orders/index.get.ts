import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { getAllOrders } from "~~/actions/order.action"

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      const isAdmin = user?.role === Role.Admin
      if (!isAdmin){
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
    
  
  const response = await getAllOrders();

  return response;
})