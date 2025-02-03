import { changePasswordAction } from "~~/actions/auth.action";

export default defineEventHandler(async(event) => {
  const body = await readBody(event);


  const response = await changePasswordAction(body);

  return response;
})

