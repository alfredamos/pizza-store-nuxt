import { signupAction } from "~~/actions/auth.action";
import { StatusCodes } from "http-status-codes";
//import {HttpError} from "http-error"

export default defineEventHandler(async(event) => {
  try {
    const body = await readBody(event);
  console.log("signup-in-server : ", body)
  const response = await signupAction(body) ;
  await setUserSession(event, {
    user: response,
    loggedInAt: new Date(),
    token: {
      id: response?.user.id,
      name: response?.user?.name,
      role: response?.user?.role
    }
  });

  return response;
  } catch (error: any) {
    return createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: error.message})
  }
  
})