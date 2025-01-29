import { stripePaymentCheckout } from "~~/actions/stripe.action";
import { OrderPayload } from "~~/models/orders/orderPayload.model";

export default defineEventHandler(async(event) => {
  const body = await readBody<OrderPayload>(event);

  const response = await stripePaymentCheckout(body);

  return response;
})