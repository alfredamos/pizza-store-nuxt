import { signupAction } from "~~/actions/auth.action";

export default defineEventHandler(async(event) => {
  const body = await readBody(event);
  console.log("signup-in-server : ", body)
  const response = await signupAction(body);

  return response;
})