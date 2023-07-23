// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // GithubProvider({
    //   clientId: String(process.env.GITHUB_ID),
    //   clientSecret: String(process.env.GITHUB_SECRET),
    // }),
  ],
  callbacks: {
    async signIn({ user }) {
      let isAllowedToSignIn = true;
      
      return isAllowedToSignIn = true;
    }
  }
}

export default NextAuth(authOptions)