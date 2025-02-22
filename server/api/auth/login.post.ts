import { StatusCodes } from "http-status-codes";
import { loginWithoutAuthAction } from "~~/actions/auth.action";
import {sendError} from "h3";
import { loginSchema } from "~~/validations/auth.validation";
import { useAuth } from "~~/server/utils/useAuth";

export default defineEventHandler(async (event) => {
  try{
    //----> get and validate user login payload
    const body = await readValidatedBody(event, (body) => loginSchema.parse(body));

    //----> Verify the user exist and get token.
    const response = await loginWithoutAuthAction(body);
  
    //----> set the user auth-session.
    const {setUserAuth} = useAuth();

    await setUserAuth(response);
    
    return response;

  } catch (error: any) {
        return sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: error.message}));
  }
      

  
})