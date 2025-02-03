import { orderShipped } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {

  const orderId = getRouterParam(event, 'orderId')!;

  const response = await orderShipped(orderId);

  return response;
})