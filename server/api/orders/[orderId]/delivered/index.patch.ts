import { orderDelivered } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {
  const orderId = event.context.params?.id as string;

  const response = await orderDelivered(orderId);

  return response;
})