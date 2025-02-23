import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { AuthResponseModel } from "~~/models/auth/authResponse.model";
import { isRouteMatch } from "./isRouteMatch";
import { isAuthenticated } from "./authenticatedUsers";

export function useAuth(){
  //----> get global event.
  const event = useEvent();
  
  async function getUserAuth(route: string){
    //----> Check if route matches logout route.
    const isMatch = isRouteMatch(route, '/api/_auth/session');

    //----> get the user.
    const user = await getUser();
    
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
     //----> get the user.
    const user = await getUser();
         
    //----> Check for admin privilege
          const isAdmin = user?.role === Role.Admin
          if (!isAdmin){
            return sendError(event,createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"}));
          }
    
    //----> It is admin.
          return user;
      
  }

  async function getUserId(){
     //----> get the user.
    const user = await getUser();

    //----> Send back the user-id.
    return user?.id
  }

  async function isUserAdmin(){
     //----> get the user.
    const user = await getUser();
    
    //----> Check for admin status.
    return user?.role === Role.Admin;
  }
  async function isUserAuthenticated(){
    //----> get the user.
    const user = await getUser();
    //----> Get the user role.
    const role = user?.role;

    //----> Get authentication status.
    return isAuthenticated(role!);
  }

  async function getUser(){
    //----> Get user from session.
    const {user} = await getUserSession(event);

    //----> The current user.
    return user;
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