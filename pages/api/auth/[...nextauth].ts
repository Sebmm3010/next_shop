import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credencials from "next-auth/providers/credentials";

export const authOptions = {
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
        console.log({ credentials });
        return {name:"juan", email:"juan@gmail.com",};
      },
    }),
    // ...add more providers here
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  callbacks:{
    
  }
};

export default NextAuth(authOptions);
