import { StatusCodes } from "http-status-codes";
import { getAllOrdersByUserId } from "~~/actions/order.action"

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user} = await requireUserSession(event);
       
      
      const idOfUser = user?.id;

      if (!user){
        console.log("In my orders", {user})
        return createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials!"})
      }
 
  const userId = getRouterParam(event, 'userId') ?? idOfUser;
  
  const response = await getAllOrdersByUserId(userId);

  return response;
})