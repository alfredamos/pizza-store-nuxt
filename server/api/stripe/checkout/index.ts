import { StatusCodes } from "http-status-codes";
import { stripePaymentCheckout } from "~~/actions/stripe.action";
import { OrderPayload } from "~~/models/orders/orderPayload.model";

export default defineEventHandler(async(event) => {
  //----> Check for admin privilege
      const { user } = await requireUserSession(event)
      
      if (!user){
        return sendError(event,createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials!"}));
      }
    
  const body = await readBody<OrderPayload>(event);

  const response = await stripePaymentCheckout(body);

  return response;
})