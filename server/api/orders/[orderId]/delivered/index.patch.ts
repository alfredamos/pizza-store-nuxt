import { orderDelivered } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {
  //----> get the route param.
  const orderId = getRouterParam(event, 'orderId')!;

  //----> Set order as delivered.
  const response = await orderDelivered(orderId);

  return response;
})