import { StatusCodes } from "http-status-codes";
import { loginWithoutAuthAction } from "~~/actions/auth.action";
import { LoginModel } from "~~/models/auth/login.model";
import {sendError} from "h3";
import { loginSchema } from "~~/validations/auth.validation";

export default defineEventHandler(async (event) => {
try{
  const body = await readValidatedBody(event, (body) => loginSchema.parse(body));

  const response = await loginWithoutAuthAction(body);
    
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
        return sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: error.message}));
      }
      

  
})