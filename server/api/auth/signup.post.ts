import { signupAction } from "~~/actions/auth.action";
import { StatusCodes } from "http-status-codes";


export default defineEventHandler(async(event) => {
  try {
    const body = await readBody(event);
  
    const response = await signupAction(body) ;
  
    const userSession = {...response.user};
    
    const loggedInTime = new Date();
    await setUserSession(event, {
        user: userSession,
        loggedInAt: loggedInTime,
        token: {
          id: response?.user?.id,
          name: response?.user?.name,
          role: response?.user?.role
        }
      });

  return response;
  } catch (error: any) {
    return createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: error.message})
  }
  
})