import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { getAllUsersAction } from "~~/actions/user.action"

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      const isAdmin = user?.role === Role.Admin
      if (!isAdmin){
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
    
  
  const response = await getAllUsersAction();

  return response;
})