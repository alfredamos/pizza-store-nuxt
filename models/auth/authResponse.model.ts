import { UserResponseModel } from "../users/userResponse.model";

export class AuthResponseModel { 
  user: UserResponseModel = new UserResponseModel();
  signIn?: UserResponseModel;
  isLoggedIn: boolean = false;
  isAdmin?: boolean
}