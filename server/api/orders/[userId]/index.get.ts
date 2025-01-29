import { getAllOrdersByUserId } from "~~/actions/order.action"

export default defineEventHandler(async(event) => {
  const userId = event.context.params?.userId as string;
  const response = await getAllOrdersByUserId(userId);

  return response;
})