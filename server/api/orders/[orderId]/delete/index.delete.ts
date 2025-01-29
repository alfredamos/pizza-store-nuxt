import { deleteOrderById } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {
  const orderId = event.context.params?.id as string;

  const response = await deleteOrderById(orderId);

  return response;
})