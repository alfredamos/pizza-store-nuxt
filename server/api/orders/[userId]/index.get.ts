import { getAllOrdersByUserId } from "~~/actions/order.action"

export default defineEventHandler(async(event) => {
  
  const userId = getRouterParam(event, 'userId')!;
  const response = await getAllOrdersByUserId(userId);

  return response;
})