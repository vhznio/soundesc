import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      uid?: string;
      name?: string | null ;
      email?: string | null;
    }
  }
}