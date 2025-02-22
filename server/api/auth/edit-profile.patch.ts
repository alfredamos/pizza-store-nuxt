import { editProfileAction } from "~~/actions/auth.action";
import { editProfileSchema } from "~~/validations/auth.validation";

export default defineEventHandler(async (event) => {
  //----> Get and validate the user-payload.
  const body = await readValidatedBody(event, (body) => editProfileSchema.parse(body));
  const response = await editProfileAction(body);

  return response;
})