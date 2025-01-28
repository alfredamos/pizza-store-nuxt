import { getAllUsersAction } from "~~/actions/user.action"

export default defineEventHandler(async() => {
  const response = await getAllUsersAction();

  return response;
})