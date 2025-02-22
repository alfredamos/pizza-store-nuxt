import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { getAllOrders } from "~~/actions/order.action"

export default defineEventHandler(async(event) => {
  //----> Get all orders.
  const response = await getAllOrders();

  return response;
})