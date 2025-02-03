import { Role, User } from "@prisma/client";

// auth.d.ts
declare module '#auth-utils' {
  interface User {
    // Add your own fields
  }

  interface UserSession {
    // Add your own fields
     user: User & { id: string; role: Role };
        token: { id: string; role: Role };
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}
