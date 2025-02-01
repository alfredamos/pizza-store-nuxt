import {NuxtAuthHandler} from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "~~/db/prisma.db";
import bcrypt from "bcryptjs"
import { LoginModel } from '../../../models/auth/login.model';
import { StatusCodes } from "http-status-codes";
import { User } from "@prisma/client";

export default NuxtAuthHandler({
  secret: process.env.NUXT_NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signup",
  },
  providers:[
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'alfredamos@gmail.com',
        },
        password: { label: "Password", type: "password" },
      }, 
      async authorize(credentials: LoginModel) {
        const cred = credentials as { email: string; password: string };
        const { email, password } = cred;
        if (!email || !password) return null;
        //----> Check for existence of user.
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) throw createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage:"Invalid credentials!"});
        //----> Check for password correctness.
        const isPasswordMatch = await bcrypt.compare(
          password as string,
          user.password
        );
        if (!isPasswordMatch) throw createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage:"Invalid credentials!"});
        //----> Send back the jwt payload.
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const loggedInUser = user as User;

      if (loggedInUser) {
        return {
          ...token,
          id: loggedInUser.id,
          name: loggedInUser.name,
          email: loggedInUser.email,
          role: loggedInUser.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      
      if (token) {
        return {
          ...session,
          user: { ...session.user, id: token.id as string, role: token.role },
        };
      }

      return session;
    },
  },
})