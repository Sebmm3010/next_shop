import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credencials from "next-auth/providers/credentials";
import { dbUsers } from "@/data";


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credencials({
      name: "Custom login",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Constraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        // return { id: "1", name: "J Smith", email: "jsmith@example.com",role: "client",}
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      },
    }),
    // ...add more providers here
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      // console.log({token, account, user});
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
          // TODO: crear usuario o verificar si existe en base de datos
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
