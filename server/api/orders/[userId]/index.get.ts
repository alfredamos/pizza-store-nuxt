import { StatusCodes } from "http-status-codes";
import { getAllOrdersByUserId } from "~~/actions/order.action"

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user} = await requireUserSession(event)
      
      if (!!user){
        console.log("In my orders", {user})
        return createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"})
      }
    
const id = (event.context.params?.id) as string
  const userId = getRouterParam(event, 'userId')!;
  console.log({idOfUser: id, userId})
  
  const response = await getAllOrdersByUserId(userId);

  return response;
})