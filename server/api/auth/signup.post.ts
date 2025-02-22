import { signupAction } from "~~/actions/auth.action";
import { StatusCodes } from "http-status-codes";
import { signupSchema } from "~~/validations/auth.validation";
import { useAuth } from "~~/server/utils/useAuth";


export default defineEventHandler(async(event) => {
  try {
    //----> Get and validate the user-payload.
    const body = await readValidatedBody(event, (body) => signupSchema.parse(body));
  
    //----> Store the new user in the database.
    const response = await signupAction(body) ;
  
    //----> Set the user auth.
    const {setUserAuth} = useAuth();
    await setUserAuth(response);

   return response;
  } catch (error: any) {
    return sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: error.message}));
  }
  
})