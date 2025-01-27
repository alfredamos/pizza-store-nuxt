import { editProfileAction } from "~~/actions/auth.action"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await editProfileAction(body);

  return response;
})