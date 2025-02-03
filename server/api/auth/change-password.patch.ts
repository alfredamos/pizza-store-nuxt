import { StatusCodes } from "http-status-codes";
import { changePasswordAction } from "~~/actions/auth.action";

export default defineEventHandler(async(event) => {
  //----> For authentication
  const { user } = await requireUserSession(event)
  
  if (!!user){
    return createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials"})
  }

  const body = await readBody(event);


  const response = await changePasswordAction(body);

  return response;
})

