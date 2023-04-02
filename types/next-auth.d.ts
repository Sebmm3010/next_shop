import NextAuth from "next-auth";

declare module "next-auth" {
  interface DefaultSession {
    accessToken?: string;
  }
}
