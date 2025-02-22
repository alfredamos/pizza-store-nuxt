import { deleteUserByIdAction } from "~~/actions/user.action";

export default defineEventHandler(async (event) => {
    //----> Get the route param.
    const id = getRouterParam(event, 'id')!;

    const response = await deleteUserByIdAction(id);

    return response;
})