import { changePasswordAction } from "~~/actions/auth.action";
import { changePasswordSchema } from "~~/validations/auth.validation";

export default defineEventHandler(async(event) => {
  //----> For authentication
  const body = await readValidatedBody(event, (body) => changePasswordSchema.parse(body));

  const response = await changePasswordAction(body);

  return response;
})

