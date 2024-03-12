import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';

export const AuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID ?? '',
      clientSecret: process.env.CLIENT_SECRET ?? '',
      authorization: {params: {scope: 'read:user%20read:project'}}
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github' && user.id === process.env.OWNER_ID) {
        return true;
      }
      return false;
    },
    async jwt({ token, account}) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    }
  }
}
