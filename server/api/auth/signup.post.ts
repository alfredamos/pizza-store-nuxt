import { signupAction } from "~~/actions/auth.action";
import { StatusCodes } from "http-status-codes";
import { SignupModel } from "~~/models/auth/signup.model";
import { signupSchema } from "~~/validations/auth.validation";


export default defineEventHandler(async(event) => {
  try {
    const body = await readValidatedBody(event, (body) => signupSchema.parse(body));
  
    const response = await signupAction(body) ;
  
    const userSession = {...response.user};
    
    const signupTime = new Date();
    await setUserSession(event, {
        user: userSession,
        loggedInAt: signupTime,
        token: {
          id: response?.user?.id,
          name: response?.user?.name,
          role: response?.user?.role
        }
      });

  return response;
  } catch (error: any) {
    return sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: error.message}));
  }
  
})