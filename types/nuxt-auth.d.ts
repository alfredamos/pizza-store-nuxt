import { Role, User } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth"



declare module "next-auth"{
  interface Session {
    user: User & { id: string; role: Role };
    token: { id: string; role: Role , name: string};
  }
  

}