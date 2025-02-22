import { orderShipped } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {
  //----> get the route param.
  const orderId = getRouterParam(event, 'orderId')!;

  //----> set the order as shipped.
  const response = await orderShipped(orderId);

  return response;
})