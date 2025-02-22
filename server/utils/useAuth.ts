import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { AuthResponseModel } from "~~/models/auth/authResponse.model";
import { isRouteMatch } from "./isRouteMatch";
import { isAuthenticated } from "./authenticatedUsers";

export function useAuth(){
  //----> get global event.
  const event = useEvent();
  
  async function getUserAuth(route: string){
    console.log("Point 1, route : ", route)
    //----> Check for public route.
    const isMatch = isRouteMatch(route, '/api/_auth/session');
    console.log({isMatch});
    if (isPublicRoutes(route)) return;
    console.log("Point 2, route : ", route)
    //----> Get user-session
    const { user } = await requireUserSession(event);
    
      if (!user){
        if(isMatch) return sendError(event, createError({statusCode: StatusCodes.OK, statusMessage: "You are logged out!"}));
        return sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials"}));
      }

      return user;
  }

  async function setUserAuth(response: AuthResponseModel){
    //----> User session.
    const userSession = {...response.user};
    //----> set logged-in time.
    const loggedInTime = new Date();
    //----> set user session
    await setUserSession(event, {
        user: userSession,
        loggedInAt: loggedInTime,
        token: {
          id: response?.user?.id,
          name: response?.user?.name,
          role: response?.user?.role
        }
      });

  }

  async function adminUser(){
    //----> Check for admin privilege
          const { user } = await requireUserSession(event)
          
          const isAdmin = user?.role === Role.Admin
          if (!isAdmin){
            return sendError(event,createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"}));
          }

          return isAdmin;
      
  }

  async function getUserId(){
    const {user} = await getUserSession(event);

    return user?.id
  }

  async function isUserAdmin(){
    const {user} = await getUserSession(event);
    
    return user?.role === Role.Admin;
  }
  async function isUserAuthenticated(){
    const {user} = await getUserSession(event);
    const role = user?.role
    return isAuthenticated(role!);
  }



  return {
    adminUser,
    getUserId,
    getUserAuth,
    isUserAdmin,
    isUserAuthenticated,
    setUserAuth,
  }
}