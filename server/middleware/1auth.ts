import { StatusCodes } from "http-status-codes";
import { useAuth } from "../utils/useAuth"

export default defineEventHandler(async(event) => {
  //----> Get the user auth composable.
  const {getUserAuth, isUserAuthenticated} = useAuth();

  //----> Check for authentication.
  const {isLoggedIn: isAuthenticated} = await isUserAuthenticated()
  
  //----> Check for public routes.
  const isPublic = isPublicRoutes(event?.node?.req?.url!);

  //----> Get user auth.
  if(!isPublic && isAuthenticated){
    await getUserAuth(event.path)
  } else if(!isPublic && !isAuthenticated){ 
    throw sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials"}))
  } 
})