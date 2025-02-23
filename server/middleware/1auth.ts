import { StatusCodes } from "http-status-codes";
import { useAuth } from "../utils/useAuth"

export default defineEventHandler(async(event) => {
  //----> Get the user auth composable.
  const {getUserAuth, isUserAuthenticated} = useAuth();

  //----> Check for authentication.
  const {isLoggedIn: isAuthenticated} = await isUserAuthenticated()
  console.log({isAuthenticated})
  
  //----> Check for public routes.
  const isPublic = isPublicRoutes(event?.node?.req?.url!);
  console.log("In authenticated-middleware", {isPublic});

  //----> Get user auth.
  if(!isPublic && isAuthenticated){
    console.log("Point 1 in auth, good!")
    await getUserAuth(event.path)
  } else if(!isPublic && !isAuthenticated){ 
    console.log("Point 2 in auth, very bad!")
    throw sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials"}))
  } 
})