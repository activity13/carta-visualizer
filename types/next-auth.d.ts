import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    }
  }

  declare module "next-auth/jwt" {
    interface JWT {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    }
  }

  interface User extends DefaultUser {
    id: string;
  }
}
