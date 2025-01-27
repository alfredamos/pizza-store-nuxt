import { UserResponseModel } from "~~/models/users/userResponse.model";

export class AuthState{
  user: UserResponseModel = new UserResponseModel();
  token: string = "";
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
}