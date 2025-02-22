import { getAllOrdersByUserId } from "~~/actions/order.action"
import { useAuth } from "~~/server/utils/useAuth";

export default defineEventHandler(async(event) => {
  //----> get the user-id from session.
  const {getUserId} = useAuth();
  const idOfUser = await getUserId();
  //----> Get the user-id from param
  const userId = getRouterParam(event, 'userId')! ?? idOfUser!;
  
  //----> get orders by user-id
  const response = await getAllOrdersByUserId(userId);

  return response;
})