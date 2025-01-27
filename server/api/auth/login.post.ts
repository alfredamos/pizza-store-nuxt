import { loginWithoutAuthAction } from "~~/actions/auth.action";
import { LoginModel } from "~~/models/auth/login.model";

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginModel>(event);

  const response = await loginWithoutAuthAction(body);

  return response;
})