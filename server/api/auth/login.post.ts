import { StatusCodes } from "http-status-codes";
import { loginWithoutAuthAction } from "~~/actions/auth.action";
import { LoginModel } from "~~/models/auth/login.model";

export default defineEventHandler(async (event) => {
try{
  const body = await readBody<LoginModel>(event);

  const response = await loginWithoutAuthAction(body);

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