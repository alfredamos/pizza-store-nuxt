//import { Role } from '../role.model';

import type { Role } from "@prisma/client";

export class UserResponseModel {
  id: string = "";
  name!: string;
  email!: string;
  gender!: string;
  phone!: string;
  role!: Role;
  token?: string;
  image!: string;
  address!: string;
}
