import { orderDelivered } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {
  const orderId = getRouterParam(event, 'orderId')!;

  const response = await orderDelivered(orderId);

  return response;
})