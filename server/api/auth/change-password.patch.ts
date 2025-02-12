import { StatusCodes } from "http-status-codes";
import { changePasswordAction } from "~~/actions/auth.action";
import {sendError} from "h3"
import { changePasswordSchema } from "~~/validations/auth.validation";
import { ChangePasswordModel } from "~~/models/auth/changePassword.model";

export default defineEventHandler(async(event) => {
  //----> For authentication
  const { user } = await requireUserSession(event)
  
  if (!user){
    return sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials"}));
  }

  const body = await readValidatedBody(event, (body) => changePasswordSchema.parse(body));


  const response = await changePasswordAction(body);

  return response;
})

