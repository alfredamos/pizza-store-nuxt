import { StatusCodes } from "http-status-codes";
import { editProfileAction } from "~~/actions/auth.action";
import {sendError} from "h3";
import { editProfileSchema } from "~~/validations/auth.validation";
import { EditProfileModel } from '../../../models/auth/editProfile.model';

export default defineEventHandler(async (event) => {
  //----> For authentication
    const { user } = await requireUserSession(event)
    
    if (!user){
      return sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials"}));
    }
  
  const body = await readValidatedBody(event, (body) => editProfileSchema.parse(body));
  const response = await editProfileAction(body);

  return response;
})