import { User } from "@prisma/client"
import { deleteUserByIdAction } from "~~/actions/user.action";

export default defineEventHandler(async (event) => {
    const id = (event.context.params) as unknown as string

    const response = await deleteUserByIdAction(id);

    return response;
})