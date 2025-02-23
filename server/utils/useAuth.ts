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

    //----> Check for authenticated status of user.
      const {isLoggedIn, user} = await isUserAuthenticated();
    
    //----> Check for logout status.
    if(!isLoggedIn){
      if (isMatch) return sendError(event, createError({statusCode: StatusCodes.OK, statusMessage: "User has logged out!"}));
      return sendError(event, createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials!"}));
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
    const {isAdmin, user} = await isUserAdmin()
    if (!isAdmin){
      return sendError(event,createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted!"}));
    }
    
    //----> The current admin current.
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
    const isAdmin = user?.role === Role.Admin;

    return {isAdmin, user}
  }

  async function isUserAuthenticated(){
    //----> get the user.
    const user = await getUser();
    console.log({user})
    //----> Get the user role.
    const role = user?.role;
    console.log({role})
    //----> Get authentication status.
    const isLoggedIn = isAuthenticated(role!);
    console.log({isLoggedIn})
    //----> Send back the log in status of user.
    return {isLoggedIn, user};
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