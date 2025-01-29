import { getAllOrders } from "~~/actions/order.action"

export default defineEventHandler(async() => {
  const response = await getAllOrders();

  return response;
})