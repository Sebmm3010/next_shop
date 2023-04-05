import NextAuth from "next-auth";

declare module "next-auth" {
  interface DefaultSession {
    accessToken?: string;
  }
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      id?: string;
    };
  }
}
