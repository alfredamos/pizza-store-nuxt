import { StatusCodes } from "http-status-codes";
import { useAuth } from "../utils/useAuth"

export default defineEventHandler(async(event) => {
  //----> Get the user auth composable.
  const {getUserAuth, isUserAuthenticated} = useAuth();

  //----> Check for authentication.
  const isAuthenticated = await isUserAuthenticated()
  console.log({isAuthenticated})
  
  //----> Check for public routes.
  const isPublic = isPublicRoutes(event?.node?.req?.url!);
  console.log("In authenticated-middleware");

  //----> Get user auth.
  if(!isPublic && isAuthenticated)await getUserAuth(event.path);
  else if(!isPublic && !isAuthenticated) throw sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials"}))
})