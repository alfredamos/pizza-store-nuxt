import { StatusCodes } from "http-status-codes";
import { stripePaymentCheckout } from "~~/actions/stripe.action";
import { OrderPayload } from "~~/models/orders/orderPayload.model";

export default defineEventHandler(async(event) => {
  //----> Get the order-payload.  
  const body = await readBody<OrderPayload>(event);

  const response = await stripePaymentCheckout(body);

  return response;
})