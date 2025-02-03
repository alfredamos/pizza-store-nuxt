import { Gender } from "@prisma/client";

export class SignupModel{
  name: string = "";
  email: string = "";
  phone: string = "";
  image?: string;
  gender: Gender = Gender.Female;
  confirmPassword: string = "";
  password: string = "";
  address: string = "";
}