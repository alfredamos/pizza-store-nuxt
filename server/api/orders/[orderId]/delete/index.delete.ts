import { deleteOrderById } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {
  const orderId = getRouterParam(event, 'orderId')!;

  const response = await deleteOrderById(orderId);

  return response;
})