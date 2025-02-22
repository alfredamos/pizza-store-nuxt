import { deleteOrderById } from "~~/actions/order.action";

export default defineEventHandler(async(event) => {
  //----> get the route param.
  const orderId = getRouterParam(event, 'orderId')!;

  //----> Delete the order in the database.
  const response = await deleteOrderById(orderId);

  return response;
})